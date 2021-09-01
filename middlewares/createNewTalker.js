const fs = require('fs');

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const validateToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization || authorization === '') {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age || age === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O campo "age" é obrigatório',
      });
  }

  if (age < 18) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const existsTalkKeys = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || (!talk.watchedAt || !talk.rate)) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const existsTalkInfos = (request, response, next) => {
  const { talk } = request.body;
  if (talk.watchedAt === '' || talk.rate === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const validateTalkInfos = (request, response, next) => {
  const { watchedAt, rate } = request.body.talk;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/;
  if (!dateRegex.test(watchedAt)) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
  }
  // Source Int validation:
  // https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  if (!rate === parseInt(rate, 10) || rate < 1 || rate > 5) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const createTalker = (request, _response, next) => {
  const { name, age, talk } = request.body;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', { encoding: 'utf-8' }));
  console.log(talkers);
  const id = talkers.reduce((maxId, talker) => (
    (talker.id > maxId) ? talker.id : maxId),
    talkers[0].id) + 1;
  const newTalker = [{
    id,
    name,
    age,
    talk,
  }];
  request.userId = id;
  fs.writeFileSync('./talker.json', JSON.stringify(newTalker));
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  existsTalkKeys,
  existsTalkInfos,
  validateTalkInfos,
  createTalker,
};