import React, { useEffect } from 'react';

import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import useRequest from '../../hooks/useRequest';
import UsuarioController from '../../structures/controllers/UsuariosController';
import Usuario from '../../utils/usuario';
import MainNav from './MainNav';

export default function SiteHeader() {
    const loggedUser = Usuario.getUsuario();
    const navigate = useNavigate();

    const [getUser] = useRequest(UsuarioController.getUserById);

    useEffect(() => {
        if (loggedUser) {
            getUser({ id: loggedUser.sub }).then((user) => {
                console.log('USER:', user);
                if (user) {
                    // navigate(0);
                } else {
                    navigate('cadastro-usuario', { replace: true });
                }
            });
        }
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-[black]">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <MainNav />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        {loggedUser ? (
                            <>
                                <Link to="/dashboard">
                                    <Button type="primary" className="mx-2">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    type="primary"
                                    ghost
                                    className="mx-2"
                                    onClick={() => {
                                        Usuario.doLogout();
                                        navigate('/auth');
                                    }}
                                >
                                    Sair
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/">
                                    <Button
                                        type="primary"
                                        ghost
                                        className="mx-2"
                                    >
                                        Entrar
                                    </Button>
                                </Link>
                                <Link to="/auth/register">
                                    <Button
                                        type="primary"
                                        ghost
                                        className="mx-2"
                                    >
                                        Registrar
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
