'use client'
import Estudios from '@/components/estudios/Estudios';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams()
  return <Estudios id={params.id} />;
}
