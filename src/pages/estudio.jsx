import React from 'react';

import { useParams } from 'react-router-dom';

import Estudios from '../components/estudios/Estudios';

export default function Estudio() {
    const { estudioId } = useParams();

    return <Estudios id={estudioId} />;
}
