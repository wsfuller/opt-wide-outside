'use client';
import { Avatar, Button, Table, Text } from '@mantine/core';
import type { Owner } from '@/lib/types';

interface OwnersTableProps {
  owners: Owner[];
}

export default function OwnersTable({ owners }: OwnersTableProps) {
  if (!owners || owners.length! < 0)
    <Text>No owners found. Add your first owner!</Text>;

  return (
    <Table mt="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Photo</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Team Name</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {owners.map((owner) => (
          <Table.Tr key={owner.id}>
            <Table.Td>
              <Avatar src={owner.team_logo_url} radius="xl" />
            </Table.Td>
            <Table.Td>
              {owner.first_name} {owner.last_name}
            </Table.Td>
            <Table.Td>{owner.team_name}</Table.Td>
            <Table.Td>{owner.is_active ? 'Active' : 'Inactive'}</Table.Td>
            <Table.Td>
              <Button size="xs" variant="subtle">
                Edit
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
