import { Anchor, Container, List, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

import { SEO } from "@/shared/lib/seo";

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mantine Vite Template",
  url: "https://your-domain.com",
};

export default function Home() {
  return (
    <Container py="lg">
      <SEO
        title="Home"
        description="Production-ready React + Mantine + Vite starter. Fork it, run yarn dev, and ship."
        jsonLd={websiteLd}
      />
      <Stack>
        <Title order={1}>Mantine Vite Template</Title>
        <Text c="dimmed">
          A production-ready starter with FSD architecture, auth flow, TanStack Query,
          and SEO out of the box.
        </Text>
        <Title order={3} mt="md">
          What's inside
        </Title>
        <List>
          <List.Item>
            <Anchor component={Link} to="/login">Login</Anchor> — Mantine form + axios + Redux
          </List.Item>
          <List.Item>
            <Anchor component={Link} to="/users">Users</Anchor> — TanStack Query list demo
          </List.Item>
          <List.Item>Multi-layer error boundaries (app, route, query)</List.Item>
          <List.Item>SEO via React 19 native metadata + sitemap.xml</List.Item>
        </List>
      </Stack>
    </Container>
  );
}
