const { StatusCodes } = require('http-status-codes');
const { readFiles } = require('../fs-utils');

module.exports = async (req, res) => {
    const person = await readFiles();
    const personID = person.find(({ id }) => id === +req.params.id);
    console.log(personID);
    const MSG = 'Pessoa palestrante não encontrada';
  if (!personID) return res.status(StatusCodes.NOT_FOUND).json({ message: MSG });
  return res.status(StatusCodes.OK).json(personID);
};
