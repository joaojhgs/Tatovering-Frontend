import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Banner from '../components/homepage/banner';
import Estudios from '../components/homepage/estudios/estudios';
import Footer from '../components/homepage/footer';
import Services from '../components/homepage/services';
import Tatuadores from '../components/homepage/tatuadores';
import Tatuagens from '../components/homepage/tatuagens';

export default function MainPage() {
    const [tatuagens, setTatuagens] = useState([
        {
            agendamento_id: 0,
            cor: '',
            desenho: '',
            estilo: '',
            preco: 0,
            tamanho: 0,
            tatuador_id: 0,
        },
    ]);
    const [tatuadores, setTatuadores] = useState([
        {
            id: 0,
            estudio_id: 0,
            experiencia: 0,
            estilo_tatuagem: '',
            status: '',
            tipo: '',
            redes_sociais: {
                x: '',
                instagram: '',
                facebook: '',
            },
            data_criacao: new Date(),
            data_atualizacao: new Date(),
        },
    ]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`).then((e) => {
            console.log(e);
            setTatuagens(e.data);
        });
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuadores`).then((e) => {
            console.log('tatuadores', e);
            setTatuadores(e.data);
        });
    }, []);

    return (
        <div>
            <Banner />
            <Services />
            <Tatuagens tatuagens={tatuagens} />
            <Tatuadores tatuadores={tatuadores} />
            <Estudios />
            <Footer />
        </div>
    );
}
