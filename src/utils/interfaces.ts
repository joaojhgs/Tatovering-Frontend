export interface Tatuagem {
  agendamento_id: number;
  cor: string;
  desenho: string;
  estilo: string;
  preco: number;
  tamanho: number;
  tatuador_id: number;
}

export interface Tatuador {
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
