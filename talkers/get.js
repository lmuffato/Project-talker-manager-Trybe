const { StatusCodes } = require('http-status-codes');
const { readFiles } = require('../fs-utils');

module.exports = async (_req, res) => {
  const xablau = await readFiles();
  console.log(xablau);
  
  return res.status(StatusCodes.OK).send(xablau);
};
