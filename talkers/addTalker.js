const { StatusCodes } = require('http-status-codes');
const { writeFiles, readFiles } = require('../utility');
const checkToken = require('../validations/token');
const checkName = require('../validations/name');
const checkAge = require('../validations/age');
const checkTalk = require('../validations/talk');

const TALKERS = 'talker.json';

module.exports = (req, res) => {
  console.log('to aqui 1');
  const { headers: { authorization }, body: { name, age, talk } } = req;
  const validName = checkName(name);
  const validAge = checkAge(age);
  const validTalk = checkTalk(talk);
  const checkAuth = checkToken(authorization);
  console.log('to aqui 2');
  if (checkAuth) return res.status(StatusCodes.OK).json({ message: checkAuth.message });
  const allChecks = validAge !== '' && validName !== '' && validTalk !== '';
  if (allChecks) return res.status(StatusCodes.OK).json({ message: allChecks.message });
  console.log('to aqui 3');
  
  const talkersList = readFiles();
  const newTalker = { id: talkersList.length + 1, name, age, talk };
talkersList.push(newTalker);
writeFiles(TALKERS, JSON.stringify(talkersList));
  
  return res.status(StatusCodes.CREATED).send(newTalker);
};
