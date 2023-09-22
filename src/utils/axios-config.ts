'use client';

import Axios from 'axios';

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : '';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
