'use client';
import { useEffect, useState } from 'react';

import { Text } from '@mantine/core';

import PageTitle from '@/components/PageTitle';
import Loading from '@/components/Loading';
import { OwnersTable } from '@/components/OwnersTable';
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
      <PageTitle title="Owners" />

      {owners && owners.length > 0 ? (
        <OwnersTable owners={owners} />
      ) : (
        <Text>No owners found. Add your first owner!</Text>
      )}
    </>
  );
}
