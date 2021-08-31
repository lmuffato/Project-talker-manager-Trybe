const fs = require('fs').promises;
const crypto = require('crypto');

exports.readTalkers = async () => {
  const data = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8');
  return JSON.parse(data);
};

exports.writeTalker = async (talkers) => {
  const talkerStringified = JSON.stringify(talkers);
  return fs.writeFile(`${__dirname}/../talker.json`, talkerStringified);
};

// Função verifyEmail consultada no meu próprio PR do projeto Trybe Wallet
// Link: https://github.com/tryber/sd-010-a-project-trybewallet/pull/70
exports.verifyEmail = (email) => {
  const hasOneAtSign = email.split('').filter((el) => el === '@').length === 1; // has to be true
  const hasOneDot = email.split('').filter((el) => el === '.').length === 1; // has to be true
  const doesNotEndWithDot = email[email.length - 1] !== '.'; // has to be true
  return hasOneAtSign && hasOneDot && doesNotEndWithDot;
};

exports.generateToken = async () => {
  const token = await crypto.randomBytes(8).toString('hex');
  return token;
};

// watchedAt: '42-20-3333'
function checkDateNumbers(dateArr) {
  if (+dateArr[0] < 1 || +dateArr[0] > 31) return false;
  if (+dateArr[1] > 12) return false;
  if (dateArr[2].length !== 4) return false;
  return true;
}

exports.isDateValid = (date) => {
  if (date[2] !== '/' || date[5] !== '/') return false;

  return checkDateNumbers(date.split('/'));
};
