import axios from '../../utils/axios-config';

export default class TatuadoresController {
    static createTatuador = (values) =>
        new Promise((resolve, reject) => {
            axios
                .post('/tatuadores', { ...values, estudio_id: '' })
                .then(({ data }) => resolve(data))
                .catch(reject);
        });

    static getTatuadoresByEstudioId = ({ estudioId }) =>
        new Promise((resolve, reject) => {
            axios
                .get(`/tatuadores/estudios/${estudioId}`)
                .then(({ data }) => resolve(data?.tatuadores || []))
                .catch(reject);
        });
}
