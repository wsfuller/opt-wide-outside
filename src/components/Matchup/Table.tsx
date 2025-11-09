'use client';

import { Table } from '@mantine/core';

import { toiletBowl } from '@/lib/data';

export default function MatchupTable() {
  const team1players = toiletBowl.teams[0].players;
  const team2players = toiletBowl.teams[1].players;
  // const positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DST'];
  const positions = [
    'QB',
    'WR1',
    'WR2',
    'RB1',
    'RB2',
    'TE',
    'Flex',
    'Super Flex',
    'K',
    'DST',
  ];
  const collatedRows = positions.map((position, index) => {
    return (
      <Table.Tr key={`match-up-row-${index}`}>
        <Table.Td>{team1players[index]?.name || 'No player'}</Table.Td>
        <Table.Td fs="italic" fz="xs">
          {team1players[index]?.projection || '0.00'}
        </Table.Td>
        <Table.Td fw="bold" ta="right">
          {team1players[index]?.points || '0.00'}
        </Table.Td>
        <Table.Td ta="center">{position}</Table.Td>
        <Table.Td fw="bold">{team2players[index]?.points || '0.00'}</Table.Td>
        <Table.Td fs="italic" fz="xs">
          {team2players[index]?.projection || '0.00'}
        </Table.Td>
        <Table.Td>{team2players[index]?.name || 'No player'}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Player</Table.Th>
          <Table.Th>Projection</Table.Th>
          <Table.Th>Points</Table.Th>
          <Table.Th ta="center">Position</Table.Th>
          <Table.Th>Points</Table.Th>
          <Table.Th>Projection</Table.Th>
          <Table.Th>Player</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {collatedRows}
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td></Table.Td>
          <Table.Td fw="bold" ta="right">
            100.3
          </Table.Td>
          <Table.Td ta="center">Total</Table.Td>
          <Table.Td fw="bold">105.4</Table.Td>
          <Table.Td></Table.Td>
          <Table.Td></Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
