import { Card } from 'antd';

import { Tatuador } from '@/utils/interfaces';

import EmblaCarousel from '../EmblaCarousel';

const { Meta } = Card;

const Tatuadores = ({ tatuadores }: { tatuadores: Tatuador[] }) => {
  return (
    <div className="flex w-full flex-col justify-center bg-white">
      <h2 className="mx-auto mb-6 mt-16 text-2xl font-bold leading-normal text-black">
        Conecte-se com seu artista favorito
      </h2>
      <p className="mx-auto pb-2 text-xl font-light leading-relaxed text-gray-500">
        Os melhores artistas estão aqui, encontre o melhor para a sua visão!
      </p>
      <div className="mx-auto my-2">
        <EmblaCarousel
          options={{ direction: 'ltr' }}
          slides={tatuadores.map((e, index) => {
            return (
              <Card
                hoverable
                className="mx-2"
                key={index}
                style={{ width: 240 }}
              >
                <Meta title={e.estilo_tatuagem} description={e.experiencia} />
              </Card>
            );
          })}
        />
      </div>
    </div>
  );
};

export default Tatuadores;
