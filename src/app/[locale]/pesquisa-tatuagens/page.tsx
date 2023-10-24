'use client';

import { useEffect, useState } from 'react';

import { Button, Image, Input, Select, Space } from 'antd';
import axios from 'axios';

import { Tatuagem } from '@/utils/interfaces';

const { Search } = Input;

const optionsColors = [
  { value: 'aquarela', label: 'Aquarela' },
  {
    value: 'preto e branco com detalhe verde',
    label: 'Com Detalhe',
  },
  {
    value: 'preto e branco',
    label: 'Preto e Branco',
  },
];

const optionsEstilos = [
  { value: 'escrita', label: 'Escrita' },
  { value: 'Realismo', label: 'Realismo' },
];

export default function Page() {
  const [filtroEstilo, setFiltroEstilo] = useState('Estilo');
  const [filtroCor, setColorFilter] = useState('Cor');
  const [tatuagens, setTatuagens] = useState<Tatuagem[]>([]);
  const [nomeTatuador, setNomeTatuador] = useState<string>('');

  const getTatuagens = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
      console.log(e);
      setTatuagens(e.data as Tatuagem[]);
    });
  };

  const limparFiltros = () => {
    setColorFilter('Cor');
    setFiltroEstilo('Estilo');
  };

  const handleChangeCor = (value: string) => setColorFilter(value);
  const handleChangeEstilo = (value: string) => setFiltroEstilo(value);

  useEffect(() => {
    getTatuagens();
  }, []);

  return (
    <div
      className="relative flex min-h-[calc(100vh-65px)] flex-wrap items-start justify-center gap-10 bg-gray-500 bg-cover bg-no-repeat px-4 py-6 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1557130641-1b14718f096a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80)',
      }}
    >
      <div className="flex w-3/4 flex-col items-start justify-center gap-4">
        <Space>
          <Input
            placeholder="Pesquisar tatuador"
            defaultValue={''}
            onChange={(value) => setNomeTatuador(value.target.value)}
          />
          <Select
            defaultValue={filtroEstilo}
            style={{ width: 120 }}
            onChange={handleChangeEstilo}
            options={optionsEstilos}
          />
          <Select
            defaultValue={filtroCor}
            style={{ width: 120 }}
            onChange={handleChangeCor}
            options={optionsColors}
          />
          <Button onClick={limparFiltros}>Limpar Filtros</Button>
        </Space>

        <div className="flex w-full flex-row gap-5">
          {nomeTatuador === '' &&
            tatuagens.map((item) => {
              if (filtroCor === item.cor || filtroEstilo === item.estilo)
                return (
                  <div className="h-96 w-52 ">
                    <Image src={item.imagem} alt="tatuagem" />
                  </div>
                );
              else if (filtroCor == 'Cor' && filtroEstilo == 'Estilo')
                return (
                  <div className="h-96 w-52 ">
                    <Image src={item.imagem} alt="tatuagem" />
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}
