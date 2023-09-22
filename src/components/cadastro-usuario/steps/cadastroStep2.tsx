'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button, Card, Checkbox, Col, Form, Input, Row } from 'antd';

import iconeTattoo from '@/assets/icone-tattoo.png';
import man from '@/assets/man.png';

export default function CadastroStep2({
  handleSubmit,
  goBack,
}: {
  handleSubmit: (isTatuador: boolean) => void;
  goBack: () => void;
}) {
  const [isTattooist, setIsTattooist] = useState(false);
  const [isUser, setIsUser] = useState(true);

  return (
    <div className="mt-4 w-full max-w-xl sm:mt-14">
      <div className="">Você é um(a) tatuador(a)?</div>
      <Card
        style={{
          transition: 'border-color 0.3s ease',
          borderColor: isTattooist ? '#1890ff' : undefined,
        }}
        className="mt-6 cursor-pointer border border-solid border-transparent hover:border-[#1890ff]"
        onClick={() => {
          setIsTattooist((prev) => !prev);
          setIsUser(false);
        }}
      >
        <div className="flex items-center">
          <Checkbox
            checked={isTattooist}
            style={{
              transition: 'background-color 0.3s ease',
              backgroundColor: isTattooist ? '#1890ff' : 'transparent',
            }}
            className="h-4 w-4 rounded border border-solid border-[#0004]"
          />
          <div className="ml-6 text-lg font-bold">Sou um(a) Tatuador(a)</div>
          <div className="relative ml-auto h-24 w-24">
            <Image src={iconeTattoo} alt="" fill />
          </div>
        </div>
      </Card>
      <Card
        style={{
          transition: 'border-color 0.3s ease',
          borderColor: isUser ? '#1890ff' : undefined,
        }}
        className="mt-6 cursor-pointer border border-solid border-transparent hover:border-[#1890ff]"
        onClick={() => {
          setIsUser((prev) => !prev);
          setIsTattooist(false);
        }}
      >
        <div className="flex items-center">
          <Checkbox
            checked={isUser}
            style={{
              transition: 'background-color 0.3s ease',
              backgroundColor: isUser ? '#1890ff' : 'transparent',
            }}
            className="h-4 w-4 rounded border border-solid border-[#0004]"
          />
          <div className="ml-6 text-lg font-bold">
            Não sou um(a) Tatuador(a)
          </div>
          <div className="relative ml-auto h-24 w-24">
            <Image src={man} alt="" fill />
          </div>
        </div>
      </Card>
      <div className="mt-8 flex w-full justify-center gap-6">
        <Button size="large" onClick={goBack}>
          Voltar
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => handleSubmit(isTattooist)}
        >
          {isTattooist ? 'Continuar' : 'Finalizar Cadastro'}
        </Button>
      </div>
    </div>
  );
}
