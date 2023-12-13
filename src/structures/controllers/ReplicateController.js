
import Axios from 'axios'
export default class ReplicateController {
    static generateImages = (values) =>
        new Promise((resolve, reject) => {
            Axios.create({
                baseURL: 'http://127.0.0.1:8888/',
                // withCredentials: false,
                headers: {
                    "Content-Type": "application/json",
                },
            }).post('/agendamentos', values)
                .then(({ data }) => resolve(data))
                .catch(reject);
        });

}
