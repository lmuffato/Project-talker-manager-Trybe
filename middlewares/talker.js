const fs = require('fs');
const crypto = require('crypto');

// Função para gerar tokens aleatorios de 16 caracteres (Requisito 3)
const generateToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  console.log(`token ${token}`);
  return token;
};

// Resgatar todos os talkers atraves dessa função
const getTalkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

// Resgatar talker através do ID
const getTalkerById = (id) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const talker = talkers.find((speaker) => speaker.id === parseInt(id, 10));
  return talker;
};

module.exports = {
  generateToken,
  getTalkers,
  getTalkerById,
};
