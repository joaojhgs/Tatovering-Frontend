import Axios from 'axios';

import axios from '../../utils/axios-config';

export default class UsuarioController {
    static createUsuario = ({ nome, telefone_celular, cpf, rg, endereco }) =>
        new Promise((resolve, reject) => {
            axios
                .post('/usuarios', {
                    nome,
                    telefone_celular,
                    cpf,
                    rg,
                    endereco,
                })
                .then(({ data }) => resolve(data))
                .catch(reject);
        });

    static getUserById = ({ id }) =>
        new Promise((resolve, reject) => {
            axios
                .get(`/usuarios/${id}`)
                .then((response) => {
                    const users = response.data;
                    resolve(users[0] || null);
                })
                .catch(reject);
        });

    static signIn = ({ email, password }) =>
        new Promise((resolve, reject) => {
            Axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/signin`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: false,
                },
            )
                .then(({ data }) => {
                    localStorage.setItem(
                        'token',
                        data.user_token || data.user.access_token,
                    );
                    resolve(data);
                })
                .catch(reject);
        });
}
