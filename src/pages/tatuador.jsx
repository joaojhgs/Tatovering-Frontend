import React from 'react';

import { useParams } from 'react-router-dom';

import Tatuadores from '../components/tatuadores/Tatuadores';

export default function Tatuador() {
    const { tatuadorId } = useParams();

    return <Tatuadores id={tatuadorId} />;
}
