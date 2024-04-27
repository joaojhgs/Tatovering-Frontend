'use client';

import { useParams } from 'next/navigation';

import Tatuadores from '@/components/tatuadores/Tatuadores';

export default function Page() {
  const params = useParams();
  return <Tatuadores id={params.id} />;
}
