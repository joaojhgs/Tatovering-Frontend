'use client'
import { useTranslations } from 'next-intl';

import { Typography } from 'antd';

const { Title } = Typography;
export default function Page() {
  const t = useTranslations('site');

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1479767574301-a01c78234a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <Title className='text-white'>{t('title')}</Title>
    </div>
  );
}
