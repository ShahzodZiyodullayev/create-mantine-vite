import { Alert, Button, Code, Container, Group, Stack, Title } from "@mantine/core";

type Props = {
  error: unknown;
  reset?: () => void;
};

export const ErrorFallback = ({ error, reset }: Props) => {
  const isDev = import.meta.env.DEV;
  const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
  const stack = error instanceof Error ? error.stack : undefined;

  return (
    <Container size="sm" py="xl">
      <Stack>
        <Title order={2}>Something went wrong</Title>
        <Alert color="red" variant="light">
          {message}
        </Alert>
        {isDev && stack && (
          <Code block style={{ maxHeight: 240, overflow: "auto" }}>
            {stack}
          </Code>
        )}
        <Group>
          {reset && (
            <Button onClick={reset} variant="light">
              Try again
            </Button>
          )}
          <Button onClick={() => (window.location.href = "/")}>Go home</Button>
        </Group>
      </Stack>
    </Container>
  );
};
