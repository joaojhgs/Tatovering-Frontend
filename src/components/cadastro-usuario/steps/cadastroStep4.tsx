'use client';

import { useState } from 'react';

import { Button, Col, Form, Input, Row, Select } from 'antd';
import { Marker } from 'react-map-gl';

import MapBoxMap from '@/components/map/mapBoxMap';

export default function CadastroStep4({
  handleSubmit,
  goBack,
}: {
  handleSubmit: (values: any) => void;
  goBack: () => void;
}) {
  const [location, setLocation] = useState<any>(null);
  const [center, setCenter] = useState<any>({
    latitude: -24.0471264,
    longitude: -52.3786073,
  });

  const handleOwnSubmit = (values: any) => {
    handleSubmit({
      ...values,
      localizacao: location,
    });
  };

  return (
    <div className="mt-4 w-full max-w-xl sm:mt-14">
      <Form onFinish={handleOwnSubmit} layout="vertical">
        <Row gutter={[24, 0]}>
          <Col span={24} md={12}>
            <Form.Item name="nome" label="Nome" required>
              <Input type="text" placeholder="Insira o nome do estúdio" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="email" label="Email" required>
              <Input type="text" placeholder="Insira o email do estúdio" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="endereco" label="Endereço" required>
              <Input type="text" placeholder="Insira o endereço do estúdio" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="descricao" label="Descrição" required>
              <Input type="text" placeholder="Insira a descrição do estúdio" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <MapBoxMap
              center={[-52.3786073, -24.0471264]}
              zoom={15}
              height="200px"
            >
              <Marker
                draggable
                {...center}
                onDragEnd={({ lngLat }) => {
                  setLocation(`${lngLat.lat},${lngLat.lng}`);
                  setCenter({
                    longitude: lngLat.lng,
                    latitude: lngLat.lat,
                  });
                }}
              />
            </MapBoxMap>
          </Col>
        </Row>
        <div className="mt-8 flex w-full justify-center gap-6">
          <Button size="large" onClick={goBack}>
            Voltar
          </Button>
          <Button type="primary" size="large" htmlType="submit">
            Continuar
          </Button>
        </div>
      </Form>
    </div>
  );
}
