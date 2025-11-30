import { NFLTeams } from '@/lib/server';
import AdminPageHeader from '@/components/AdminPageHeader';
import { NFLTeamsTable } from '@/components/NFLTeamsTable';

export default async function NFLTeamsPage() {
  const teams = await NFLTeams.getAll();

  return (
    <>
      <AdminPageHeader
        pageTitle="NFL Teams"
        newEntityButton={{ href: '/admin/nfl-teams/new', text: 'New NFL Team' }}
      />
      <NFLTeamsTable teams={teams} />
    </>
  );
}
