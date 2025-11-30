import { NFLTeams, FantasyPositions } from '@/lib/server';
import AdminPageHeader from '@/components/AdminPageHeader';
import { PlayerNew as PlayerNewForm } from '@/components/Forms/Player';

export default async function PlayerNew() {
  const [teams, positions] = await Promise.all([
    NFLTeams.getAll(),
    FantasyPositions.getAll(),
  ]);

  return (
    <>
      <AdminPageHeader
        pageTitle="Create New Player"
        backButton={{ href: '/admin/nfl-players', text: 'Back to Players' }}
      />
      <PlayerNewForm nflTeams={teams} fantasyPositions={positions} />
    </>
  );
}
