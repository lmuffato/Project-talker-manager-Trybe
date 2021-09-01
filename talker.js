const express = require('express');
const fs = require('fs').promises;

const route = express.Router();
const talkersFile = 'talker.json';

async function findPerson(id) {
  const numbId = parseInt(id, 10);
  const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf8'));
  return talkers.find((object) => object.id === numbId);
}

function validateToken(token) {
   if (token === undefined || token === null) {
     return { error: 401, message: 'Token não encontrado' };
   }
   if (token !== '7mqaVRXJSp886CGr') {
    return { error: 401, message: 'Token inválido' };
  }
  return false;
}

function validateName(name) {
  if (name === undefined || name === '') {
    return { error: 400, message: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
   return { error: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
 }
 return false;
}

function validateAge(age) {
  if (age === undefined || age === '') {
    return { error: 400, message: 'O campo "age" é obrigatório' };
  }
  if (parseInt(age, 10) < 18) {
   return { error: 400, message: 'A pessoa palestrante deve ser maior de idade' };
 }
 return false;
}

function dateIsValid(date) {
  return /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(date);
} // função retirada de https://www.regextester.com/99555

function validateTalkPt2(talk) {
  if (dateIsValid(talk.watchedAt) === false) {
    return { error: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (!Number.isInteger(talk.rate) || talk.rate > 5 || talk.rate < 1) {
   return { error: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return false;
}

function validateTalk(talk) {
  if (talk === undefined 
    || talk === '' || talk.rate === undefined || talk.watchedAt === undefined) {
    return { 
      error: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
  }
  return validateTalkPt2(talk);
}

function validateAll(name, age, talk, token) {
  const tokenValid = validateToken(token);
  const nameValid = validateName(name);
  const ageValid = validateAge(age);
  const talkValid = validateTalk(talk);
  if (tokenValid || nameValid || ageValid || talkValid) {
    return [tokenValid, nameValid, ageValid, talkValid];
  }
  return false;
}

function updateTalker(list, { id, name, age, talk }) {
  const newArr = list;
  let arrIndex;
  list.forEach((object, index) => {
    if (object.id === id) {
      arrIndex = index;
    }
  });
  newArr[arrIndex] = { id, name, age, talk };
  return newArr;
}

function deleteTalker(list, id) {
  const newArr = list;
  let deleteIndex;
  list.forEach((object, index) => {
    if (object.id === id) {
      deleteIndex = index;
    }
  });
  newArr.splice(deleteIndex, 1);
  return newArr;
}

function treatError(error, res) {
  error.forEach((element) => {
    if (element !== false) {
      return res.status(parseInt(element.error, 10)).json({ message: element.message });
    }
  });
}

route.get('/', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf8'));

  return res.status(200).json(talkers);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;

  const person = await findPerson(id);
  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(person);
});

route.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  const token = req.headers.authorization;
  const error = validateAll(name, age, talk, token);
  if (error === false) {
    const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf8'));
    talkers.push({ id: (talkers.length + 1), name, age, talk });
    await fs.writeFile(talkersFile, JSON.stringify(talkers));
    return res.status(201).json({ id: 5, name, age, talk });
  }
  return treatError(error, res);
});

route.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, age, talk } = req.body;
  const token = req.headers.authorization;
  const error = validateAll(name, age, talk, token);
  if (error === false) {
    const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf8'));
    const updatedList = updateTalker(talkers, { id, name, age, talk });
    await fs.writeFile(talkersFile, JSON.stringify(updatedList));
    return res.status(200).json({ id, name, age, talk });
  }
  return treatError(error, res);
});

route.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const token = req.headers.authorization;
  const error = validateToken(token);
  if (error === false) {
    const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf8'));
    const updatedList = deleteTalker(talkers, id);
    await fs.writeFile(talkersFile, JSON.stringify(updatedList));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }
  return res.status(parseInt(error.error, 10)).json({ message: error.message });
});

module.exports = route;