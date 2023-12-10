import React, { useEffect, useState } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Card, Form, Image, Row, Select, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';

import Usuario from '../utils/usuario';

export default function PesquisaTatuagens() {
    const [filtroCor, setColorFilter] = useState('Cor');
    const [filtroEstilo, setFiltroEstilo] = useState('Estilo');
    const [optionsEstilos, setOptionsEstilos] = useState([]);
    const [optionsCores, setOptionsCoress] = useState([]);

    const [tatuagens, setTatuagens] = useState([]);
    const [tatuagensFavoritas, setTatuagensFavoritas] = useState([]);

    const loggedUser = Usuario.getUsuario();
    const [form] = useForm();

    const handleChangeCor = (value) => setColorFilter(value);
    const handleChangeEstilo = (value) => setFiltroEstilo(value);

    const getTatuagens = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
            setTatuagens(e.data);
            const estilos = [];
            const cores = [];
            e.data.forEach((tatuagem) => {
                estilos.push({
                    value: tatuagem.estilo,
                    label: tatuagem.estilo,
                });
                cores.push({ value: tatuagem.cor, label: tatuagem.cor });
            });
            setOptionsEstilos(estilos);
            setOptionsCoress(cores);
        });
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

    const limparFiltros = () => {
        form.resetFields();
        setColorFilter('Cor');
        setFiltroEstilo('Estilo');
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
        getFavoritos();
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
                            options={optionsCores}
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
                    {tatuagens.map((tatuagem, index) => {
                        if (
                            filtroCor === tatuagem.cor ||
                            filtroEstilo === tatuagem.estilo
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
                            );
                    })}
                </Row>
            </Form>
        </div>
    );
}
