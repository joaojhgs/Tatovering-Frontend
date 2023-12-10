import React, { createContext, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import Dashboard from '../components/dashboard/dashboard';
import DashboardLayout from '../components/dashboard/layout/dashboardLayout';
import Studio from '../components/dashboard/studio';
import Schedulle from '../components/dashboard/schedulle';
import useRequest from '../hooks/useRequest';
import UsuarioController from '../structures/controllers/UsuariosController';
import Usuario from '../utils/usuario';

/**
 * @typedef {Object} UserContextValue
 * @property {string} nome
 * @property {string} cpf
 * @property {string} endereco
 * @property {string} estudio_id
 * @property {string} id
 * @property {boolean} is_proprietario
 * @property {string} rg
 * @property {string} status
 * @property {string} tatuador_id
 * @property {string} telefone_celular
 */

/**
 * @type {React.Context<UserContextValue | null>}
 */
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
                    <Route path="/schedule" element={<Schedulle />} />
                    <Route path="/tattoos" element={<div>Tatuagens</div>} />
                    <Route path="/studio" element={<Studio />} />
                    <Route path="/profile" element={<div>Perfil</div>} />
                </Routes>
            </DashboardLayout>
        </UserContext.Provider>
    );
}
