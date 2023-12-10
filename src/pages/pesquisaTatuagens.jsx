import React, { useEffect, useState } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Card, Form, Image, Row, Select, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';

import Usuario from '../utils/usuario';

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

export default function PesquisaTatuagens() {
    const [filtroEstilo, setFiltroEstilo] = useState('Estilo');
    const [filtroCor, setColorFilter] = useState('Cor');

    const [tatuagens, setTatuagens] = useState([]);
    const [nomeTatuador, setNomeTatuador] = useState('');

    const [form] = useForm();

    const getTatuagens = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
            setTatuagens(e.data);
        });
    };

    const limparFiltros = () => {
        form.resetFields();
        setColorFilter('Cor');
        setFiltroEstilo('Estilo');
        setNomeTatuador('');
    };
    const [tatuagensFavoritas, setTatuagensFavoritas] = useState([]);
    const loggedUser = Usuario.getUsuario();

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

    const handleChangeCor = (value) => setColorFilter(value);
    const handleChangeEstilo = (value) => setFiltroEstilo(value);

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
                .then()
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
                    className="text-lg text-red-500"
                    onClick={() => mudaEstadoDeFavorito(item.id)}
                />
            );
        else
            return (
                <HeartOutlined
                    className="text-lg"
                    onClick={() => mudaEstadoDeFavorito(item.id)}
                />
            );
    };

    useEffect(() => {
        getTatuagens();
        getFavoritos();
    }, []);

    useEffect(() => {
        getTatuagens();
    }, [nomeTatuador]);

    return (
        <div
            className="relative flex min-h-[calc(100vh-65px)] flex-wrap items-start justify-center gap-10 bg-gray-500 bg-cover bg-no-repeat px-4 py-6 sm:px-6 lg:px-8"
            style={{
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1557130641-1b14718f096a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80)',
            }}
        >
            <Form
                form={form}
                className="flex w-3/4 flex-col items-start justify-center gap-4"
            >
                <Space>
                    <Form.Item name="style-field">
                        <Select
                            placeholder="Estilo"
                            className="h-10  rounded-s"
                            style={{ width: 120 }}
                            onChange={handleChangeEstilo}
                            options={optionsEstilos}
                        />
                    </Form.Item>
                    <Form.Item name="cor-field">
                        <Select
                            placeholder="Cor"
                            className="h-10 rounded-xl "
                            style={{ width: 120 }}
                            onChange={handleChangeCor}
                            options={optionsColors}
                        />
                    </Form.Item>

                    <Form.Item name="btn-clean-fields">
                        <Button
                            className="h-10 rounded-s"
                            onClick={() => limparFiltros()}
                        >
                            Limpar Filtros
                        </Button>
                    </Form.Item>
                </Space>

                <Row className="flex h-[80vh] w-full flex-row gap-5 overflow-y-scroll ">
                    {tatuagens.map((item, index) => {
                        if (
                            filtroCor === item.cor ||
                            filtroEstilo === item.estilo
                        )
                            return (
                                <Card
                                    hoverable
                                    key={index}
                                    className="rounded-xl"
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
                                        <p>{defineIcon(item, index)}</p>
                                    </Row>
                                </Card>
                            );
                        else if (filtroCor == 'Cor' && filtroEstilo == 'Estilo')
                            return (
                                <Card
                                    hoverable
                                    key={index}
                                    className="rounded-xl"
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
                                        <p>{defineIcon(item, index)}</p>
                                    </Row>
                                </Card>
                            );
                    })}
                </Row>
            </Form>
        </div>
    );
}
