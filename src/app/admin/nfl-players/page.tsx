import { NFLPlayers, NFLTeams, FantasyPositions } from '@/lib/server';
import AdminPageHeader from '@/components/AdminPageHeader';
import NFLPlayersTable from '@/components/NFLPlayersTable';

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NFLPlayersPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  const [teams, positions, players] = await Promise.all([
    NFLTeams.getAll(),
    FantasyPositions.getAll(),
    NFLPlayers.getPaginated(currentPage),
  ]);

  return (
    <>
      <AdminPageHeader
        pageTitle="NFL Players"
        newEntityButton={{ href: '/admin/nfl-players/new', text: 'New Player' }}
      />
      <NFLPlayersTable
        players={players.data}
        teams={teams}
        positions={positions}
        total={players.total}
        currentPage={currentPage}
      />
    </>
  );
}
