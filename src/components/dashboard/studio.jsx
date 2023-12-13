import React, { useContext, useEffect, useState } from 'react';

import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Form, Grid, Image, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import useRequest from '../../hooks/useRequest';
import { UserContext } from '../../pages/dashboardPage';
import EstudioController from '../../structures/controllers/EstudiosController';
import TatuadoresController from '../../structures/controllers/TatuadoresController';
import { formatToCellphone } from '../../utils/formatter';
import MapBoxMap from '../mapBox/MapBoxMap';
import PageLayout from './layout/pageLayout';

const { useBreakpoint } = Grid;

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

// drag drop file component
function DragDropFile({ handleFiles, uploaded }) {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        if (inputRef.current) inputRef.current.click();
    };

    return (
        <form
            id="form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
            style={{ border: uploaded ? 'none' : undefined }}
        >
            <input
                ref={inputRef}
                type="file"
                id="input-file-upload"
                multiple={true}
                onChange={handleChange}
            />
            <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className={dragActive ? 'drag-active' : ''}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {uploaded ? (
                        <div
                            style={{
                                backgroundImage: `url(${uploaded})`,
                                backgroundSize: 'contain',
                                width: '100%',
                                height: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        />
                    ) : (
                        <>
                            <p>Arraste o arquivo aqui ou clique</p>
                            <button
                                className="upload-button"
                                onClick={onButtonClick}
                            >
                                Fazer Upload
                            </button>
                        </>
                    )}
                </div>
            </label>
            {dragActive && (
                <div
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                ></div>
            )}
        </form>
    );
}

export default function Studio() {
    const user = useContext(UserContext);

    const screens = useBreakpoint();

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const [getEstudioById, loading, hasError] = useRequest(
        EstudioController.getEstudioById,
    );

    const [getTatuadoresByEstudioId, loadingTatuadores, hasErrorTatuadores] =
        useRequest(TatuadoresController.getTatuadoresByEstudioId);

    const [estudio, setEstudio] = useState(null);
    const [tatuadores, setTatuadores] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

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
            {!isEditing ? (
                <>
                    {renderIndividualInfo('Email', estudio?.email)}
                    {renderIndividualInfo(
                        'Telefone',
                        formatToCellphone(estudio?.telefone),
                        )}
                    {renderIndividualInfo('Endereço', estudio?.endereco, 24)}
                </>
            ): (
                <>
                    <Col span={24}>
                        <Form.Item label="Email" name="email" initialValue={estudio?.email}>
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Endereço" name="endereco" initialValue={estudio?.endereco}>
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                </>
            )}
        </Row>
    );

    const handleFile = async (files) => {
        const file = await toBase64(files[0]);
        form.setFieldValue('desenho', file);
        setUploadedFile(file);
    };

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
                    {estudio.imagem_capa && !isEditing && (
                        <Image
                            wrapperStyle={{ width: '100%' }}
                            style={{ textAlign: 'center' }}
                            src={estudio.imagem_capa}
                        />
                    )}
                    {isEditing && (
                        <DragDropFile
                            handleFiles={handleFile}
                            uploaded={uploadedFile}
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
                                        height: 60,
                                        background: '#232323',
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

    const handleSubmit = () => {
        
    };

    return (
        <>
            <PageLayout
                title={estudio?.nome || 'Estúdio'}
                subtitle={estudio?.descricao}
                avatar={estudio?.imagem_perfil}
                extra={
                    user?.is_proprietario && (
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            style={{color: isEditing && 'red'}}
                            onClick={() => setIsEditing(prev => !prev)}
                        >
                            {!screens.xs && (isEditing ? 'Cancelar' : 'Editar')}
                        </Button>
                    )
                }
            >
                <Form>
                    <Row gutter={[24, 24]} style={{
                        marginBottom: isEditing && 80,
                    }}>
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
                </Form>
            </PageLayout>
            {isEditing && (<Card
                style={{
                    position: 'fixed',
                    bottom: 0,
                    width: 'calc(100% - 240px)',
                    height: 80,
                    boxShadow: '0 0 10px #0008',
                    zIndex: 9999,
                }}
            >
                <Row gutter={[12, 12]} style={{ justifyContent: 'end' }}>
                    <Col>
                        <Button>Cancelar</Button>
                    </Col>
                    <Col>
                        <Button type="primary">Salvar</Button>
                    </Col>
                </Row>
            </Card>)}
        </>
    );
}
