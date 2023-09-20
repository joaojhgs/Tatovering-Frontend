import SignUp from '@/components/auth/SignUp';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('site');

  return (
    <section className="max-h-[calc(100vh-65px)] overflow-hidden">  
      <SignUp />
    </section>
  );
}
