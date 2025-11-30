import { OwnerNew } from '@/components/Forms';
import AdminPageHeader from '@/components/AdminPageHeader';

export default function OwnerNewPage() {
  return (
    <>
      <AdminPageHeader
        pageTitle="Create New Owner"
        backButton={{ href: '/admin/owners', text: 'Back to Owners' }}
      />
      <OwnerNew />
    </>
  );
}
