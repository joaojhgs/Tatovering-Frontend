import { useTranslations } from 'next-intl';

import SignIn from '@/components/auth/SignIn';

export default function Page() {
  const t = useTranslations('site');

  return (
      <SignIn />
  );
}
