'use client';
import type { NFLTeam } from '@/lib/types';
import { Table } from '@mantine/core';

interface NFLTeamsTableProps {
  teams: NFLTeam[];
}

export default function NFLTeamsTable({ teams }: NFLTeamsTableProps) {
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Team Name</Table.Th>
          <Table.Th>Location</Table.Th>
          <Table.Th>Conference</Table.Th>
          <Table.Th>Division</Table.Th>
          <Table.Th>Abbreviation</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {teams.map((team) => (
          <Table.Tr key={team.id}>
            <Table.Td>{team.team_name}</Table.Td>
            <Table.Td>{team.location}</Table.Td>
            <Table.Td>{team.conference}</Table.Td>
            <Table.Td>{team.division}</Table.Td>
            <Table.Td>{team.abbreviation}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
