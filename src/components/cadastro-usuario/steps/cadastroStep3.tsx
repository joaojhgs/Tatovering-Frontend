'use client';

import { Button, Col, Form, Input, Row, Select } from 'antd';

export default function CadastroStep3({
  handleSubmit,
  goBack,
}: {
  handleSubmit: (values: {
    experience: string;
    estilo_tatuagem: string;
    tipo: string;
    instagram: string;
  }) => void;
  goBack: () => void;
}) {
  return (
    <div className="mt-4 w-full max-w-xl sm:mt-14">
      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={[24, 0]}>
          <Col span={24} md={12}>
            <Form.Item name="experience" label="Tempo de Experiência" required>
              <Input
                type="text"
                placeholder="Insira o tempo de experiência"
                suffix="meses"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name="estilo_tatuagem"
              label="Estilo de Tatuagem"
              initialValue=""
            >
              <Select
                placeholder="Nenhum definido"
                mode="multiple"
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
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="tipo" label="Tipo de profissional" required>
              <Select
                placeholder="Selecionar tipo"
                options={[
                  { value: 'autonomo', label: 'Autônomo' },
                  { value: 'proprietario', label: 'Proprietário de Estúdio' },
                  { value: 'profissional', label: 'Profissional de Estúdio' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name="instagram" label="Instagram">
              <Input type="text" prefix="@" placeholder="usuario" />
            </Form.Item>
          </Col>
        </Row>
        <div className="mt-8 flex w-full justify-center gap-6">
          <Button size="large" onClick={goBack}>
            Voltar
          </Button>
          <Button type="primary" size="large" htmlType="submit">
            Finalizar Cadastro
          </Button>
        </div>
      </Form>
    </div>
  );
}
