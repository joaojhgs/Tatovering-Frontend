'use client';

import { useState } from 'react';

import { Steps } from 'antd';
import useToken from 'antd/lib/theme/useToken';
import axios from 'axios';

import CadastroStep1 from './steps/cadastroStep1';
import CadastroStep2 from './steps/cadastroStep2';
import CadastroStep3 from './steps/cadastroStep3';

export default function CadastroUsuario() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  const [theme, token] = useToken();

  const handleStep1Submit = (values: {
    nome: string;
    telefone_celular: string;
    cpf: string;
    rg?: string;
    endereco?: string;
  }) => {
    setCurrentStep((prev) => prev + 1);
    setUserData(values);
  };

  const goBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleStep2Submit = (isTatuador: boolean) => {
    if (isTatuador) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, userData, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkFCd3VOdDVBUE5iWlhIWTMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk1MjUwMjIwLCJpYXQiOjE2OTUyNDY2MjAsImlzcyI6Imh0dHBzOi8vcGZ6bGJvZWFvbnNvb2t6Y25uaXYuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjRiNTQwMmZkLWM0NWUtNGU4My05ZjljLTkwOWFkYTEyNDg4MSIsImVtYWlsIjoibWF0dGZvbnRlc0Bob3RtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNjk1MjQ2NjIwfV0sInNlc3Npb25faWQiOiIwNDQwNzlhNi1iYzk5LTQxMzgtYjc0OC0yYzE0NGQxODM5YjYifQ.jhRbQyDuA3uUf_cm1D_ALJVW0mRroe56LH-KxX0gTXU',
        },
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log('teste');
      });
  };

  const handleStep3Submit = (values: {
    experience: string;
    estilo_tatuagem: string;
    tipo: string;
    instagram: string;
  }) => {};

  return (
    <div
      style={{ backgroundColor: '#1c1b22' }}
      className={`fixed left-0 top-0 z-[999] flex h-screen w-screen flex-col items-center justify-center px-6`}
    >
      <div className="text-2xl font-bold md:text-4xl">Nos conte sobre você</div>
      <div className="mt-4 opacity-40">
        Informe mais algumas informações para finalizar seu cadastro
      </div>
      <div className="mt-6 w-full max-w-2xl sm:mt-16">
        <Steps
          size="small"
          progressDot
          current={currentStep}
          items={[
            {
              title: 'Informações Básicas',
            },
            {
              title: 'Tipo de Usuário',
            },
            {
              title: 'Perguntas Específicas',
            },
          ]}
        />
      </div>
      {currentStep === 0 && <CadastroStep1 handleSubmit={handleStep1Submit} />}
      {currentStep === 1 && (
        <CadastroStep2 goBack={goBack} handleSubmit={handleStep2Submit} />
      )}
      {currentStep === 2 && (
        <CadastroStep3 goBack={goBack} handleSubmit={handleStep3Submit} />
      )}
    </div>
  );
}
