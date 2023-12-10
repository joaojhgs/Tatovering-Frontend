import React, { createContext, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import Dashboard from '../components/dashboard/dashboard';
import DashboardLayout from '../components/dashboard/layout/dashboardLayout';
import TatuagensFavoritas from '../components/tatuagens-favoritas/TatuagensFavoritas';
import Tatuagens from '../components/tatuagens/Tatuagens';
import useRequest from '../hooks/useRequest';
import UsuarioController from '../structures/controllers/UsuariosController';
import Usuario from '../utils/usuario';

export const UserContext = createContext(null);

export default function DashboardPage() {
    const loggedUser = Usuario.getUsuario();

    const [getUser] = useRequest(UsuarioController.getUserById);

    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser({ id: loggedUser.id })
            .then((response) => {
                console.log(response);
                setUser(response);
            })
            .catch((e) => {});
    }, []);

    return (
        <UserContext.Provider value={user}>
            <DashboardLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/schedule" element={<div>Agendamentos</div>} />
                    <Route
                        path="/favorites"
                        element={<TatuagensFavoritas id={loggedUser.id} />}
                    />
                    <Route
                        path="/tattoos"
                        element={<Tatuagens id={loggedUser.id} />}
                    />
                    <Route path="/profile" element={<div>Perfil</div>} />
                </Routes>
            </DashboardLayout>
        </UserContext.Provider>
    );
}
