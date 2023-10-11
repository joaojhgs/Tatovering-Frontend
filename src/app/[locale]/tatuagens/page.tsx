'use client';

import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import EmblaCarousel from '@/components/EmblaCarousel';
import Tatuagens from '@/components/homepage/tatuagens';
import { formatToMoney } from '@/utils/formatter';
import { requiredRule } from '@/utils/inputRules';
import { Tatuagem } from '@/utils/interfaces';

import './tatuagens.css';

/* eslint-disable @next/next/no-img-element */

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

// drag drop file component
function DragDropFile({ handleFiles, uploaded }: any) {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef: any = React.useRef(null);

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: any) {
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
              <button className="upload-button" onClick={onButtonClick}>
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

const { Meta } = Card;
export default function Page() {
  const t = useTranslations('site');
  const [tatuagens, setTatuagens] = useState<Tatuagem[]>([
    {
      agendamento_id: 0,
      cor: '',
      desenho: '',
      estilo: '',
      preco: 0,
      tamanho: 0,
      tatuador_id: 0,
    } as Tatuagem,
  ]);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [form] = useForm();

  const getTatuagens = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
      console.log(e);
      setTatuagens(e.data as Tatuagem[]);
    });
  };
  const registarTatuagem = (values: any) => {
    console.log('Received values of form: ', values);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`, {
        desenho: values.desenho,
        estilo: values.estilo,
        cor: values.cor,
        tamanho: parseInt(values.tamanho),
        preco: parseInt(values.preco),
      })
      .finally(() => {
        getTatuagens();
      });
  };

  const handleFile = async (files: any) => {
    const file = await toBase64(files[0]);
    form.setFieldValue('desenho', file);
    setUploadedFile(file);
  };

  useEffect(() => {
    getTatuagens();
  }, []);

  return (
    <div
      className="relative flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-500 bg-cover bg-no-repeat px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1479767574301-a01c78234a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
      }}
    >
      <Card>
        <h2 className="mb-10  text-3xl font-bold">Registrar Tatuagem</h2>
        <Form
          form={form}
          name="tatuagem"
          className=""
          initialValues={{ remember: true }}
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
                    { value: 'Aquarela', label: 'Aquarela' },
                    { value: 'Black Work', label: 'Black Work' },
                    { value: 'Biomecânica', label: 'Biomecânica' },
                    { value: 'Celta', label: 'Celta' },
                    { value: 'Comics', label: 'Comics' },
                    { value: 'Colorida', label: 'Colorida' },
                    { value: 'Freehand', label: 'Freehand' },
                    { value: 'Geométrico', label: 'Geométrico' },
                    { value: 'Gray Wash', label: 'Gray Wash' },
                    { value: 'Lettering', label: 'Lettering' },
                    { value: 'Mandala', label: 'Mandala' },
                    { value: 'Maori', label: 'Maori' },
                    { value: 'New School', label: 'New School' },
                    { value: 'Old School', label: 'Old School' },
                    { value: 'Oriental', label: 'Oriental' },
                    { value: 'Pontilhismo', label: 'Pontilhismo' },
                    { value: 'Portrait', label: 'Portrait' },
                    { value: 'Realismo', label: 'Realismo' },
                    { value: 'Traços Finos', label: 'Traços Finos' },
                    { value: 'Tribal', label: 'Tribal' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="cor" label="Cor">
                <Input type="text" className="" placeholder="Cor" />
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
        <div
          className="mx-auto my-2"
          style={{ maxWidth: 1200, display: 'flex', overflowX: 'auto' }}
        >
          {tatuagens.map((e, index) => (
            <Card
              hoverable
              className="mx-2"
              key={index}
              style={{ width: 240, flexShrink: 0 }}
              cover={
                // eslint-disable-next-line @next/next/no-img-element
                <img width={240} height={240} alt="example" src={e.desenho} />
              }
            >
              <Meta title={e.estilo} description={'R$ ' + e.preco} />
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
