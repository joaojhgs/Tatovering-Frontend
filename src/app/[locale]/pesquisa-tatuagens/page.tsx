'use client';

import { useEffect, useState } from 'react';

import { Button, Card, Image, Input, Select, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';

import { Tatuador, Tatuagem } from '@/utils/interfaces';

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
  const [tatuadores, setTatuadores] = useState<Tatuador[]>([]);
  const [nomeTatuador, setNomeTatuador] = useState<string>('');

  /*************************************************************************
   *                             Routas da API                             *
   *************************************************************************/
  const getTatuagens = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuadores`).then((e) => {
      console.log(e.data);
      setTatuadores(e.data as Tatuador[]);
      console.log(tatuadores);
    });
  };

  const getTatuadores = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
      console.log(e.data);
      setTatuagens(e.data as Tatuagem[]);
    });
  };

  /*************************************************************************
   *                             Funções Locais                            *
   *************************************************************************/
  const buscaTatuadorPeloNome = (nomeTatuador: string) => {
    const tatuadoresEncontrados: Tatuador[] = [];

    tatuadores.forEach((tatuador) => {
      if (tatuador.nome.indexOf(nomeTatuador)) {
        tatuadoresEncontrados.push(tatuador);
      }
    });

    console.log('Tatuadores encontrados:');
    console.log(tatuadoresEncontrados);
  };

  const limparFiltros = () => {
    setColorFilter('Cor');
    setFiltroEstilo('Estilo');
  };

  const handleChangeCor = (value: string) => setColorFilter(value);
  const handleChangeEstilo = (value: string) => setFiltroEstilo(value);

  /*************************************************************************
   *                              UseEffects                               *
   **************************************************************************/
  useEffect(() => {
    getTatuagens();
    getTatuadores();
  }, []);

  useEffect(() => {
    buscaTatuadorPeloNome(nomeTatuador);
  }, [nomeTatuador]);

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
            className="h-10 rounded-s"
            defaultValue={''}
            onChange={(value) => setNomeTatuador(value.target.value)}
          />
          <Select
            placeholder="Estilo"
            className="h-10  rounded-s"
            style={{ width: 120 }}
            onChange={handleChangeEstilo}
            options={optionsEstilos}
          />
          <Select
            placeholder="Cor"
            className="h-10 rounded-s "
            style={{ width: 120 }}
            onChange={handleChangeCor}
            options={optionsColors}
          />
          <Button className="h-10 rounded-s" onClick={limparFiltros}>
            Limpar Filtros
          </Button>
        </Space>

        <div className="flex w-full flex-row gap-5">
          {tatuagens.map((item, index) => {
            if (filtroCor === item.cor || filtroEstilo === item.estilo)
              return (
                <Card
                  hoverable
                  key={index}
                  style={{ width: 240 }}
                  cover={
                    <Image
                      width={240}
                      height={280}
                      alt="example"
                      src={item.imagem}
                    />
                  }
                >
                  <Meta title={item.estilo} description={'R$ ' + item.preco} />
                </Card>
              );
            else if (filtroCor == 'Cor' && filtroEstilo == 'Estilo')
              return (
                <Card
                  hoverable
                  key={index}
                  style={{ width: 240 }}
                  cover={
                    <Image
                      width={240}
                      height={280}
                      alt="example"
                      src={item.imagem}
                    />
                  }
                >
                  <Meta title={item.estilo} description={'R$ ' + item.preco} />
                </Card>
              );
          })}
        </div>
      </div>
    </div>
  );
}
