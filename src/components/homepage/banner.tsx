import Image from 'next/image';

import { DownOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

const { Title } = Typography;
const Banner = () => {
  return (
    <div
      className="relative flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-500 bg-cover bg-no-repeat px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1557130641-1b14718f096a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80)',
      }}
    >
      <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
      <div className="z-[100]">
        <div className="flex justify-center text-center">
          <Image
            alt="banner"
            width="409"
            height="409"
            src="https://i.imgur.com/hzyA9mR.png"
          />
        </div>
        <Title level={3} className="text-center" style={{ color: '#eee' }}>
          Simplificando o agendamento de tatuagens
        </Title>
      </div>
      <div className="absolute bottom-0 left-0 flex w-full justify-center">
        <Button
          href="#services"
          type="primary"
          className="flex size-[40px] animate-bounce justify-center rounded-full"
        >
          <DownOutlined className="my-auto" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
