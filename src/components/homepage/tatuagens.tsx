import { Card, Image } from 'antd';

import { Tatuagem } from '@/utils/interfaces';

import EmblaCarousel from '../EmblaCarousel';

const { Meta } = Card;

const Tatuagens = ({ tatuagens }: { tatuagens: Tatuagem[] }) => {
  return (
    <div className="flex w-full flex-col justify-center">
      <h2 className="mx-auto mb-6 mt-16 text-2xl font-bold leading-normal text-white">
        Econtre sua arte ideal!
      </h2>
      <p className="mx-auto pb-2 text-xl font-light leading-relaxed text-gray-500">
        Temos um banco de dados com mais de 1000 tatuagens classificadas por
        seus estilos e preços.
      </p>
      <div className="mx-auto my-2">
        <EmblaCarousel
          options={{ direction: 'ltr' }}
          slides={tatuagens.map((e, index) => {
            return (
              <Card
                hoverable
                className="mx-2"
                key={index}
                style={{ width: 240 }}
                cover={
                  <Image
                    width={240}
                    height={240}
                    alt="example"
                    src={e.imagem}
                  />
                }
              >
                <Meta title={e.estilo} description={'R$ ' + e.preco} />
              </Card>
            );
          })}
        />
      </div>
    </div>
  );
};
export default Tatuagens;
