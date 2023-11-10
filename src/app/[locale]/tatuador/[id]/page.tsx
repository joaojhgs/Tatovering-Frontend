'use client'
import Tatuadores from '@/components/tatuadores/Tatuadores';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams()
  return <Tatuadores id={params.id} />;
}
