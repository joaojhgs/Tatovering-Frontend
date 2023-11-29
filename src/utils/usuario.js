import { jwtDecode } from 'jwt-decode';

const Usuario = {
    getUsuario() {
        if (typeof window !== 'undefined') {
            try {
                const storageUsuario = localStorage.getItem('token');
                if (!storageUsuario) {
                    return null;
                }
                const response = jwtDecode(storageUsuario);
                return {
                    ...response,
                    id: response.sub,
                };
            } catch (e) {
                localStorage.removeItem('token');
            }
        }
        return false;
    },
    doLogout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    },
};

export default Usuario;
