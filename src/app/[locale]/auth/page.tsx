import { useTranslations } from 'next-intl';

import FormComponent from '@/components/FormComponent';
import SignIn from '@/components/auth/SignIn';

export default function Page() {
  const t = useTranslations('site');

  return (
    <section className="max-h-[calc(100vh-65px)] overflow-hidden">  
      <SignIn />
    </section>
  );
}
