import React, { useEffect, useState } from 'react';

import { Button, Card, Form, Image, Input, Select, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';

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
    const [tatuadores, setTatuadores] = useState([]);
    const [nomeTatuador, setNomeTatuador] = useState('');

    const [form] = useForm();

    /* Routas da API */
    const getTatuadores = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuadores`).then((e) => {
            setTatuadores(e.data);
        });
    };

    const getTatuagens = () => {
        if (nomeTatuador !== '') {
            tatuadores.forEach((tatuador) => {
                if (tatuador.nome.indexOf(nomeTatuador)) {
                    axios
                        .get(
                            `${process.env.NEXT_PUBLIC_API_URL}/tatuagens/tatuador/${tatuador.id}`,
                        )
                        .then((e) => {
                            setTatuagens(e.data.tatuagens);
                        });
                }
            });
        } else {
            axios
                .get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`)
                .then((e) => {
                    setTatuagens(e.data);
                });
        }
    };

    /* Funções Locais */
    const buscaTatuadorPeloNome = () => {
        const tatuadoresEncontrados = [];

        tatuadores.forEach((tatuador) => {
            if (tatuador.nome.indexOf(nomeTatuador)) {
                tatuadoresEncontrados.push(tatuador);
            }
        });
    };

    const limparFiltros = () => {
        form.resetFields();
        setColorFilter('Cor');
        setFiltroEstilo('Estilo');
        setNomeTatuador('');
    };

    const handleChangeCor = (value) => setColorFilter(value);
    const handleChangeEstilo = (value) => setFiltroEstilo(value);

    useEffect(() => {
        getTatuagens();
        getTatuadores();
    }, []);

    useEffect(() => {
        buscaTatuadorPeloNome();
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
                    <Form.Item name="search-field">
                        <Input
                            placeholder="Pesquisar tatuador"
                            className="h-10 rounded-s"
                            defaultValue={''}
                            onChange={(value) =>
                                setNomeTatuador(value.target.value)
                            }
                        />
                    </Form.Item>
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

                <div className="flex w-full flex-row gap-5">
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
                                    style={{ width: 260 }}
                                    cover={
                                        <Image
                                            height={360}
                                            alt="example"
                                            src={item.imagem}
                                        />
                                    }
                                >
                                    <Meta
                                        title={item.estilo}
                                        description={'R$ ' + item.preco}
                                    />
                                </Card>
                            );
                        else if (filtroCor == 'Cor' && filtroEstilo == 'Estilo')
                            return (
                                <Card
                                    hoverable
                                    key={index}
                                    className="rounded-xl"
                                    style={{ width: 260 }}
                                    cover={
                                        <Image
                                            height={360}
                                            alt="example"
                                            src={item.imagem}
                                        />
                                    }
                                >
                                    <Meta
                                        title={item.estilo}
                                        description={'R$ ' + item.preco}
                                    />
                                </Card>
                            );
                    })}
                </div>
            </Form>
        </div>
    );
}
