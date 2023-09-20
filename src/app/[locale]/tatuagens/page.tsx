import axios from 'axios';
import { useTranslations } from 'next-intl';

import ImagemTatuagem from '@/components/ImagemTatuagem';

import './style.css';

export default function Page() {
  const t = useTranslations('site');

  const buscarTatuagens = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens/${13}`);
  };

  return (
    <div>
      <div className="tatuagens-container">
        <div className="titulo-container">
          <h2 className="titulo">Tatuagens de nome do tatuador</h2>
        </div>

        <div className="lista-container">
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
          <ImagemTatuagem url={'url da imagem'}></ImagemTatuagem>
        </div>
      </div>
    </div>
  );
}
