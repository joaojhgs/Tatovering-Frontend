import axios from '@/utils/axios-config';

export default class UsuarioController {
  static createUsuario: any = ({
    nome,
    telefone_celular,
    cpf,
    rg,
    endereco,
  }: any) =>
    new Promise((resolve, reject) => {
      axios
        .post('/usuarios', {
          nome,
          telefone_celular,
          cpf,
          rg,
          endereco,
        })
        .then(({ data }) => resolve(data))
        .catch(reject);
    });
}
