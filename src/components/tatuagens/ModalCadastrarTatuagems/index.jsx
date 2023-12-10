import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';

import '../../cadastro-tatuagens/tatuagens.css';

import useRequest from '../../../hooks/useRequest';
import UsuarioController from '../../../structures/controllers/UsuariosController';
import { requiredRule } from '../../../utils/inputRules';

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

export default function ModalCadastrarTatuagem({
    userId,
    closeModal,
    handleCancel,
    isModalOpen,
    getTatuagens,
}) {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [getUser] = useRequest(UsuarioController.getUserById);

    const [user, setUser] = useState(null);
    const [form] = useForm();

    const registarTatuagem = (values) => {
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens/`, {
                imagem: values.desenho,
                estilo: values.estilo,
                cor: values.cor,
                tamanho: parseInt(values.tamanho),
                preco: parseInt(values.preco),
                tatuador_id: user.tatuador_id,
            })
            .finally(() => {
                getTatuagens();
                closeModal();
            });
    };

    useEffect(() => {
        getUser({ id: userId })
            .then((response) => {
                setUser(response);
            })
            .catch((e) => {});
    }, []);

    const handleFile = async (files) => {
        const file = await toBase64(files[0]);
        form.setFieldValue('desenho', file);
        setUploadedFile(file);
    };

    useEffect(() => {
        getUser();
        getTatuagens();
    }, []);

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            centered
            width={1000}
            height
            footer={[]}
        >
            <Card className="border-none">
                <h2 className="mb-10  text-3xl font-bold">
                    Registrar Tatuagem
                </h2>
                <Form
                    form={form}
                    name="tatuagem"
                    className=""
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={registarTatuagem}
                    layout="vertical"
                    size="large"
                >
                    <Row gutter={[24, 24]}>
                        <Col span={12}>
                            <Form.Item name="desenho" rules={[requiredRule]}>
                                <DragDropFile
                                    handleFiles={handleFile}
                                    uploaded={uploadedFile}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="estilo"
                                label="Estilo de Tatuagem"
                                rules={[requiredRule]}
                            >
                                <Select
                                    placeholder="Selecione um estilo"
                                    options={[
                                        {
                                            value: 'Aquarela',
                                            label: 'Aquarela',
                                        },
                                        {
                                            value: 'Black Work',
                                            label: 'Black Work',
                                        },
                                        {
                                            value: 'Biomecânica',
                                            label: 'Biomecânica',
                                        },
                                        {
                                            value: 'Celta',
                                            label: 'Celta',
                                        },
                                        {
                                            value: 'Comics',
                                            label: 'Comics',
                                        },
                                        {
                                            value: 'Colorida',
                                            label: 'Colorida',
                                        },
                                        {
                                            value: 'Freehand',
                                            label: 'Freehand',
                                        },
                                        {
                                            value: 'Geométrico',
                                            label: 'Geométrico',
                                        },
                                        {
                                            value: 'Gray Wash',
                                            label: 'Gray Wash',
                                        },
                                        {
                                            value: 'Lettering',
                                            label: 'Lettering',
                                        },
                                        {
                                            value: 'Mandala',
                                            label: 'Mandala',
                                        },
                                        {
                                            value: 'Maori',
                                            label: 'Maori',
                                        },
                                        {
                                            value: 'New School',
                                            label: 'New School',
                                        },
                                        {
                                            value: 'Old School',
                                            label: 'Old School',
                                        },
                                        {
                                            value: 'Oriental',
                                            label: 'Oriental',
                                        },
                                        {
                                            value: 'Pontilhismo',
                                            label: 'Pontilhismo',
                                        },
                                        {
                                            value: 'Portrait',
                                            label: 'Portrait',
                                        },
                                        {
                                            value: 'Realismo',
                                            label: 'Realismo',
                                        },
                                        {
                                            value: 'Traços Finos',
                                            label: 'Traços Finos',
                                        },
                                        {
                                            value: 'Tribal',
                                            label: 'Tribal',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name="cor" label="Cor">
                                <Input
                                    type="text"
                                    className=""
                                    placeholder="Cor"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="preco" label="Preço médio">
                                <Input
                                    type="number"
                                    className=""
                                    prefix="R$"
                                    placeholder="Preço"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="tamanho" label="Tamanho">
                                <Input
                                    type="number"
                                    className=""
                                    suffix="cm"
                                    placeholder="Tamanho"
                                />
                            </Form.Item>
                        </Col>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="focus:shadow-outline flex h-16 w-full cursor-pointer justify-center rounded-sm  font-semibold  tracking-wide  text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none"
                        >
                            Concluir
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Modal>
    );
}
