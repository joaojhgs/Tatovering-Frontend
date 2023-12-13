import React, { useEffect, useState } from 'react';

import { HeartFilled } from '@ant-design/icons';
import { Card, Image, Row } from 'antd';

import axios from '../../utils/axios-config';
import Usuario from '../../utils/usuario';

const { Meta } = Card;
export default function TatuagensFavoritas({ id }) {
    const [tatuagens, setTatuagens] = useState([]);
    const loggedUser = Usuario.getUsuario();

    const getFavoritos = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens/favoritos/${id}`)
            .then((e) => {
                setTatuagens(e.data);
            });
    };

    const desfavoritar = (tatuagem) => {
        const params = {
            usuario_id: loggedUser.id,
            tatuagem_id: tatuagem.id,
        };
        axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens/favoritos`, {
                params,
            })
            .then()
            .catch();
        getFavoritos();
    };

    useEffect(() => {
        getFavoritos();
    }, []);

    return (
        <div className="h-[calc(100vh-48px)] p-8">
            <div className="flex h-full flex-wrap gap-10 overflow-y-scroll rounded-lg bg-white p-8 ">
                <Row className="h-[80vh] justify-start gap-10 overflow-y-scroll px-4 pb-6">
                    {tatuagens.map((tatuagem, index) => (
                        <Card
                            hoverable
                            key={index}
                            className="rounded-xl shadow-md shadow-gray-300"
                            style={{ width: 260, height: 460 }}
                            cover={
                                <Image
                                    height={360}
                                    alt="example"
                                    src={tatuagem.imagem}
                                />
                            }
                        >
                            <Row className="justify-between">
                                <Meta
                                    title={tatuagem.estilo}
                                    description={'R$ ' + tatuagem.preco}
                                />
                                <p>
                                    <HeartFilled
                                        className="text-xl text-red-500"
                                        onClick={() => desfavoritar(tatuagem)}
                                    />
                                </p>
                            </Row>
                        </Card>
                    ))}
                </Row>
            </div>
        </div>
    );
}
