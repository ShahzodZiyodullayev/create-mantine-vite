import { Anchor, Avatar, Button, Group, Menu } from "@mantine/core";
import { Link } from "react-router-dom";

import { useAppSelector } from "@/app/store";
import { useLogout } from "@/features/auth";

export const Header = () => {
  const user = useAppSelector(s => s.auth.user);
  const logout = useLogout();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Anchor component={Link} to="/" fw={700} underline="never">
        Mantine Vite
      </Anchor>
      <Group gap="md">
        <Anchor component={Link} to="/users">
          Users
        </Anchor>
        {user ? (
          <Menu>
            <Menu.Target>
              <Avatar src={user.image} radius="xl" style={{ cursor: "pointer" }} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{user.username}</Menu.Label>
              <Menu.Item onClick={logout}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button component={Link} to="/login" size="xs">
            Login
          </Button>
        )}
      </Group>
    </Group>
  );
};
