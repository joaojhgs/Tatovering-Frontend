import { useTranslations } from 'next-intl';

import './style.css';

export default function Page() {
  const t = useTranslations('site');

  function criarTatuagem() {
    // axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tatuagens`);
    // console.log(e.target);
    console.log('clicou');
  }

  return (
    <div className="container-tatuagem-externo">
      <div className="container-tatuagem">
        <h3>Informações da Tatuagem</h3>
        <input type="text" placeholder="Desenho" />
        <input type="text" placeholder="Estilo" />
        <input type="text" placeholder="Cor" />
        <input type="text" placeholder="Tamanho" />
        <input type="text" placeholder="Preço" />
        <input type="text" placeholder="Link de Imagem Exemplo" />

        <button type="submit" onClick={criarTatuagem}>
          Criar Tatuagem
        </button>
      </div>
    </div>
  );
}
