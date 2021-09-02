const fsP = require('fs').promises;
const fs = require('fs');
const crypto = require('crypto');

function readLogedUsers() {
  const logedUsers = JSON.parse(fs.readFileSync('./logedUsers.json', 'utf8'));
  return logedUsers;
}

function createToken(req, res) {
  const { email } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  const logedUsers = readLogedUsers().filter((user) => user.email !== email);
  const newLog = { email, token };
  logedUsers.push(newLog);
  fsP.writeFile('./logedUsers.json', JSON.stringify(logedUsers))
    // .then(() => console.log('token registrado com sucesso ', token))
    .catch((err) => console.log(err.message));
  return res.status(200).json({ token });
}

function validateToken(req, res, next) {
  const { authorization: token } = req.headers;
  if (token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const isTokenValid = readLogedUsers().reduce((acc, user) => {
    if (user.token === token) {
      return !acc;
    }
    return acc;
  }, false);
  if (!isTokenValid) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}
module.exports = { createToken, validateToken };
