'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Avatar, Group, Pagination, Table, Text } from '@mantine/core';

import type { NFLPlayer, NFLTeam, FantasyPosition } from '@/lib/types';

interface NFLTeamsTableProps {
  players: NFLPlayer[];
  teams: NFLTeam[];
  positions: FantasyPosition[];
  total: number;
  currentPage: number;
}

export default function NFLPlayersTable({
  players,
  teams,
  positions,
  total,
  currentPage,
}: NFLTeamsTableProps) {
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    router.push(`/admin/nfl-players?${params.toString()}`);
  };

  return (
    <>
      <Table striped highlightOnHover withTableBorder withColumnBorders mb="md">
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
                position.id.toString() ===
                player.fantasy_position_id.toString(),
            );
            return (
              <Table.Tr key={player.id}>
                <Table.Td>
                  <Group>
                    <Avatar src={player.image_url ?? ''} radius="xl" />
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
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
      )}
    </>
  );
}
