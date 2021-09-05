const { StatusCodes } = require('http-status-codes');

// cria endpoint de post /talker
module.exports = (_request, response) => {
  response.status(StatusCodes.OK).send();
};