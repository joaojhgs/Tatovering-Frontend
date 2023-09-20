'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import QueueAnim from 'rc-queue-anim';

import Banner from '@/components/homepage/banner';
import Services from '@/components/homepage/services';

const { Title } = Typography;
export default function Page() {
  const t = useTranslations('site');
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div>
      <Banner />
      <Services />
    </div>
  );
}
