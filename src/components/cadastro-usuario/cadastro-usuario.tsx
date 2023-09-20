'use client';

import { useState } from 'react';

import { Steps } from 'antd';

import CadastroStep1 from './steps/cadastroStep1';
import CadastroStep2 from './steps/cadastroStep2';

export default function CadastroUsuario() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep1Submit = (values: {
    nome: string;
    telefone_celular: string;
    cpf: string;
    rg?: string;
    endereco?: string;
  }) => {
    console.log(1111);
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-screen flex-col items-center justify-center bg-[#eee] px-6">
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
              title: 'Perguntas específicas',
            },
          ]}
        />
      </div>
      {currentStep === 0 && <CadastroStep1 handleSubmit={handleStep1Submit} />}
      {currentStep === 1 && (
        <CadastroStep2 goBack={goBack} handleSubmit={() => {}} />
      )}
    </div>
  );
}
