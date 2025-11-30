import AdminPageHeader from '@/components/AdminPageHeader';
import { OwnersTable } from '@/components/OwnersTable';

import { Owners as OwnersService } from '@/lib/server';

export default async function OwnersPage() {
  const owners = await OwnersService.getAll();

  return (
    <>
      <AdminPageHeader
        pageTitle="Owners"
        newEntityButton={{ href: '/admin/owners/new', text: 'New Owner' }}
      />
      <OwnersTable owners={owners} />
    </>
  );
}
