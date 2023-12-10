import React, { useEffect, useState } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Row } from 'antd';

import useRequest from '../../hooks/useRequest';
import UsuarioController from '../../structures/controllers/UsuariosController';
import axios from '../../utils/axios-config';
import Usuario from '../../utils/usuario';
import ModalCadastrarTatuagem from './ModalCadastrarTatuagems';

const { Meta } = Card;

export default function Tatuagens({ id }) {
    const [tatuagens, setTatuagens] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tatuagensFavoritas, setTatuagensFavoritas] = useState([]);
    const [getUser] = useRequest(UsuarioController.getUserById);
    const loggedUser = Usuario.getUsuario();

    const showModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    const getTatuagens = () => {
        getUser({ id: id })
            .then((response) => {
                axios
                    .get(
                        `${process.env.NEXT_PUBLIC_API_URL}/tatuagens/tatuador/${response.tatuador_id}`,
                    )
                    .then((e) => {
                        setTatuagens(e.data.tatuagens);
                    });
            })
            .catch((e) => {});
    };

    const getFavoritos = () => {
        axios
            .get(
                `${process.env.NEXT_PUBLIC_API_URL}/tatuagens/favoritos/${loggedUser.id}`,
            )
            .then((e) => {
                const newItems = [];
                e.data.forEach((item) => {
                    newItems.push(item.id);
                });
                setTatuagensFavoritas(newItems);
            });
    };

    const mudaEstadoDeFavorito = (tatuagemId) => {
        if (tatuagensFavoritas.includes(tatuagemId)) {
            const params = {
                usuario_id: loggedUser.id,
                tatuagem_id: tatuagemId,
            };
            axios
                .delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/tatuagens/favoritos`,
                    { params },
                )
                .then(() => {})
                .catch();
        } else {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/tatuagens/favoritar`,
                    {
                        usuario_id: loggedUser.id,
                        tatuagem_id: tatuagemId,
                    },
                )
                .finally(() => {});
        }
        getFavoritos();
        getTatuagens();
    };

    const defineIcon = (item) => {
        if (tatuagensFavoritas.includes(item.id))
            return (
                <HeartFilled
                    className="text-xl text-red-500"
                    onClick={() => mudaEstadoDeFavorito(item.id)}
                />
            );
        else
            return (
                <HeartOutlined
                    className="text-xl"
                    onClick={() => mudaEstadoDeFavorito(item.id)}
                />
            );
    };

    useEffect(() => {
        getTatuagens();
        getFavoritos();
    }, []);

    return (
        <div className="h-[calc(100vh-48px)] p-8">
            <Col className="h-full rounded-md bg-white p-8">
                <Row className="p-4">
                    <Button
                        type="primary"
                        onClick={showModal}
                        className="h-10 text-white"
                    >
                        Nova Tatuagem
                    </Button>
                </Row>
                <ModalCadastrarTatuagem
                    userId={id}
                    closeModal={closeModal}
                    getTatuagens={getTatuagens}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                />

                <Row className="h-[75vh] justify-start gap-10 overflow-y-scroll px-4 pb-6">
                    {tatuagens.length > 0 &&
                        tatuagens.map((tatuagem, index) => (
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
                                <Row
                                    gutter={(24, 24)}
                                    className="justify-between"
                                >
                                    <Meta
                                        title={tatuagem.estilo}
                                        description={'R$ ' + tatuagem.preco}
                                    />
                                    <p>{defineIcon(tatuagem, index)}</p>
                                </Row>
                            </Card>
                        ))}
                </Row>
            </Col>
        </div>
    );
}
