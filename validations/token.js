const { StatusCodes } = require('http-status-codes');

module.exports = (token) => {
  const isValid = /^[\w]{16}$/i;
  if (!token) {
    return { status: `${StatusCodes.UNAUTHORIZED}`, message: 'Token não encontrado' };
  }
  if (!isValid.test(token)) {
    return { status: `${StatusCodes.UNAUTHORIZED}`, message: 'Token inválido' };
  }
  return '';
};
