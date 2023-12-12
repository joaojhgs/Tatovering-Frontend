import axios from '../../utils/axios-config';

export default class AgendamentosController {
    static createAgendamento = (values) =>
        new Promise((resolve, reject) => {
            axios
                .post('/agendamentos', values)
                .then(({ data }) => resolve(data))
                .catch(reject);
        });

    static getAgendamentos = (tatuador) =>
        new Promise((resolve, reject) => {
            axios
                .get(`/agendamentos${tatuador ? (typeof tatuador === 'string' ? `/tatuador/${tatuador}` : '/tatuador') : ''}`)
                .then(({ data }) => resolve(data || []))
                .catch(reject);
        });

}
