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

    const [getUser] = useRequest(UsuarioController.getUserById);

    const showModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    function excluirTatuagem(e) {
        console.log('EXCLUIR TATUAGEM');
    }

    const getTatuagens = () => {
        getUser({ id: id })
            .then((response) => {
                axios
                    .get(
                        `${process.env.NEXT_PUBLIC_API_URL}/tatuagens/tatuador/${response.tatuador_id}`,
                    )
                    .then((e) => {
                        setTatuagens(e.data.tatuagens);
                        console.log(e.data.tatuagens);
                    });
            })
            .catch((e) => {});
    };
    const [tatuagensFavoritas, setTatuagensFavoritas] = useState([]);
    const loggedUser = Usuario.getUsuario();

    const getFavoritos = () => {
        console.log('BUSCANDO FAVORITOS');
        try {
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
        } catch (error) {
            console.log('ERRO AO BUSCAR FAVORITOS');
        }
    };
    const defineIcon = (item) => {
        if (tatuagensFavoritas.includes(item.id))
            return <HeartFilled className="text-lg text-red-500" />;
        else return <HeartOutlined className="text-lg" />;
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
                                <Row className="justify-between">
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
