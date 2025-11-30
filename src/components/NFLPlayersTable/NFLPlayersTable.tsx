'use client';
import Link from 'next/link';
import { Avatar, Group, Table, Text } from '@mantine/core';

import type { NFLPlayer, NFLTeam, FantasyPosition } from '@/lib/types';

interface NFLTeamsTableProps {
  players: NFLPlayer[];
  teams: NFLTeam[];
  positions: FantasyPosition[];
}

export default function NFLPlayersTable({
  players,
  teams,
  positions,
}: NFLTeamsTableProps) {
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Player</Table.Th>
          <Table.Th>Team</Table.Th>
          <Table.Th>Position</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {players.map((player) => {
          const team = teams.find((team) => team.id === player.nfl_team_id);
          const position = positions.find(
            (position) =>
              position.id.toString() === player.fantasy_position_id.toString(),
          );
          return (
            <Table.Tr key={player.id}>
              <Table.Td>
                <Group>
                  <Avatar src="" radius="xl" />
                  <Link href={`/admin/nfl-players/${player.id}`}>
                    <Text>{`${player.first_name} ${player.last_name}`}</Text>
                  </Link>
                </Group>
              </Table.Td>
              <Table.Td>{team?.team_name}</Table.Td>
              <Table.Td>{position?.abbreviation}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
