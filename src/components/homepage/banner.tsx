import Image from 'next/image';

import { DownOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
const {Title} = Typography;
const Banner = () => {
  return (
    <div
      className="relative min-h-[calc(100vh-65px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1557130641-1b14718f096a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80)',
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="z-[100]">
        <div className="flex justify-center text-center">
          <Image
            alt="banner"
            width="409"
            height="409"
            src="https://i.imgur.com/hzyA9mR.png"
          />
        </div>
        <Title level={3} className="text-center">Simplificando o agendamento de tatuagens</Title>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <Button href='#services' type="primary" className='rounded-full w-[40px] h-[40px] animate-bounce flex justify-center'><DownOutlined className='mt-auto mb-auto' /></Button>
      </div>
    </div>
  );
};

export default Banner;
