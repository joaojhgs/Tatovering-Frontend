'use client';

import { useState } from 'react';

import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from 'antd';
import moment from 'moment';
import { Marker } from 'react-map-gl';

import MapBoxMap from '@/components/map/mapBoxMap';

export default function CadastroStep5({
  handleSubmit,
  goBack,
}: {
  handleSubmit: (values: any) => void;
  goBack: () => void;
}) {
  const [hours, setHours] = useState<any>({});
  const [days, setDays] = useState({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
    domingo: false,
  });

  const renderCard = (dia: string) => {
    return (
      <Col span={24}>
        <Card size="small">
          <Row>
            <Col>
              <Checkbox
                onChange={({ target }) => {
                  setDays((prev: any) => ({
                    ...prev,
                    [dia.toLowerCase()]: target.checked,
                  }));
                }}
              />
              <span style={{ marginLeft: 8 }}>{dia}</span>
            </Col>
            <Col style={{ marginLeft: 'auto', marginRight: 64 }}>
              <TimePicker.RangePicker
                disabled={!days[dia.toLowerCase() as keyof typeof days]}
                format="HH:mm"
                onChange={(val) => {
                  console.log(val);
                  if (val && val.length > 1) {
                    setHours((prev: any) => ({
                      ...prev,
                      [dia.toLowerCase()]: [
                        (val[0] as any).format('HH:mm'),
                        (val[1] as any).format('HH:mm'),
                      ],
                    }));
                  }
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    );
  };

  const handleOwnSubmit = () => {
    handleSubmit({
      dias_funcionamento: days,
      horario_funcionamento: hours,
    });
  };

  return (
    <div className="mt-4 w-full max-w-xl sm:mt-14">
      <Form onFinish={handleOwnSubmit} layout="vertical">
        <Row gutter={[24, 8]}>
          {renderCard('Segunda')}
          {renderCard('Terca')}
          {renderCard('Quarta')}
          {renderCard('Quinta')}
          {renderCard('Sexta')}
          {renderCard('Sabado')}
          {renderCard('Domingo')}
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
