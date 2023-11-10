'use client';

import { jwtDecode } from 'jwt-decode';

const Usuario = {
  getUsuario(): any {
    if (typeof window !== 'undefined') {
      try {
        const storageUsuario: any = localStorage.getItem('token');
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
