const fsP = require('fs').promises;
const fs = require('fs');
const crypto = require('crypto');

function readLogedUsers(email) {
  const fileLogers = JSON.parse(fs.readFileSync('./logedUsers.json', 'utf8'));
  const logedUsers = fileLogers.filter((user) => user.email !== email);
  return logedUsers;
}

function createToken(req, res) {
  const { email } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  const logedUsers = readLogedUsers(email);
  const newLog = { email, token };
  logedUsers.push(newLog);
  console.log(logedUsers);
  fsP.writeFile('./logedUsers.json', JSON.stringify(logedUsers))
    .then(() => console.log('token registrado com sucesso'))
    .catch((err) => console.log(err.message));
  return res.status(200).json({ token });
}

module.exports = createToken;
