'use client';

import { Button, Col, Form, Input, Row } from 'antd';

export default function CadastroStep3({
  handleSubmit,
}: {
  handleSubmit: (values: {
    nome: string;
    telefone_celular: string;
    cpf: string;
    rg?: string;
    endereco?: string;
  }) => void;
}) {
  return (
    <div className="mt-4 w-full max-w-xl sm:mt-14">
      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={[24, 0]}>
          <Col span={24} md={12}>
            <Form.Item name="nome" label="Nome" required>
              <Input type="text" placeholder="Insira seu nome" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="telefone_celular" label="Telefone" required>
              <Input type="text" placeholder="(99)99999-9999" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="cpf" label="CPF" required>
              <Input type="text" placeholder="123.456.789-0" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="rg" label="RF">
              <Input type="text" placeholder="12.345.678-90" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="endereco" label="Endereço">
              <Input type="text" placeholder="Insira seu endereço" />
            </Form.Item>
          </Col>
        </Row>
        <div className="mt-8 flex w-full justify-center">
          <Button type="primary" size="large" htmlType="submit">
            Continuar
          </Button>
        </div>
      </Form>
    </div>
  );
}
