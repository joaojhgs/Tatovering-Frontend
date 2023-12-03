import React, { useEffect, useState } from 'react';

import { Card, Image, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { IoIosStar } from 'react-icons/io';

import axios from '../../utils/axios-config';

export default function TatuagensFavoritas({ id }) {
    const [tatuagens, setTatuagens] = useState([]);

    function getFavoritos() {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens/favoritos/${id}`)
            .then((e) => {
                console.log(e.data);
                setTatuagens(e.data);
            });
    }

    function excluirFavorito() {
        console.log('Excluir tatuagem dos favoritos');
    }

    useEffect(() => {
        getFavoritos();
    }, []);

    return (
        <div className="h-[calc(100vh-48px)] p-8">
            <div className="flex h-full flex-wrap gap-10 overflow-y-scroll rounded-lg bg-white p-8 ">
                {tatuagens.map((item, index) => (
                    <Card
                        hoverable
                        key={index}
                        className="rounded-xl shadow-md shadow-gray-300"
                        style={{ width: 260, height: 460 }}
                        cover={
                            <Image
                                height={360}
                                alt="example"
                                src={item.imagem}
                            />
                        }
                    >
                        <Row className="justify-between">
                            <Meta
                                title={item.estilo}
                                description={'R$ ' + item.preco}
                            />
                            <p>
                                <IoIosStar
                                    color="yellow"
                                    size={30}
                                    onClick={excluirFavorito}
                                />
                            </p>
                        </Row>
                    </Card>
                ))}
            </div>
        </div>
    );
}
