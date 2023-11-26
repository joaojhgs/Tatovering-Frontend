import React, { useEffect, useState } from 'react';

import { ClockCircleOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Rate, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';

import CardTatuadores from './CardTatuadores/CardTatuadores';
import img from './images/img_background.png';

function Estudios({ id }) {
    const [tatuadores, setTatuadores] = useState([]);
    const [estudio, setEstudio] = useState();
    const days = [
        'domingo',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado',
        'domingo',
    ];
    const horarioSingular = (horario) => {
        return (
            <span style={{ marginLeft: 8 }}>
                {horario ? `${horario[0]} - ${horario[1]}` : 'Não abre'}
            </span>
        );
    };

    const renderHorario = (horario) => {
        console.log(horario);
        return (
            <Row gutter={8} className="text-black text-center">
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Segunda-feira:</span>
                    {horarioSingular(horario?.segunda)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Terça-feira:</span>
                    {horarioSingular(horario?.terca)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Quarta-feira:</span>
                    {horarioSingular(horario?.quarta)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Quinta-feira:</span>
                    {horarioSingular(horario?.quinta)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Sexta-feira:</span>
                    {horarioSingular(horario?.sexta)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Sábado:</span>
                    {horarioSingular(horario?.sabado)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Domingo:</span>
                    {horarioSingular(horario?.domingo)}
                </Col>
            </Row>
        );
    };

    const getStatus = (estudio) => {
        const today = days[moment().day()];

        console.log(moment().hour());
        return (
            <span style={{ color: 'red', marginLeft: 8 }}>
                <ClockCircleOutlined /> Fechado
            </span>
        );
        if (
            moment().isBetween(
                moment(estudio.horario_funcionamento[today][0], 'HH:mm'),
                moment(estudio.horario_funcionamento[today][1], 'HH:mm'),
            )
        ) {
            return (
                <span style={{ color: 'green', marginLeft: 8 }}>
                    <ClockCircleOutlined /> Aberto
                </span>
            );
        }
        return (
            <span style={{ color: 'red', marginLeft: 8 }}>
                <ClockCircleOutlined /> Fechado
            </span>
        );
    };
    const getTatuadores = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/tatuadores/estudios/${id}`)
            .then((e) => {
                console.log(
                    e.data.estudio[0].imagem_perfil,
                    e.data.estudio[0].imagem_capa,
                );
                setTatuadores(e.data.tatuadores);
                setEstudio(e.data.estudio[0]);
            });
    };

    useEffect(() => {
        if (!estudio) {
            getTatuadores();
        }
    }, []);

    return (
        <div className="h-screen w-screen bg-white">
            <div className="flex h-1/3 items-end justify-end bg-gray-500 relative">
                <img
                    className="align-center h-full object-cover"
                    src={
                        estudio?.imagem_capa.length &&
                        estudio?.imagem_capa.length > 0
                            ? estudio?.imagem_capa
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
                    <div className="absolute -left-10 -mt-24 flex flex-col items-center justify-center gap-10 z-40 bg-transparent ">
                        <img
                            className="h-52 w-52 rounded-full object-cover "
                            src={
                                estudio?.imagem_perfil.length &&
                                estudio?.imagem_perfil.length > 0
                                    ? estudio?.imagem_perfil
                                    : img
                            }
                            alt="imagem"
                            height={208}
                            width={208}
                        />
                        <div className="text-center">
                            <h2 className="font-serif text-5xl text-black">
                                {estudio?.nome || 'Tattovering  '}
                            </h2>
                            <h3 className="text-2xl text-gray-400">
                                @tattoovering
                            </h3>
                        </div>
                        {estudio?.horario_funcionamento && getStatus(estudio)}
                        {estudio?.horario_funcionamento &&
                            renderHorario(estudio?.horario_funcionamento)}
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
                    {tatuadores.length > 0 ? (
                        tatuadores.map((tatuador) => {
                            return <CardTatuadores {...tatuador} />;
                        })
                    ) : (
                        <Empty description="Nenhum tatuador" />
                    )}
                </div>
                <div className="w-1/4"></div>
            </div>
        </div>
    );
}
export default Estudios;
