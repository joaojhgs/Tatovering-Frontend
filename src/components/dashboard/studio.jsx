import React, { useContext, useEffect, useState } from 'react';

import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Grid, Image, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import useRequest from '../../hooks/useRequest';
import { UserContext } from '../../pages/dashboardPage';
import EstudioController from '../../structures/controllers/EstudiosController';
import TatuadoresController from '../../structures/controllers/TatuadoresController';
import { formatToCellphone } from '../../utils/formatter';
import MapBoxMap from '../mapBox/MapBoxMap';
import PageLayout from './layout/pageLayout';

const { useBreakpoint } = Grid;

export default function Studio() {
    const user = useContext(UserContext);

    const screens = useBreakpoint();

    const navigate = useNavigate();

    const [getEstudioById, loading, hasError] = useRequest(
        EstudioController.getEstudioById,
    );

    const [getTatuadoresByEstudioId, loadingTatuadores, hasErrorTatuadores] =
        useRequest(TatuadoresController.getTatuadoresByEstudioId);

    const [estudio, setEstudio] = useState(null);
    const [tatuadores, setTatuadores] = useState(null);

    const days = [
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado',
        'domingo',
    ];

    useEffect(() => {
        if (user) {
            getEstudioById({ estudioId: user.estudio_id })
                .then((response) => setEstudio(response))
                .catch(() => {});

            getTatuadoresByEstudioId({ estudioId: user.estudio_id })
                .then((response) => setTatuadores(response))
                .catch(() => {});
        }
    }, [user]);

    console.log(estudio);
    console.log('tt', tatuadores);

    const renderHorarios = () => {
        return days.map((day) => {
            const isWorkingDay =
                estudio.dias_funcionamento[day] &&
                estudio.horario_funcionamento[day];
            return (
                <Col span={24} key={day}>
                    <Card
                        size="small"
                        bodyStyle={{
                            display: 'flex',
                        }}
                    >
                        <Badge status={isWorkingDay ? 'success' : 'error'} />
                        <span
                            style={{
                                marginLeft: 24,
                                textTransform: 'capitalize',
                            }}
                        >
                            {/* {isWorkingDay ? 'Aberto' : 'Fechado'} */}
                            {day}
                        </span>
                        {isWorkingDay && (
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                }}
                            >
                                {estudio.horario_funcionamento[day][0]}
                                {' - '}
                                {estudio.horario_funcionamento[day][1]}
                            </span>
                        )}
                    </Card>
                </Col>
            );
        });
    };

    const renderIndividualInfo = (label, value) => {
        if (!value) return <></>;
        return (
            <Col span={24} xl={24}>
                <span>{label}:</span>{' '}
                <span style={{ fontWeight: 'bold' }}>{value}</span>
            </Col>
        );
    };

    const renderInfo = () => (
        <Row gutter={[16, 16]}>
            {renderIndividualInfo('Email', estudio?.email)}
            {renderIndividualInfo(
                'Telefone',
                formatToCellphone(estudio?.telefone),
            )}
            {renderIndividualInfo('Endereço', estudio?.endereco, 24)}
        </Row>
    );
    const renderBanner = () => (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <div
                    style={{
                        height: 180,
                        borderRadius: 8,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#eee',
                    }}
                >
                    {estudio.imagem_capa && (
                        <Image
                            wrapperStyle={{ width: '100%' }}
                            style={{ textAlign: 'center' }}
                            src={estudio.imagem_capa}
                        />
                    )}
                </div>
            </Col>
        </Row>
    );

    const renderLocation = () => (
        <MapBoxMap
            height={300}
            center={estudio?.localizacao}
            markers={[{ ...estudio?.localizacao, size: 0.2 }]}
        />
    );

    const renderTatuadores = () => (
        <Row gutter={[12, 12]}>
            {tatuadores.map((tatuador) => (
                <Col span={24} xl={12}>
                    <Card>
                        <Row>
                            <Col>
                                <div
                                    style={{
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: 'solid 1px',
                                        width: 60,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        src={tatuador.imagem_perfil}
                                        wrapperStyle={{ width: '100%' }}
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                            </Col>
                            <Col className="flex items-center">
                                <span className="ml-3 text-lg font-semibold">
                                    {tatuador.nome}
                                </span>
                            </Col>
                            <Col className="ml-auto flex items-center">
                                <Button
                                    onClick={() =>
                                        navigate(`/tatuador/${tatuador.id}`)
                                    }
                                >
                                    Ver Mais
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    return (
        <PageLayout
            title={estudio?.nome || 'Estúdio'}
            subtitle={estudio?.descricao}
            avatar={estudio?.imagem_perfil}
            extra={
                user?.is_proprietario && (
                    <Button type="link" icon={<EditOutlined />}>
                        {!screens.xs && 'Editar'}
                    </Button>
                )
            }
        >
            <Row gutter={[24, 24]}>
                <Col span={24} md={12} lg={14} xl={16}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Card loading={loading} title="Foto de Capa">
                                {estudio && renderBanner()}
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Localização">
                                {estudio && renderLocation()}
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} md={12} lg={10} xl={8}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Card loading={loading} title="Informações">
                                {estudio && renderInfo()}
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                loading={loading}
                                title="Horário de Funcionamento"
                            >
                                <Row gutter={[8, 8]}>
                                    {estudio && renderHorarios()}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Card title="Tatuadores">
                        {tatuadores && renderTatuadores()}
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
