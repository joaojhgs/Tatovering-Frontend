import VMasker from 'vanilla-masker';

export const formatToCellphone = (valor = '', comDDI = true) => {
    try {
        if (valor) {
            const valorSemFormatacao = `${valor}`.replace(/[^0-9]/g, '');
            if (comDDI) {
                if (valorSemFormatacao.length === 13) {
                    return VMasker.toPattern(
                        valorSemFormatacao,
                        '+99 (99) 9 9999-9999',
                    );
                }
                return VMasker.toPattern(
                    valorSemFormatacao,
                    '+99 (99) 9999-9999',
                );
            }
            return VMasker.toPattern(valorSemFormatacao, '(99) 9 9999-9999');
        }
        return valor;
    } catch (error) {
        return valor;
    }
};

export const formatToCPF = (texto) => {
    try {
        const valorSemFormatacao = `${texto}`.replace(/[^0-9]/g, '');
        return VMasker.toPattern(valorSemFormatacao, '999.999.999-99');
    } catch (error) {
        return texto;
    }
};

export const formatToRG = (texto) => {
    try {
        return VMasker.toPattern(texto, '99.999.999-S');
    } catch (error) {
        return texto;
    }
};

export const FormatOnlyNumbers = (texto) => {
    try {
        return texto.replace(/[^0-9]/g, '');
    } catch (error) {
        return texto;
    }
};

export const formatToMoney = (texto) => {
    console.log(texto);
    try {
        return parseInt(texto).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        });
    } catch {
        return texto;
    }
};
