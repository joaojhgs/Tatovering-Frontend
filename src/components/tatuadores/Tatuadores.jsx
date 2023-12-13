import React, { useEffect, useState } from 'react';

import { Button, Card, Empty } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';

import EmblaCarousel from '../EmblaCarousel';
// import CardTatuadores from './CardTatuadores/CardTatuadores';
import img from './images/img_background.png';

import ScheduleModal from '../schedule-modal/schedule-modal'

function Tatuadores({ id }) {
    const [tatuador, setTatuador] = useState();
    const [tatuagens, setTatuagens] = useState();

    const [schedulleDate, setSchedulleData] = useState(null);

    const getTatuagens = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens/tatuador/${id}`)
            .then((e) => {
                console.log(e.data);
                setTatuagens(e.data.tatuagens);
                setTatuador(e.data.tatuador[0]);
            });
    };

    useEffect(() => {
        if (!tatuador) {
            getTatuagens();
        }
    }, []);

    return (
        <div className="h-screen w-screen bg-white">
            <div className="relative flex h-1/3 items-end justify-end bg-gray-500">
                <img
                    className="align-center h-full object-cover"
                    src={
                        tatuador?.imagem_capa.length &&
                            tatuador?.imagem_capa.length > 0
                            ? tatuador?.imagem_capa
                            : img
                    }
                    alt="imagem"
                    style={{ width: '100%' }}
                />
                <Button className="absolute mb-5 mr-16 h-12 w-32 border-none bg-blue-600 text-xl font-bold text-white hover:text-white">
                    Seguir
                </Button>
            </div>

            <div className="flex w-screen flex-row px-12">
                <div className="h-1/2 w-1/3 ">
                    <div className="absolute left-20 z-40 -mt-24 flex flex-col items-center justify-center gap-10 bg-transparent ">
                        <img
                            className="h-52 w-52 rounded-full object-cover "
                            src={
                                tatuador?.imagem_perfil.length &&
                                    tatuador?.imagem_perfil.length > 0
                                    ? tatuador?.imagem_perfil
                                    : img
                            }
                            alt="imagem"
                            height={208}
                            width={208}
                        />

                        <div className="text-center">
                            <h2 className="font-serif text-5xl text-black">
                                {tatuador?.nome || 'Tattovering  '}
                            </h2>
                            <h3 className="text-2xl text-gray-400">
                                @tattoovering
                            </h3>
                        </div>
                        {/* <div className="flex h-6  flex-col">
              <h2 className=" text-3xl text-gray-600">32.7k seguidores</h2>
            </div>
            <div className="flex h-6 flex-col items-center  ">
              <p className="text-gray-800">Avaliação dos clientes</p>
              <Rate disabled defaultValue={4.5} />;
            </div> */}
                    </div>
                </div>

                <div className=" flex w-1/2 flex-col items-center gap-5 pt-10">
                    {tatuagens && tatuagens?.length > 0 ? (
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
                                                <img
                                                    width={240}
                                                    height={240}
                                                    alt="example"
                                                    src={e.imagem}
                                                />
                                            }
                                            onClick={() => {
                                                setSchedulleData({
                                                    tatuagem_id: e.id,
                                                    tatuagem_url: e.imagem,
                                                    tatuador_id: e.tatuador_id
                                                })
                                            }}
                                        >
                                            <Meta
                                                title={e.estilo}
                                                description={'R$ ' + e.preco}
                                            />
                                        </Card>
                                    );
                                })}
                            />
                        </div>
                    ) : (
                        <Empty description="Nenhuma tatuagem" />
                    )}
                </div>
                <div className="w-1/4"></div>
                <ScheduleModal data={schedulleDate} setData={setSchedulleData} />
            </div>
        </div>
    );
}
export default Tatuadores;
