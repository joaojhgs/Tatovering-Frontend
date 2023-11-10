import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function useAuthentication() {
  const router = useRouter();

  useEffect(() => {}, [router]);
}
