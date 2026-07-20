import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export default function BaseLayout() {
  return (
    <AppShell header={{ height: 56 }} footer={{ height: 40 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
