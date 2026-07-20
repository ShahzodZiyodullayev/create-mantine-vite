import { Alert, Avatar, Container, Skeleton, Table, Title } from "@mantine/core";

import { useUsers } from "@/entities/user";
import { SEO } from "@/shared/lib/seo";

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Users", item: "/users" },
  ],
};

export default function Users() {
  const { data, isLoading, error } = useUsers();

  return (
    <Container>
      <SEO title="Users" description="Browse all users from the demo API." jsonLd={breadcrumbLd} />
      <Title order={2} mb="md">
        Users
      </Title>

      {isLoading && <Skeleton h={400} />}

      {error && (
        <Alert color="red" variant="light">
          {(error as Error).message}
        </Alert>
      )}

      {data && (
        <Table striped withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Username</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.users.map(u => (
              <Table.Tr key={u.id}>
                <Table.Td>
                  <Avatar src={u.image} size="sm" radius="xl" />
                </Table.Td>
                <Table.Td>
                  {u.firstName} {u.lastName}
                </Table.Td>
                <Table.Td>{u.email}</Table.Td>
                <Table.Td>{u.username}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Container>
  );
}
