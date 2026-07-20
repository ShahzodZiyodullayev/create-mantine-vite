import { Container, Paper, Text, Title } from "@mantine/core";

import { LoginForm } from "@/features/auth";
import { SEO } from "@/shared/lib/seo";

export default function Login() {
  return (
    <Container size="xs" py="xl">
      <SEO title="Login" description="Sign in to access your account." noIndex />
      <Title order={2} ta="center" mb="lg">
        Welcome back
      </Title>
      <Paper p="md" withBorder>
        <LoginForm />
      </Paper>
      <Text size="xs" c="dimmed" ta="center" mt="md">
        Demo: emilys / emilyspass
      </Text>
    </Container>
  );
}
