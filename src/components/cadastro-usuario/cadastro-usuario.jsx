import React, { useState } from 'react';

import { Button, Result, Steps, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

import thumbsUp from '../../assets/thumbsUp.png';
import useRequest from '../../hooks/useRequest';
import EstudioController from '../../structures/controllers/EstudiosController';
import TatuadoresController from '../../structures/controllers/TatuadoresController';
import UsuarioController from '../../structures/controllers/UsuariosController';
import Usuario from '../../utils/usuario';
import ModalSignIn from '../auth/ModalSignIn';
import CadastroStep1 from './steps/cadastroStep1';
import CadastroStep2 from './steps/cadastroStep2';
import CadastroStep3 from './steps/cadastroStep3';
import CadastroStep4 from './steps/cadastroStep4';
import CadastroStep5 from './steps/cadastroStep5';

export default function CadastroUsuario() {
    const { token } = theme.useToken();

    const navigate = useNavigate();

    const userId = Usuario?.getUsuario()?.sub;

    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState(null);
    const [success, setSuccess] = useState(false);

    const [tatuadorData, setTatuadorData] = useState(null);
    const [estudioData, setEstudioData] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    const [createUsuario, loadingUsuario, errorUsuario] = useRequest(
        UsuarioController.createUsuario,
    );
    const [getUser] = useRequest(UsuarioController.getUserById);
    const [createTatuador, loadingTatuador, errorTatuador] = useRequest(
        TatuadoresController.createTatuador,
    );

    const [createEstudio] = useRequest(EstudioController.createEstudio);

    const handleStep1Submit = (values) => {
        setUserData(values);
        setCurrentStep((prev) => prev + 1);
    };

    const goBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleStep2Submit = (isTatuador) => {
        if (isTatuador) {
            setCurrentStep((prev) => prev + 1);
            return;
        }

        createUsuario(userData)
            .then((resp) => {
                console.log(resp);
                navigate('/');
            })
            .catch((err) => {});
    };

    const handleStep3Submit = (values) => {
        if (values.tipo === 'proprietario') {
            setCurrentStep((prev) => prev + 1);
            setTatuadorData(values);
            return;
        }

        createUsuario(userData)
            .then((user) => {
                console.log(user);
                createTatuador(values)
                    .then((resp) => {
                        console.log(resp);
                        navigate('/');
                    })
                    .catch((err) => {});
            })
            .catch((err) => {});
    };

    const handleStep4Submit = (values) => {
        setCurrentStep((prev) => prev + 1);
        setEstudioData(values);
    };

    const handleStep5Submit = (values) => {
        createUsuario(userData)
            .then((user) => {
                createEstudio({
                    ...estudioData,
                    ...values,
                    proprietario_id: userId,
                    taxa_agendamento: 0,
                })
                    .then((estudio) => {
                        console.log(estudio);
                        createTatuador({
                            estudio_id: estudio.id,
                            usuario_id: userId,
                            nome: userData.nome,
                            ...tatuadorData,
                        })
                            .then((resp) => {
                                console.log(resp);
                                navigate('/');
                            })
                            .catch(Promise.reject);
                    })
                    .catch(Promise.reject);
            })
            .catch((e) => {
                const msg = e?.response?.data?.error;
                if (msg && msg.includes('PGRST301')) {
                    setShowLogin(true);
                }
            });
    };

    const stepsItems = [
        {
            title: 'Informações Básicas',
        },
        {
            title: 'Tipo de Usuário',
        },
    ];

    if (currentStep > 1) {
        stepsItems.push({
            title: 'Perguntas Específicas',
        });
    }
    if (currentStep > 2) {
        stepsItems.push({
            title: 'Sobre o Estúdio',
        });
    }
    if (currentStep > 3) {
        stepsItems.push({
            title: 'Horário de Funcionamento',
        });
    }

    return (
        <div
            style={{
                backgroundColor: token.colorBgContainer,
                color: token.colorTextBase,
            }}
            className={`fixed left-0 top-0 z-[999] flex h-screen w-screen flex-col items-center justify-center px-6`}
        >
            <ModalSignIn
                open={showLogin}
                onSignIn={() => {
                    getUser({ id: Usuario.getUsuario().sub }).then((user) => {
                        console.log('USER:', user);
                        if (user) {
                            navigate('/');
                        } else {
                            navigate('/cadastro-usuario');
                        }
                    });
                    setShowLogin(false);
                }}
            />
            {success ? (
                <Result
                    status="success"
                    icon={
                        <div className="flex justify-center">
                            <div className="relative h-40 w-40">
                                <img src={thumbsUp} alt="" />
                            </div>
                        </div>
                    }
                    title="Cadastro realizado com sucesso!"
                    subTitle="Aproveite o mundo da Tatuagem da maneiro certa!"
                    extra={
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate('/')}
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
                        Informe mais algumas informações para finalizar seu
                        cadastro
                    </div>
                    <div className="mt-6 w-full max-w-2xl sm:mt-16">
                        <Steps
                            size="small"
                            progressDot
                            current={currentStep}
                            items={stepsItems}
                        />
                    </div>
                    {currentStep === 0 && (
                        <CadastroStep1 handleSubmit={handleStep1Submit} />
                    )}
                    {currentStep === 1 && (
                        <CadastroStep2
                            goBack={goBack}
                            handleSubmit={handleStep2Submit}
                        />
                    )}
                    {currentStep === 2 && (
                        <CadastroStep3
                            goBack={goBack}
                            handleSubmit={handleStep3Submit}
                        />
                    )}
                    {currentStep === 3 && (
                        <CadastroStep4
                            goBack={goBack}
                            handleSubmit={handleStep4Submit}
                        />
                    )}
                    {currentStep === 4 && (
                        <CadastroStep5
                            goBack={goBack}
                            handleSubmit={handleStep5Submit}
                        />
                    )}
                </>
            )}
        </div>
    );
}
