import { FormatOnlyNumbers } from './formatter';
import { validateCPF, validateRG } from './validator';

export const phoneRule = {
  transform: (value: string) => FormatOnlyNumbers(value),
  pattern: /^([0-9]{10,11}){1}$/g,
  message: 'Telefone inválido!',
};

export const validCPFRule = {
  validator: (rule: any, value?: string) => {
    if (value !== undefined && value.length) {
      if (validateCPF(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('CPF inválido'));
    }
    return Promise.resolve();
  },
};

export const validRGRule = {
  validator: (rule: any, value?: string) => {
    if (value !== undefined && value.length) {
      if (validateRG(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('RG inválido'));
    }
    return Promise.resolve();
  },
};

export const requiredRule = { required: true, message: 'Campo obrigatório!' };
