const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_OK_STATUS = 404;
const PORT = '3000';

const crypto = require('crypto');
const { validateEmail, 
  validatePassword, 
  validateToken, 
  validateName, 
  validateAge, 
  validateRateAndWhatchedAt, 
  validateTalk } = require('./validations/allValidationsReq4&3');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
  // 1 Byte usa 2 caracteres no hexadecimal, por isso é normal vermos 32 bytes sendo representados como 64 bytes.
}

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerData = fs.readFileSync('talker.json', 'utf-8');
  const parsedTalker = JSON.parse(talkerData);
  const foundTalker = parsedTalker.find((findId) => findId.id === +id);
  console.log(foundTalker);
  if (!foundTalker) {
    return res.status(HTTP_NOT_OK_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(HTTP_OK_STATUS).json(foundTalker);
});

app.get('/talker', (req, res) => {
  try {
    const talkerData = fs.readFileSync('talker.json');
    res.status(HTTP_OK_STATUS).json(JSON.parse(talkerData));
  } catch (error) {
    res.status(HTTP_OK_STATUS).json(JSON.parse([]));
  }
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  console.log(token);
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge, 
  validateTalk, 
  validateRateAndWhatchedAt, 

    (req, res) => {
     const { name, age, talk } = req.body;
     const readf = fs.readFileSync('talker.json', 'utf-8');
     const readJson = JSON.parse(readf);
     const id = 5;
     const objectWithId = ({ name, age, talk, id });
     readJson.push(objectWithId); 
     fs.writeFileSync('talker.json', JSON.stringify(readJson));
     res.status(201).json({ name, age, talk, id });
   });

// https://stackoverflow.com/questions/17604866/difference-between-readfile-and-readfilesync
// https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
// https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
