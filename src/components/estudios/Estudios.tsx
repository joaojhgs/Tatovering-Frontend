'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button, Rate } from 'antd';
import axios from 'axios';

import { Estudio } from '@/structures/interfaces/Estudio';
import { Tatuador } from '@/utils/interfaces';

import CardTatuadores from './CardTatuadores/CardTatuadores';
import img from './images/img_background.png';
import imgProfile from './images/img_profile.jpeg';

function Estudios() {
  const [tatuadores, setTatuadores] = useState<Tatuador[]>([]);
  const [estudio, setEstudio] = useState<Estudio>();

  const getTatuadores = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tatuadores/estudios?ccc79204-4d5c-49a3-ac85-e369ed089a35`,
      )
      .then((e) => {
        setTatuadores(e.data.tatuagens as Tatuador[]);
        console.log(tatuadores);
      });
  };
  const getEstudios = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/estudios?=estudios?ccc79204-4d5c-49a3-ac85-e369ed089a35`,
      )
      .then((e) => {
        setTatuadores(e.data.tatuagens as Tatuador[]);
        console.log(tatuadores);
      });
  };

  useEffect(() => {
    getTatuadores();
  }, []);

  return (
    <div className="h-screen w-screen bg-white">
      <div className="flex h-1/3 items-end justify-end bg-gray-500">
        <Image
          className="align-center h-full bg-cover"
          src={img}
          alt="imagem"
        />
        <Button className="absolute mb-5 mr-16 h-12 w-32 border-none bg-blue-600 text-xl font-bold text-white hover:text-white">
          Seguir
        </Button>
      </div>

      <div className="flex w-screen flex-row px-12">
        <div className="h-1/2 w-1/3 ">
          <div className=" -mt-24 flex flex-col items-center justify-center gap-10  bg-transparent ">
            <Image
              className="h-52 w-52 rounded-full "
              src={imgProfile}
              alt="imagem"
            />
            <div className="text-center">
              <h2 className="font-serif text-5xl text-black">
                {estudio?.nome || 'Tattovering  '}
              </h2>
              <h3 className="text-2xl text-gray-400">@tattoovering</h3>
            </div>

            <div className="flex h-6  flex-col">
              <h2 className=" text-3xl text-gray-600">32.7k seguidores</h2>
            </div>
            <div className="flex h-6 flex-col items-center  ">
              <p className="text-gray-800">Avaliação dos clientes</p>
              <Rate disabled defaultValue={4.5} />;
            </div>
          </div>
        </div>

        <div className=" flex w-1/2 flex-col items-center gap-5 pt-10">
          {tatuadores &&
            tatuadores.map((tatuador) => {
              return (
                <CardTatuadores
                  nome={tatuador.nome}
                  estilo_tatuagem={tatuador.estilo_tatuagem}
                />
              );
            })}
          {!tatuadores && [<CardTatuadores />, <CardTatuadores />]}
        </div>
        <div className="w-1/4"></div>
      </div>
    </div>
  );
}
export default Estudios;
