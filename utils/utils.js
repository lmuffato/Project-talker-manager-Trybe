const crypto = require('crypto');

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
