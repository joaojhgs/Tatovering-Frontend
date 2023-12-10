import React, { useEffect, useState } from 'react';

import { HeartFilled } from '@ant-design/icons';
import { Card, Image, Row } from 'antd';

import axios from '../../utils/axios-config';

const { Meta } = Card;
export default function TatuagensFavoritas({ id }) {
    const [tatuagens, setTatuagens] = useState([]);

    function getFavoritos() {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens/favoritos/${id}`)
            .then((e) => {
                setTatuagens(e.data);
            });
    }

    function desfavoritar(item) {
        console.log(item.id);
    }

    useEffect(() => {
        getFavoritos();
    }, []);

    return (
        <div className="h-[calc(100vh-48px)] p-8">
            <div className="flex h-full flex-wrap gap-10 overflow-y-scroll rounded-lg bg-white p-8 ">
                <Row className="h-[75vh] justify-start gap-10 overflow-y-scroll px-4 pb-6">
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
                                    <HeartFilled
                                        id={item.id}
                                        className="text-lg text-red-500"
                                        onClick={() => desfavoritar(item)}
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
