import axios from '../../utils/axios-config';

export default class AgendamentosController {
    static createAgendamento = (values) =>
        new Promise((resolve, reject) => {
            axios
                .post('/agendamentos', values)
                .then(({ data }) => resolve(data))
                .catch(reject);
        });

    static getAgendamentos = (tatuador = false) =>
        new Promise((resolve, reject) => {
            axios
                .get(`/agendamentos/${tatuador ? 'tatuador' : ''}`)
                .then(({ data }) => resolve(data || []))
                .catch(reject);
        });

}
