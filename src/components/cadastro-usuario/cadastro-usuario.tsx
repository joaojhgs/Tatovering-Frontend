'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button, Result, Steps, theme } from 'antd';

import thumbsUp from '@/assets/thumbsUp.png';
import { useRequest } from '@/hooks/useRequest';
import TatuadoresController from '@/structures/controllers/TatuadoresController';
import UsuarioController from '@/structures/controllers/UsuariosController';

import CadastroStep1 from './steps/cadastroStep1';
import CadastroStep2 from './steps/cadastroStep2';
import CadastroStep3 from './steps/cadastroStep3';

export default function CadastroUsuario() {
  const { token } = theme.useToken();

  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const [createUsuario, loadingUsuario, errorUsuario] = useRequest(
    UsuarioController.createUsuario,
  );
  const [createTatuador, loadingTatuador, errorTatuador] = useRequest(
    TatuadoresController.createTatuador,
  );

  const handleStep1Submit = (values: {
    nome: string;
    telefone_celular: string;
    cpf: string;
    rg?: string;
    endereco?: string;
  }) => {
    setUserData(values);
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleStep2Submit = (isTatuador: boolean) => {
    if (isTatuador) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    createUsuario(userData)
      .then((resp) => {
        console.log(resp);
        router.push('/');
      })
      .catch((err) => {});
  };

  const handleStep3Submit = (values: {
    experience: string;
    estilo_tatuagem: string;
    tipo: string;
    instagram: string;
  }) => {
    createUsuario(userData)
      .then((user) => {
        console.log(user);
        createTatuador(values)
          .then((resp) => {
            console.log(resp);
            router.push('/');
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        color: token.colorTextBase,
      }}
      className={`fixed left-0 top-0 z-[999] flex h-screen w-screen flex-col items-center justify-center px-6`}
    >
      {success ? (
        <Result
          status="success"
          icon={
            <div className="flex justify-center">
              <div className="relative h-40 w-40">
                <Image src={thumbsUp} fill alt="" />
              </div>
            </div>
          }
          title="Cadastro realizado com sucesso!"
          subTitle="Aproveite o mundo da Tatuagem da maneiro certa!"
          extra={
            <Button
              type="primary"
              size="large"
              onClick={() => router.push('/')}
            >
              Começar
            </Button>
          }
        />
      ) : (
        <>
          <div className="text-2xl font-bold md:text-4xl">
            Nos conte sobre você
          </div>
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
          {currentStep === 0 && (
            <CadastroStep1 handleSubmit={handleStep1Submit} />
          )}
          {currentStep === 1 && (
            <CadastroStep2 goBack={goBack} handleSubmit={handleStep2Submit} />
          )}
          {currentStep === 2 && (
            <CadastroStep3 goBack={goBack} handleSubmit={handleStep3Submit} />
          )}
        </>
      )}
    </div>
  );
}
