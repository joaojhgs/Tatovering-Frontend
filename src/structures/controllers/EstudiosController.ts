import axios from '@/utils/axios-config';

import { Estudio } from '../interfaces/Estudio';

export default class EstudioController {
  static getEstudios = (): Promise<Estudio[]> =>
    new Promise((resolve, reject) => {
      // const aux = {
      //   nome: 'Casa blanca',
      //   email: 'casaBlancaHouse@gmail.com',
      //   taxa_agendamento: 20,
      //   telefone: '+55991489563',
      //   descricao: 'Desde 1982',
      //   horario_funcionamento: {
      //     segunda: ['08:00', '12:00'],
      //     terca: ['08:00', '12:00'],
      //     quarta: ['08:00', '12:00'],
      //     quinta: ['08:00', '12:00'],
      //     sexta: ['08:00', '12:00'],
      //     sabado: null,
      //     domingo: null,
      //   },
      //   dias_funcionamento: {
      //     segunda: true,
      //     terca: true,
      //     quarta: true,
      //     quinta: true,
      //     sexta: true,
      //     sabado: true,
      //     domingo: false,
      //   },
      // };

      axios
        .get(`/estudios`)
        .then(({ data }) => {
          const parsedData = data.map((estudio: any) => {
            const parsedCoords = estudio.localizacao.slice(1, -1).split(',');
            return {
              ...estudio,
              localizacao: {
                latitude: parsedCoords[0],
                longitude: parsedCoords[1],
              },
            };
          });
          resolve(parsedData);
        })
        .catch(reject);
    });

  static createEstudio = (values: any) =>
    new Promise((resolve, reject) => {
      axios.post('/estudios', values).then(resolve).catch(reject);
    });
}
