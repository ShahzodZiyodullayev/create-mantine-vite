import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

import { SEO } from "@/shared/lib/seo";

export default function NotFound() {
  return (
    <Container size="sm" py="xl">
      <SEO title="Page not found" noIndex />
      <Stack align="center" gap="md">
        <Title order={1}>404</Title>
        <Text c="dimmed">The page you're looking for doesn't exist.</Text>
        <Button component={Link} to="/">
          Go home
        </Button>
      </Stack>
    </Container>
  );
}
