const { StatusCodes } = require('http-status-codes');

module.exports = (name) => {
  if (!name || name.length === 0) {
    return { status: `${StatusCodes.BAD_REQUEST}`, message: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
    const invalidName = 'O "name" deve ter pelo menos 3 caracteres';
    return { status: `${StatusCodes.BAD_REQUEST}`, message: invalidName };
  }
  return '';
};
