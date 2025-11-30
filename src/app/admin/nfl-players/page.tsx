import { NFLPlayers, NFLTeams, FantasyPositions } from '@/lib/server';
import AdminPageHeader from '@/components/AdminPageHeader';
import NFLPlayersTable from '@/components/NFLPlayersTable';

export default async function NFLPlayersPage() {
  const [teams, positions, players] = await Promise.all([
    NFLTeams.getAll(),
    FantasyPositions.getAll(),
    NFLPlayers.getAll(),
  ]);

  return (
    <>
      <AdminPageHeader
        pageTitle="NFL Players"
        newEntityButton={{ href: '/admin/nfl-players/new', text: 'New Player' }}
      />
      <NFLPlayersTable players={players} teams={teams} positions={positions} />
    </>
  );
}
