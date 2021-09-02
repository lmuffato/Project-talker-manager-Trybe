const { StatusCodes } = require('http-status-codes');

module.exports = (age) => {
  if (!age || Number.isNaN(age)) {  
    return { status: `${StatusCodes.BAD_REQUEST}`, message: 'O campo "age" é obrigatório' };
  }
  if (age < 18) {
    const underAge = 'A pessoa palestrante deve ser maior de idade';
    return { status: `${StatusCodes.BAD_REQUEST}`, message: underAge };
  }
  return '';
};
