export interface Tatuagem {
  agendamento_id: number;
  cor: string;
  desenho: string;
  imagem: string;
  estilo: string;
  preco: number;
  tamanho: number;
  tatuador_id: number;
  imagem: string;
}

export interface Tatuador {
  id: string;
  nome: string;
  imagem_perfil: string;
  estudio_id: number;
  experiencia: number;
  estilo_tatuagem: string;
  status: string;
  tipo: string;
  redes_sociais: {
    instagram: string;
    x: string;
    facebook: string;
  };
}
