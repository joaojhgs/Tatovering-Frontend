'use client';

import { useEffect, useState } from 'react';

import { Button, Card, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import EmblaCarousel from '@/components/EmblaCarousel';
import Tatuagens from '@/components/homepage/tatuagens';
import { Tatuagem } from '@/utils/interfaces';

const { Meta } = Card;
export default function Page() {
  const t = useTranslations('site');
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
  const [form] = useForm();
  const getTatuagens = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
      console.log(e);
      setTatuagens(e.data as Tatuagem[]);
    });
  };
  const registarTatuagem = (values: any) => {
    console.log('Received values of form: ', values.desenho);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`, {
        desenho: values.desenho,
        estilo: values.estilo,
        cor: values.cor,
        tamanho: parseInt(values.tamanho),
        preco: parseInt(values.preco),
      })
      .finally(() => {
        getTatuagens();
      });
  };
  useEffect(() => {
    getTatuagens();
  }, []);

  return (
    <div
      className="relative flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-500 bg-cover bg-no-repeat px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1479767574301-a01c78234a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
      }}
    >
      <div className="h-4/5 w-1/4 max-w-3xl items-center rounded-xl bg-black p-12 text-center">
        <h2 className="mb-10  text-3xl font-bold">Resgistrar Tatuagem</h2>
        <Form
          form={form}
          name="tatuagem"
          className="login-form  space-y-6"
          initialValues={{ remember: true }}
          onFinish={registarTatuagem}
        >
          <Form.Item name="desenho">
            <Input
              type="text"
              className="h-12 w-full border-b border-gray-400 py-2 text-base focus:border-indigo-500 focus:outline-none"
              placeholder="URL da Imagem"
            />
          </Form.Item>
          <Form.Item name="estilo">
            <Input
              type="text"
              className="h-12 w-full border-b border-gray-400 py-2 text-base focus:border-indigo-500 focus:outline-none"
              placeholder="Estilo"
            />
          </Form.Item>
          <Form.Item name="cor">
            <Input
              type="text"
              className="h-12 w-full border-b border-gray-400 py-2 text-base focus:border-indigo-500 focus:outline-none"
              placeholder="Cor"
            />
          </Form.Item>
          <Form.Item name="preco">
            <Input
              type="number"
              className="h-12 w-full border-b border-gray-400 py-2 text-base focus:border-indigo-500 focus:outline-none"
              placeholder="Preço"
            />
          </Form.Item>
          <Form.Item name="tamanho">
            <Input
              type="number"
              className="h-12 w-full border-b border-gray-400 py-2 text-base focus:border-indigo-500 focus:outline-none"
              placeholder="Tamanho"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="focus:shadow-outline flex h-16 w-full cursor-pointer justify-center rounded-sm  font-semibold  tracking-wide  text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none"
          >
            Concluir
          </Button>
        </Form>
      </div>
      <div className="mx-auto my-2">
        <EmblaCarousel
          options={{ direction: 'ltr' }}
          slides={tatuagens.map((e, index) => {
            return (
              <Card
                hoverable
                className="mx-2"
                key={index}
                style={{ width: 240 }}
                cover={
                  <img width={240} height={240} alt="example" src={e.desenho} />
                }
              >
                <Meta title={e.estilo} description={'R$ ' + e.preco} />
              </Card>
            );
          })}
        />
      </div>
    </div>
  );
}
