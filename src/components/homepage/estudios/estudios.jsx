import React, { useEffect, useState } from 'react';

import {
    ClockCircleOutlined,
    DownOutlined,
    EyeOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import { Popup } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';

import icone from '../../../assets/icon-marker.png';
import useRequest from '../../../hooks/useRequest';
import EstudioController from '../../../structures/controllers/EstudiosController';
import MapBoxMap from '../../mapBox/MapBoxMap';

export default function Estudios() {
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

    const [getEstudios, loading] = useRequest(EstudioController.getEstudios);

    const [estudios, setEstudios] = useState([]);
    const [flyTo, setFlyTo] = useState([]);
    const [eventsCreated, setEventsCreated] = useState(false);
    const [popup, setPopup] = useState(null);
    const [showHours, setShowHours] = useState(null);
    const navigate = useNavigate();
    const onHover = (event, map) => {
        const area = event.features[0].properties;
        setPopup(area);
    };

    const onMouseLeave = (event, map) => {
        setPopup(null);
    };

    const handleMapLoad = (mapRef) => {
        if (!eventsCreated) {
            const setMouse = (type) => {
                mapRef.getCanvas().style.cursor = type;
            };

            mapRef.on('mouseenter', ['MarkerLayer'], (e) => {
                setMouse('pointer');
                onHover(e, mapRef);
            });

            mapRef.on('mouseleave', ['MarkerLayer'], (e) => {
                setMouse('');
                onMouseLeave(e, mapRef);
            });
            setEventsCreated(true);
        }
    };

    useEffect(() => {
        getEstudios()
            .then((response) => {
                setEstudios(response);
            })
            .catch(console.log);
    }, []);

    const horarioSingular = (horario) => {
        if (!horario) {
            <span style={{ marginLeft: 8 }}>Não Informado</span>;
        }
        return (
            <span style={{ marginLeft: 8 }}>
                {horario ? `${horario[0]} - ${horario[1]}` : 'Não abre'}
            </span>
        );
    };

    const renderHorario = (horario) => {
        return (
            <Row gutter={8}>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Segunda-feira:</span>
                    {horarioSingular(horario.segunda)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Terça-feira:</span>
                    {horarioSingular(horario.terca)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Quarta-feira:</span>
                    {horarioSingular(horario.quarta)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Quinta-feira:</span>
                    {horarioSingular(horario.quinta)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Sexta-feira:</span>
                    {horarioSingular(horario.sexta)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Sábado:</span>
                    {horarioSingular(horario.sabado)}
                </Col>
                <Col span={24}>
                    <span style={{ opacity: 0.6 }}>Domingo:</span>
                    {horarioSingular(horario.domingo)}
                </Col>
            </Row>
        );
    };

    const getStatus = (estudio) => {
        const today = days[moment().day()];
        if (!estudio.horario_funcionamento[today]) {
            return (
                <span style={{ color: 'gray', marginLeft: 8 }}>
                    <ClockCircleOutlined /> Não Informado
                </span>
            );
        }
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

    const renderLista = () => {
        const list = estudios.map((estudio, index) => (
            <Col span={24} className="mb-4">
                <Card
                    style={{
                        transition: 'filter .6s ease, transform .3s ease',
                        filter:
                            popup && popup.email != estudio.email
                                ? 'blur(4px)'
                                : 'blur(0px)',
                        transform:
                            popup && popup.email == estudio.email
                                ? 'scale(1.02)'
                                : 'scale(1)',
                    }}
                >
                    <Row>
                        <Col span={20}>
                            <Row>
                                <Col span={24}>
                                    <span className="text-xl font-bold">
                                        {estudio.nome}
                                    </span>
                                </Col>
                                <Col span={24}>
                                    <span className="mt-2 text-base opacity-60">
                                        {estudio.endereco}
                                    </span>
                                </Col>
                                <Col span={24}>
                                    <span className="mt-6 text-base">
                                        {estudio.descricao}
                                    </span>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        style={{ paddingLeft: 0 }}
                                        onClick={() => {
                                            setShowHours(
                                                showHours === index
                                                    ? null
                                                    : index,
                                            );
                                        }}
                                        icon={
                                            <RightOutlined
                                                style={{
                                                    transform: `rotate(${
                                                        showHours === index
                                                            ? 90
                                                            : 0
                                                    }deg)`,
                                                    transition:
                                                        'transform .3s ease',
                                                }}
                                            />
                                        }
                                        type="link"
                                    >
                                        Ver horários de funcionamento{' - '}
                                        <span>{getStatus(estudio)}</span>
                                    </Button>
                                    <div
                                        style={{
                                            marginLeft: 24,
                                            overflow: 'hidden',
                                            height:
                                                showHours === index ? 154 : 0,
                                            transition: 'height .3s ease',
                                        }}
                                    >
                                        {renderHorario(
                                            estudio.horario_funcionamento,
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4} className="ml-auto flex flex-col">
                            <div style={{ marginLeft: 'auto' }}>
                                <Tooltip title="Ver no mapa">
                                    <EyeOutlined
                                        style={{
                                            opacity: 0.6,
                                            fontSize: 20,
                                            cursor: 'pointer',
                                            transition: 'transform .3s ease',
                                        }}
                                        className="hover:scale-110"
                                        onClick={() => {
                                            setFlyTo({
                                                center: {
                                                    lng: estudio.localizacao
                                                        .longitude,
                                                    lat: estudio.localizacao
                                                        .latitude,
                                                },
                                            });
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            <Button
                                type="primary"
                                style={{ marginTop: 'auto' }}
                                onClick={() =>
                                    navigate(`/estudio/${estudio.id}`)
                                }
                            >
                                Saber Mais
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        ));
        return list;
    };

    return (
        <div className="flex w-full flex-col justify-center">
            <h2 className="mx-auto mb-6 mt-16 text-2xl font-bold leading-normal text-white">
                Econtre os estúdios perto de você
            </h2>
            <p className="mx-auto pb-2 text-xl font-light leading-relaxed text-gray-500">
                Faça um agendamento com o seu estúdio favorito.
            </p>
            <Row style={{ marginTop: 24 }}>
                <Col md={12} span={24}>
                    <Row
                        className="w-full px-4"
                        style={{ maxHeight: 600, overflowY: 'auto' }}
                    >
                        {renderLista()}
                    </Row>
                </Col>
                <Col md={12} span={24}>
                    <MapBoxMap
                        center={[-52.3786073, -24.0471264]}
                        zoom={15}
                        height="600px"
                        onMapLoad={handleMapLoad}
                        markers={estudios.map((estudio) => ({
                            position: estudio.localizacao,
                            icon: icone.src,
                            size: 0.2,
                            ...estudio,
                        }))}
                        flyTo={flyTo}
                    >
                        {/* {!!popup && (
              <Popup
                {...JSON.parse(popup.localizacao)}
                anchor="bottom"
                offset={40}
              >
                <span className="text-gray-900">{popup.nome}</span>
              </Popup>
            )} */}
                    </MapBoxMap>
                </Col>
            </Row>
        </div>
    );
}
