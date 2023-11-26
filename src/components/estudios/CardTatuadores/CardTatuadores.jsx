import React from 'react';

import { Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

import img from '../images/img_profile.jpeg';

export default function CardTatuadores(props) {
    const navigate = useNavigate();
    return (
        <div className="flex h-36 w-10/12 flex-row gap-8 rounded-xl bg-white p-5 text-black shadow-lg">
            <div className="w-1/4p-1">
                <img
                    className="h-28 w-28 rounded-full "
                    width={112}
                    height={112}
                    src={
                        props.imagem_perfil?.length &&
                        props.imagem_perfil?.length > 0
                            ? props.imagem_perfil
                            : img
                    }
                    alt="imagem"
                />
            </div>

            <div className="w-3/4 p-1">
                <div className="mb-2 flex w-full flex-row items-center justify-between text-center ">
                    <h3 className="my-auto text-2xl font-bold text-black ">
                        {props.nome}{' '}
                    </h3>
                    <a
                        className="cursor-pointer text-blue-500"
                        onClick={() => navigate(`/tatuador/${props.id}`)}
                    >
                        Ver Portifólio
                    </a>
                </div>
                <p>Estilos: {props.estilo_tatuagem}</p>
                <div className="flex h-6 flex-row justify-start  gap-4">
                    <p className="text-gray-800">Avaliação dos clientes</p>
                    <Rate disabled defaultValue={4.5} />
                </div>
            </div>
        </div>
    );
}

// export default CardTatuadores;
