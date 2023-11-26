import { jwtDecode } from 'jwt-decode';

const Usuario = {
    getUsuario() {
        if (typeof window !== 'undefined') {
            try {
                const storageUsuario = localStorage.getItem('token');
                return jwtDecode(storageUsuario || null);
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
