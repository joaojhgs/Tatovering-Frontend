import axios from '@/utils/axios-config';

export default class TatuadoresController {
  static createTatuador: any = ({
    experience,
    estilo_tatuagem,
    tipo,
    instagram,
  }: any) =>
    new Promise((resolve, reject) => {
      const redes_sociais = {
        instagram,
      };

      axios
        .post('/tatuadores', {
          experience,
          estilo_tatuagem,
          tipo,
          redes_sociais,
        })
        .then(({ data }) => resolve(data))
        .catch(reject);
    });
}
