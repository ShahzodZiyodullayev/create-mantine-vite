#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {fileURLToPath} from "node:url";
import {spawn} from "node:child_process";
import {setTimeout as sleep} from "node:timers/promises";
import {
    cancel,
    confirm,
    isCancel,
    log,
    select,
    spinner,
    text,
} from "@clack/prompts";
import pc from "picocolors";

const PKG_ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const TEMPLATES_DIR = path.join(PKG_ROOT, "templates");

/** ========== Templates registry ==========
 *  dir: folder name under templates/, shipped inside the npm tarball.
 *  Add new templates by creating templates/<dir>/ and appending here.
 */
const TEMPLATES = [
    {
        value: "mantine-vite",
        label: "React + Mantine + Vite (FSD)",
        hint: "Production-ready starter — auth, TanStack Query, SEO",
        dir: "mantine-vite",
        available: true,
    },
    {
        value: "test-template",
        label: "Test Template",
        hint: "tez orada qo'shiladi",
        dir: null,
        available: false,
    },
];

/** Files npm cannot ship under their real name, mapped back on copy.
 *  npm consumes a packaged .gitignore as ignore rules and drops it from the
 *  tarball, so the template stores it as _gitignore and we restore it here.
 */
const RENAME_ON_COPY = {
    _gitignore: ".gitignore",
};

/** Packaging artifacts and build output that must never reach a generated
 *  project. `.npmignore` is what keeps the template's node_modules/dist out of
 *  the tarball — it belongs to the template's packaging, not to user projects.
 */
const SKIP_ON_COPY = new Set([
    "node_modules",
    "dist",
    "stats.html",
    ".npmignore",
    ".env",
    ".idea",
    ".vscode",
    ".DS_Store",
]);

/** ======================================== */

// ───── Animated banner: all dim → bright cyan fade-up ─────
async function animatedBanner() {
    // "REACT" in Big font, 2-space left margin
    const lines = [
        "  ██████  ███████  █████   ██████ ████████  ",
        "  ██   ██ ██      ██   ██ ██         ██     ",
        "  ██████  █████   ███████ ██         ██     ",
        "  ██   ██ ██      ██   ██ ██         ██     ",
        "  ██   ██ ███████ ██   ██  ██████    ██     ",
    ];

    console.log("");

    // 1) Hamma qatorlarni dim chiqaramiz (darhol)
    for (const line of lines) {
        console.log(pc.dim(line));
    }

    // 2) Cursor banner boshiga qaytariladi
    process.stdout.write(`\x1b[${lines.length}A`);

    // 3) Har qatorni cyan + bold ga aylantiramiz, ketma-ket
    for (const line of lines) {
        process.stdout.write(`\x1b[2K\r${pc.bold(pc.cyan(line))}\n`);
        await sleep(110);
    }

    console.log("");
    console.log(pc.dim("  ⚡ Mantine + Vite project generator"));
    console.log("");
}

// ───── Pretty exit ─────
function bye(msg = "O'rnatish bekor qilindi 😏") {
    cancel(msg);
    process.exit(0);
}

// ───── Template selection (re-prompts on unavailable) ─────
async function chooseTemplate(preset) {
    if (preset) {
        const template = TEMPLATES.find((t) => t.value === preset);
        if (!template) {
            const names = TEMPLATES.filter((t) => t.available).map((t) => t.value).join(", ");
            log.error(`"${preset}" degan template yo'q. Mavjudlari: ${names}`);
            process.exit(1);
        }
        if (!template.available) {
            log.error(`"${preset}" hali mavjud emas.`);
            process.exit(1);
        }
        return template;
    }

    while (true) {
        const value = await select({
            message: `Qaysi template'ni o'rnatamiz?\n${pc.dim("│")}`,
            options: TEMPLATES.map((t) => ({
                value: t.value,
                label: t.available ? t.label : pc.dim(t.label),
                hint: t.hint,
            })),
        });

        if (isCancel(value)) bye();

        const template = TEMPLATES.find((t) => t.value === value);
        if (!template) bye("Template tanlanmadi.");

        if (!template.available) {
            log.warn(`"${template.label.trim()}" hali mavjud emas. Boshqa template tanlang.`);
            continue;
        }
        return template;
    }
}

// ───── Project name ─────
async function chooseProjectName(initial) {
    if (initial && initial.trim()) return initial.trim();
    const name = await text({
        message: "Loyiha nomi:",
        placeholder: "my-app",
        initialValue: "my-app",
        validate: (v) => {
            if (!v.trim()) return "Bo'sh bo'lishi mumkin emas";
        },
    });
    if (isCancel(name)) bye();
    return name.trim();
}

// ───── Target dir must be absent or empty ─────
async function ensureEmptyTarget(targetDir, projectName) {
    let entries;
    try {
        entries = await fs.readdir(targetDir);
    } catch (e) {
        if (e.code === "ENOENT") return; // doesn't exist — nothing to check
        throw e;
    }

    if (entries.length === 0) return;

    log.warn(`"${projectName}" papkasi mavjud va bo'sh emas (${entries.length} ta element).`);
    const ok = await confirm({
        message: "Ichidagi hamma narsa o'chirilsinmi?",
        initialValue: false,
    });
    if (isCancel(ok) || !ok) bye("Papka o'zgartirilmadi.");

    await fs.rm(targetDir, {recursive: true, force: true});
}

// ───── Recursive copy with dotfile rename ─────
async function copyTemplate(srcDir, destDir) {
    await fs.mkdir(destDir, {recursive: true});
    const entries = await fs.readdir(srcDir, {withFileTypes: true});

    for (const entry of entries) {
        // Guard against a dev checkout leaking its install/build output.
        // Published tarballs already exclude these via .npmignore; this keeps
        // `yarn cli:try` from the repo honest too.
        if (SKIP_ON_COPY.has(entry.name)) continue;

        const src = path.join(srcDir, entry.name);
        const dest = path.join(destDir, RENAME_ON_COPY[entry.name] ?? entry.name);

        if (entry.isDirectory()) {
            await copyTemplate(src, dest);
        } else {
            await fs.copyFile(src, dest);
        }
    }
}

// ───── Install runner: pipe output, our spinner, dump on failure ─────
async function runInstall(cmd, cwd) {
    const s = spinner();
    s.start(`Paketlar o'rnatilmoqda (${cmd})`);
    const startTime = Date.now();

    const [bin, ...args] = cmd.split(" ");
    const child = spawn(bin, args, {
        cwd,
        shell: process.platform === "win32",
        stdio: ["ignore", "pipe", "pipe"],
    });

    const chunks = [];
    child.stdout?.on("data", (c) => chunks.push(c));
    child.stderr?.on("data", (c) => chunks.push(c));

    const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        s.message(`Paketlar o'rnatilmoqda (${cmd}) — ${elapsed}s`);
    }, 1000);

    const exitCode = await new Promise((resolve) => {
        child.on("close", resolve);
        child.on("error", () => resolve(1));
    });
    clearInterval(interval);

    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    if (exitCode === 0) {
        s.stop(pc.green(`✓ Paketlar o'rnatildi (${elapsed}s)`));
        return true;
    }

    s.stop(pc.red(`✗ Paketlarni o'rnatib bo'lmadi (${cmd})`));
    const output = Buffer.concat(chunks).toString();
    if (output.trim()) {
        console.error(pc.dim("\n  ─── output ───"));
        console.error(output);
    }
    return false;
}

// ───── Main ─────
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const positional = args.filter((a) => !a.startsWith("--"));
const cliProjectName = positional[0];
const skipInstall = flags.has("--no-install");
const useNpm = flags.has("--use-npm");
const presetTemplate = args
    .find((a) => a.startsWith("--template="))
    ?.slice("--template=".length);

(async () => {
    await animatedBanner();

    const template = await chooseTemplate(presetTemplate);
    console.log("");

    const projectName = await chooseProjectName(cliProjectName);
    const targetDir = path.resolve(process.cwd(), projectName);

    await ensureEmptyTarget(targetDir, projectName);

    // 1. Copy the template out of this package
    const copySpinner = spinner();
    copySpinner.start(`Template tayyorlanmoqda — ${template.label.trim()}`);
    const srcDir = path.join(TEMPLATES_DIR, template.dir);
    try {
        await fs.access(srcDir);
    } catch {
        copySpinner.stop(pc.red("✗ Template topilmadi"));
        log.error(`Paket ichida "${template.dir}" yo'q: ${srcDir}`);
        log.info("Paket buzilgan bo'lishi mumkin — qayta o'rnatib ko'ring.");
        process.exit(1);
    }
    try {
        await copyTemplate(srcDir, targetDir);
        copySpinner.stop(pc.green("✓ Template nusxalandi"));
    } catch (err) {
        copySpinner.stop(pc.red("✗ Template nusxalashda xato"));
        console.error(err);
        process.exit(1);
    }

    // 2. package.json — name moslash
    const pkgSpinner = spinner();
    pkgSpinner.start("package.json yangilanmoqda");
    try {
        const pkgPath = path.join(targetDir, "package.json");
        const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
        pkg.name = projectName
            .toLowerCase()
            .replace(/[^a-z0-9-_]/g, "-")
            .replace(/-+/g, "-");
        pkg.version = "0.1.0";
        delete pkg.private;
        delete pkg.publishConfig;
        await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
        pkgSpinner.stop(pc.green("✓ package.json yangilandi"));
    } catch (e) {
        pkgSpinner.stop(pc.yellow(`⚠ package.json yangilashda muammo: ${e?.message}`));
    }

    // 3. Install (pipe output → our spinner)
    if (!skipInstall) {
        const cmd = useNpm ? "npm install" : "yarn install";
        let ok = await runInstall(cmd, targetDir);
        if (!ok && !useNpm) {
            log.warn("yarn ishlamadi, npm bilan urinilyapti...");
            ok = await runInstall("npm install", targetDir);
        }
        if (!ok) process.exit(1);
    }

    // 4. Yakuniy xabar
    const runner = useNpm ? "npm run" : "yarn";
    console.log("");
    console.log(pc.green(pc.bold("🎉  Tayyor!")));
    console.log(pc.green(pc.bold("Loyiha muvaffaqiyatli yaratildi.")));
    console.log(pc.green(pc.bold("Bizning packagedan foydalanganingiz uchun rahmat!.")));
    console.log("");
    console.log(pc.dim("  Keyingi qadamlar:"));
    console.log(`    ${pc.cyan("cd")} ${projectName}`);
    if (skipInstall) console.log(`    ${pc.cyan(useNpm ? "npm install" : "yarn install")}`);
    console.log(`    ${pc.cyan(runner)} dev`);
    console.log("");
})().catch((err) => {
    console.error(pc.red("\n  Kutilmagan xato:"));
    console.error(err);
    process.exit(1);
});
