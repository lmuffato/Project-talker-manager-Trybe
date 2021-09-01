const fs = require('fs');

const filePath = ('talker.json');

const saveTalkers = (talkers) => fs.writeFileSync(filePath, JSON.stringify(talkers, null, '\t'));

const { readFile, writeFile } = require('fs').promises;

const noToken = {
    message: 'Token não encontrado',
  };

const invalidToken = {
    message: 'Token inválido',
  };

  const editingTalker = async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    let allTalkers;
    try {
      allTalkers = JSON.parse(await readFile(filePath, 'utf-8'));
    } catch (error) {
      console.error(error);
    }
    const othersTalkers = allTalkers.filter((talker) => talker.id !== parseInt(id, 10));
  
    const theTalker = { name, age, talk, id: Number(id) };
  
    othersTalkers.push(theTalker);
  
    await writeFile(filePath, JSON.stringify(othersTalkers));
  
    return res.status(200).json(theTalker);
  };

const noneEmail = {
    message: 'O campo "email" é obrigatório',
};

const nonePassword = {
    message: 'O campo "password" é obrigatório',
};

const invalidEmail = {
    message: 'O "email" deve ter o formato "email@email.com"',
};

const invalidPassword = {
    message: 'O "password" deve ter pelo menos 6 caracteres',
  };

const EmailValidation = (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) return res.status(400).send(noneEmail);
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const validEmail = regex.test(String(email).toLowerCase());
  if (!validEmail) return res.status(400).send(invalidEmail);
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) return res.status(400).send(nonePassword);
  const minPassLength = 6;
  const validPassword = (password.length > minPassLength);
  if (!validPassword) return res.status(400).send(invalidPassword);
  next();
};

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

// Dica do token vista no repositório do Iago Ferreira
const crypto = require('crypto');

const generateToken = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
};

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const datas = await fs.readFileSync(filePath);
    const answer = JSON.parse(datas);
    const defAnswer = answer.filter((talker) => talker.id !== parseInt(id, 10));
    await writeFile(filePath, JSON.stringify(defAnswer));
    const message = { message: 'Pessoa palestrante deletada com sucesso' };
    return res.status(200).send(message);
};

  const registeringTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    let talkers;
    try {
    talkers = JSON.parse(await readFile(filePath, 'utf-8'));
    } catch (error) {
    console.error(error);
    }
    const newTalker = {
      name,
      age,
      talk,
      id: talkers.length + 1,
    };
    talkers.push(newTalker);
    await writeFile(filePath, JSON.stringify(talkers));
    return res.status(201).json(newTalker);
  };
  
  const invalidRate = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  
  const validatingRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
      return res.status(400).json(invalidRate);
    }
    next();
  };
  
  const invalidDate = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  
    const validatingDate = (req, res, next) => {
      const { talk: { watchedAt } } = req.body;
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(watchedAt)) {
        return res.status(400).json(invalidDate);
      }
    next();
    };
  
  const invalidTalk = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

    const validatingTalk = (req, res, next) => {
      const { talk } = req.body;
        if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
        return res.status(400).send(invalidTalk);
      }
      next();
    };
    
    const validAge = {
      message: 'O campo "age" é obrigatório',
    };
  
  const minorAge = {
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  
    const validatingAge = (req, res, next) => {
      const { age } = req.body;
      if (!age) return res.status(400).json(validAge);
      if (age < 18) return res.status(400).json(minorAge);
      next();
    };
  
    const noName = {
      message: 'O campo "name" é obrigatório',
  };
  
  const shortName = {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  const validatingName = (req, res, next) => {
      const { name } = req.body;
      if (!name) return res.status(400).json(noName);
      if (name.length < 3) return res.status(400).json(shortName);
      next();
  };

const talkerPostRoute = (app) => {
    app.route('/talker')
    .post(tokenValidation, validatingName, validatingAge, validatingTalk,
      validatingDate, validatingRate, registeringTalker);
    app.route('/talker/:id')
    .put(tokenValidation, validatingName, validatingAge, validatingTalk,
      validatingDate, validatingRate, editingTalker)
    .delete(tokenValidation, deleteTalker);
    app.route('/login')
    .post(EmailValidation, passwordValidation, generateToken);
};

module.exports = talkerPostRoute;