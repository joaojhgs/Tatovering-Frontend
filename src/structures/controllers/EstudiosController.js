import axios from '../../utils/axios-config';

export default class EstudioController {
    static getEstudios = () =>
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
                    const parsedData = data.map((estudio) => {
                        const parsedCoords = estudio.localizacao
                            .slice(1, -1)
                            .split(',');
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

    static createEstudio = (values) =>
        new Promise((resolve, reject) => {
            axios.post('/estudios', values).then(({ data }) => resolve(data)).catch(reject);
        });

    /**
     * @param {{
     *  estudioID: string
     * }}
     * @returns {Promise<{
     *  id: string ,
     *  nome: string ,
     *  email: string ,
     *  taxa_agendamento: float64,
     *  localizacao: string ,
     *  telefone: string ,
     *  descricao: string ,
     *  endereco: string ,
     *  imagemPerfil: string ,
     *  imagemCapa: string ,
     *  proprietarioId: string ,
     *  horario_de_funcionamento: {
     *  	segunda: string[],
     *  	terca: string[],
     *  	quarta: string[],
     *  	quinta: string[],
     *  	xexta: string[],
     *  	xabado: string[],
     *  	domingo: string[],
     *  },
     * dias_funcionamento: {
     *  	segunda: boolean,
     *  	terca: boolean,
     *  	quarta: boolean,
     *  	quinta: boolean,
     *  	sexta: boolean,
     *  	sabado: boolean,
     *  	domingo: boolean,
     *  }
     * }>}
     */
    static getEstudioById = ({ estudioId }) =>
        new Promise((resolve, reject) => {
            axios
                .get(`/estudios/${estudioId}`)
                .then(({ data: estudio }) => {
                    const parsedCoords = estudio.localizacao
                        .slice(1, -1)
                        .split(',');
                    const parsedData = {
                        ...estudio,
                        localizacao: {
                            latitude: parsedCoords[0],
                            longitude: parsedCoords[1],
                        },
                    };
                    resolve(parsedData);
                })
                .catch(reject);
        });
}
