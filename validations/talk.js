const { StatusCodes } = require('http-status-codes');

module.exports = (talk) => {
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return {
      status: `${StatusCodes.BAD_REQUEST}`,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  return '';
};
