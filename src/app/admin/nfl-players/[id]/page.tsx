import { notFound } from 'next/navigation';
import { NFLPlayers } from '@/lib/server';
import AdminPageHeader from '@/components/AdminPageHeader';

export default async function NFLPlayer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await NFLPlayers.getById(id);

  if (!player) {
    notFound();
  }
  return (
    <>
      <AdminPageHeader
        pageTitle={
          player.first_name && player.last_name
            ? `${player.first_name} ${player.last_name}`
            : `NFL Player Details`
        }
        backButton={{ href: '/admin/nfl-players', text: 'Back to Players' }}
      />
      {/* <NFLPlayersTable players={players} teams={teams} positions={positions} /> */}
    </>
  );
}
