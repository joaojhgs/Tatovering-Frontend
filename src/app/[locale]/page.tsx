'use client';

import { useEffect, useState } from 'react';

import { Typography } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import Banner from '@/components/homepage/banner';
import Estudios from '@/components/homepage/estudios/estudios';
import Footer from '@/components/homepage/footer';
import Services from '@/components/homepage/services';
import Tatuadores from '@/components/homepage/tatuadores';
import Tatuagens from '@/components/homepage/tatuagens';
import { Tatuador, Tatuagem } from '@/utils/interfaces';

const { Title } = Typography;
export default function Page() {
  const t = useTranslations('site');
  const [isMounted, setIsMounted] = useState(false);
  const [tatuagens, setTatuagens] = useState<Tatuagem[]>([
    {
      agendamento_id: 0,
      cor: '',
      desenho: '',
      estilo: '',
      preco: 0,
      tamanho: 0,
      tatuador_id: 0,
    } as Tatuagem,
  ]);
  const [tatuadores, setTatuadores] = useState<Tatuador[]>([
    {
      id: 0,
      estudio_id: 0,
      experiencia: 0,
      estilo_tatuagem: '',
      status: '',
      tipo: '',
      redes_sociais: {
        x: '',
        instagram: '',
        facebook: '',
      },
      data_criacao: new Date(),
      data_atualizacao: new Date(),
    } as Tatuador,
  ]);
  useEffect(() => {
    setIsMounted(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
      console.log(e);
      setTatuagens(e.data as Tatuagem[]);
    });
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuadores`).then((e) => {
      console.log('tatuadores', e);
      setTatuadores(e.data as Tatuador[]);
    });
  }, []);
  return (
    <div>
      <Banner />
      <Services />
      <Tatuagens tatuagens={tatuagens} />
      <Tatuadores tatuadores={tatuadores} />
      <Estudios />
      <Footer />
    </div>
  );
}
