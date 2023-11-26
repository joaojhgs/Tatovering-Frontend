export const validateCPF = (texto) => {
    const cpf = texto.replace(/[^\d]+/g, '');

    if (
        cpf === '' ||
        cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
    ) {
        return false;
    }

    let add = 0;
    for (let i = 0; i < 9; i += 1) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
        return false;
    }

    add = 0;
    for (let i = 0; i < 10; i += 1) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
};

export const validateRG = (rg) => {
    const campo = rg.replace(/[^\d]/g, '');

    if (campo.length > 9 || campo.length < 8) {
        return false;
    }
    return true;
};
