export interface Estudio {
  id: string;
  nome: string;
  email: string;
  imagem_capa: string;
  imagem_perfil: string;
  taxa_agendamento: number;
  telefone: number;
  descricao: string;
  horario_funcionamento: {
    segunda: [string, string];
    terca: [string, string];
    quarta: [string, string];
    quinta: [string, string];
    sexta: [string, string];
    sabado: [string, string];
    domingo: [string, string];
  };
  dias_funcionamento: {
    segunda: true;
    terca: true;
    quarta: true;
    quinta: true;
    sexta: true;
    sabado: true;
    domingo: false;
  };
  localizacao: {
    latitude: number;
    longitude: number;
  };
  endereco: string;
}

// {
//     "nome": "Casa blanca",
//     "email": "casaBlancaHouse@gmail.com",
//     "taxa_agendamento": 20,
//     "telefone": "+55991489563",
//     "descricao": "Desde 1982",
//     "horario_funcionamento": {
//       "segunda": [
//         "08:00",
//         "12:00"
//       ],
//       "terca": [
//         "08:00",
//         "12:00"
//       ],
//       "quarta": [
//         "08:00",
//         "12:00"
//       ],
//       "quinta": [
//         "08:00",
//         "12:00"
//       ],
//       "sexta": [
//         "08:00",
//         "12:00"
//       ],
//       "sabado": null,
//       "domingo": null
//     },
//     "dias_funcionamento": {
//       "segunda": true,
//       "terca": true,
//       "quarta": true,
//       "quinta": true,
//       "sexta": true,
//       "sabado": true,
//       "domingo": false
//     }
//   }
