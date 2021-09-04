const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const randToken = require('rand-token');

const app = express();
app.use(bodyParser.json());

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');

  return res.status(200).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(talkers)
    .filter((tal) => tal.id === Number(id));

  if (talker.length < 1) {
    return res.status(404).json({
     message: 'Pessoa palestrante não encontrada',
   });
  }

  res.status(200).json(talker[0]);
});

const validationEmail = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!re.test(email)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return 'Err';
};

const validationPassword = (password) => {
  if (!password || password === '') {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }

  if (password.length < 6) {
    return {
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }

  return 'err';
};

app.post('/login', async (req, res) => {
  const { password, email } = req.body;
  const resultEmail = validationEmail(email);
  const resultPasswod = validationPassword(password);

  if (resultEmail.message) {
    return res.status(400).json(resultEmail);
  }

  if (resultPasswod.message) {
    return res.status(400).json(resultPasswod);
  }

  const token = randToken.generate(16);
  return res.status(200).json({ token });
});

const validationToken = (authorization) => {
  const regexToken = /[A-Z0-9a-z]{16}/;

  if (!authorization) {
    return {
      message: 'Token não encontrado',
    };
  }

  if (!regexToken.test(authorization)) {
    return { message: 'Token inválido' };
  }

  return true;
};

const validationName = (name) => {
  if (!name || name === '') {
    return {
      message: 'O campo "name" é obrigatório',
    };
  }

  if (name.length < 3) {
    return {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }

  return 'err';
};

const validetionAge = (age) => {
  if (!age || age === '') {
    return {
      message: 'O campo "age" é obrigatório',
    };
  }

  if (age < 18) {
    return {
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  }

  return true;
};

function extendValidations(watchedAt, rate) {
  const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (rate > 5 || rate < 1) {
    return {
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }

  if (!regexData.test(watchedAt)) {
    return {
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }

  return true;
}

const validetionTalk = (talk) => {
  if (!talk) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  const { watchedAt, rate } = talk;
  if (!watchedAt || !rate) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  const extend = extendValidations(watchedAt, rate);
  if (extend.message) return extend;

  return true;
};

function talkerExtend(req) {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const token = validationToken(authorization);
  const resultName = validationName(name);
  const resultAge = validetionAge(age);
  const resultTalk = validetionTalk(talk);

  if (token.message) return { status: 401, response: token };

  if (resultName.message) return { status: 400, response: resultName };

  if (resultAge.message) return { status: 400, response: resultAge };

  if (resultTalk.message) return { status: 400, response: resultTalk };

  return false;
}

app.post('/talker', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');

  const validations = talkerExtend(req);

  if (validations.status) {
    const { status, response } = validations;
    return res.status(status).json(response);
  }

  const newTalkers = JSON.parse(talkers);
  newTalkers.push({ id: newTalkers.length + 1, ...req.body });

  await fs.writeFile('./talker.json', JSON.stringify(newTalkers));

  return res.status(201).json(newTalkers[newTalkers.length - 1]);
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
