#!/usr/bin/env node
/**
 * Nudge users who ran `npm i create-mantine-vite` instead of `npx create-mantine-vite`.
 *
 * npm sets `npm_command` to the lifecycle that triggered this script:
 *   - "install" / "add"  → user installed us as a dependency (wrong usage)
 *   - "exec"             → npx is about to run the CLI (correct usage — stay silent)
 * If the variable is missing (older npm, yarn, pnpm), we stay silent rather than
 * risk a confusing message. This script must never fail an install.
 */
try {
    const cmd = process.env.npm_command;

    if (cmd === "install" || cmd === "add") {
        const c = process.stdout.isTTY
            ? {y: "\x1b[33m", b: "\x1b[1m", d: "\x1b[2m", r: "\x1b[0m"}
            : {y: "", b: "", d: "", r: ""};

        console.log("");
        console.log(`${c.y}${c.b}  create-mantine-vite is a scaffolding CLI, not a dependency.${c.r}`);
        console.log("");
        console.log(`  ${c.d}Installing it does nothing. To create a project, run:${c.r}`);
        console.log(`      ${c.b}npx create-mantine-vite@latest my-app${c.r}`);
        console.log("");
    }
} catch {
    // never break an install
}
