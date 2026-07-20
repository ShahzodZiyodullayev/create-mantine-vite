import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useLogin } from "../model/auth.queries";

export const LoginForm = () => {
  const login = useLogin();

  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: {
      username: value => (value.trim().length > 0 ? null : "Username is required"),
      password: value => (value.length > 0 ? null : "Password is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit(values => login.mutate(values))}>
      <Stack>
        <TextInput label="Username" placeholder="emilys" {...form.getInputProps("username")} />
        <PasswordInput
          label="Password"
          placeholder="emilyspass"
          {...form.getInputProps("password")}
        />
        <Button type="submit" loading={login.isPending} fullWidth>
          Sign in
        </Button>
      </Stack>
    </form>
  );
};
