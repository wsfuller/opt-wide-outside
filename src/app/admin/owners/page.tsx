'use client';
import { useEffect, useState } from 'react';

import AdminPageHeader from '@/components/AdminPageHeader';
import { OwnersTable } from '@/components/OwnersTable';
import Loading from '@/components/Loading';

import { getOwners } from '@/lib/server';
import type { Owner } from '@/lib/types';

export default function Owners() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true);
        const data = await getOwners();
        setOwners(data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching owners:', error);
      }
    };

    fetchOwners();
  }, []);

  if (loading) return <Loading />;

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
