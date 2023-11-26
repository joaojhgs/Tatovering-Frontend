import React from 'react';

import CadastroTatuagens from './components/cadastro-tatuagens/cadastroTatuagens';
import CadastroUsuario from './components/cadastro-usuario/cadastro-usuario';
import AuthPage from './pages/auth/page';
import RegisterPage from './pages/auth/register/page';
import Estudio from './pages/estudio';
import MainPage from './pages/main';
import PesquisaTatuagens from './pages/pesquisaTatuagens';
import Tatuador from './pages/tatuador';

const Routes = [
    {
        path: '',
        element: <MainPage />,
    },
    {
        path: '/cadastro-usuario',
        element: <CadastroUsuario />,
    },
    {
        path: '/pesquisa-tatuagens',
        element: <PesquisaTatuagens />,
    },
    {
        path: '/cadastro-tatuagens',
        element: <CadastroTatuagens />,
    },
    {
        path: 'tatuador/:tatuadorId',
        element: <Tatuador />,
    },
    {
        path: 'estudio/:estudioId',
        element: <Estudio />,
    },
    {
        path: 'auth',
        element: <AuthPage />,
    },
    {
        path: 'auth/register',
        element: <RegisterPage />,
    },
];

export default Routes;
