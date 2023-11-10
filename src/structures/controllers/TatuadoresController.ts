import axios from '@/utils/axios-config';

export default class TatuadoresController {
  static createTatuador: any = (values: any) =>
    new Promise((resolve, reject) => {
      axios
        .post('/tatuadores', values)
        .then(({ data }) => resolve(data))
        .catch(reject);
    });
}
