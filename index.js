const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const rescue = require('express-rescue');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalkWatchedAndRate,
  validateTalk,
  validateTalkEmptyValues,
} = require('./validations/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQ_STATUS = 400; // sintaxe inválida; por isso, servidor não atendeu a requisição;
const HTTP_CREATED_STATUS = 201;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readTalkerFile = async () => { // function para ler o arquivo talker.json
  const talkerList = await fs.readFile('talker.json');
  return JSON.parse(talkerList); // parse para converter json em string
};

const addTalker = async (data) => {
  await fs.writeFile('talker.json', JSON.stringify(data));
};

app.get('/talker', async (_req, res) => {
  try {
    const talkerList = await readTalkerFile();
    res.status(HTTP_OK_STATUS).json(talkerList);
  } catch (err) {
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: err.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await readTalkerFile();
  const talkerId = talkerList.find((talker) => talker.id === parseInt(id, 10)); // https://medium.com/@cristi.nord/javascript-parseint-c6b2a271f153 para o segundo parâmetro (radix)

  if (!talkerId) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerId);
});

const validateEmail = (req, res, next) => { // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript para regex e .test; primeiro link que apareceu na busca
  const { email } = req.body;
  if (!email || email === '') { 
    return res.status(HTTP_BAD_REQ_STATUS)
    .json({ message: 'O campo "email" é obrigatório' });
  }

  // https://stackoverflow.com/questions/8327705/what-are-and-in-regular-expressions
  // ˆ é o início e $ é o fim da string; . é qlqr char;
  // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression; resposta 445 sobre esse regex específico; ! apenas para negar; 
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(HTTP_BAD_REQ_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(HTTP_BAD_REQ_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQ_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28; usando o Math.random
// sintaxe do course: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/e0470c45-ed25-49b8-9675-47bb00b17e42/pacote-express-rescue/d75323a9-2c1d-46f7-a201-a65139eb7d3b?use_case=side_bar

app.post(
  '/login', validateEmail, validatePassword,
  rescue(async (request, response) => {
    const randomNumber = () => Math.random(0).toString(36).substr(2);
    const token = (length) => (randomNumber() + randomNumber()).substr(0, length);
    
    response.status(HTTP_OK_STATUS).json({ token: token(16) });
  }),
);

// linha para corrigir commit

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkEmptyValues,
  validateTalkWatchedAndRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = await readTalkerFile();
    const add = { id: talker.length + 1, name, age, talk };
    talker.push(add);
    addTalker(talker);
    return res.status(HTTP_CREATED_STATUS).json(add);
  },
);

app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateTalkEmptyValues,
validateTalkWatchedAndRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await readTalkerFile();
  const talkerId = talker.findIndex((talke) => talke.id === parseInt(id, 10));
  if (talkerId < 1) {
    return res.status(HTTP_NOT_FOUND_STATUS);
  }
  talker[talkerId] = { id: parseInt(id, 10), name, age, talk };
  await addTalker(talker);
  return res.status(HTTP_OK_STATUS).json(talker[talkerId]);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talker = await readTalkerFile();
  const talkerId = talker.findIndex((talke) => talke.id === parseInt(id, 10));
  if (talkerId < 1) {
    return res.status(HTTP_NOT_FOUND_STATUS);
  }
  talker.splice(talkerId, 1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice; primeiro parâmetro é de onde começa, segundo é a quantidade de remoções;
  await addTalker(talker);
  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
