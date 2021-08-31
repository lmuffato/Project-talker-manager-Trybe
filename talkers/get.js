const { StatusCodes } = require('http-status-codes');
const { readFiles } = require('../fs-utils');

module.exports = async (_req, res) => {
  const file = await readFiles();
  
  return res.status(StatusCodes.OK).send(file);
};
