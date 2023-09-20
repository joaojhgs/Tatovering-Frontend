import { useTranslations } from 'next-intl';

import SignUp from '@/components/auth/SignUp';

export default function Page() {
  const t = useTranslations('site');

  return <SignUp />;
}
