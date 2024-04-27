'use client';

import { useParams } from 'next/navigation';

import Estudios from '@/components/estudios/Estudios';

export default function Page() {
  const params = useParams();
  return <Estudios id={params.id} />;
}
