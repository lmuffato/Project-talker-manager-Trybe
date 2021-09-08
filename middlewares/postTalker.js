const fs = require('fs');

const postTalker = async (req, res) => {
    try {
        const talkers = JSON.parse(await fs.promises.readFile('./talker.json', 'utf-8'));
        const addTalker = {
        name: req.body.name,
        age: req.body.age,
        id: talkers.length + 1,
        talk: req.body.talk,
        };
        talkers.push(addTalker);
        await fs.promises.writeFile('./talker.json', JSON.stringify(talkers));
        res.status(201).JSON(addTalker);
    } catch (error) {
        console.error(error.message);
    }
};

const tokenVerify = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({
        message: 'Token não encontrado',
      });
    }
  
    if (!(typeof authorization === 'string' && authorization.length === 16)) {
      return res.status(401).json({
        message: 'Token inválido',
      });
    }
  
    return next();
  };

const validateName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      res.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
      return;
    }
  
    if (!(typeof name === 'string' && name.length < 3)) {
      return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
  
    return next();
  };

const validateAge = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
      res.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
      return;
    }
  
    if (age < 18) {
      res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
      return;
    }
  
    return next();
  };

  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk || !talk.watchedAt || typeof talk.rate !== 'number') {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
  
    return next();
  };

  const validateDateRate = (req, res, next) => {
    const { talk } = req.body;
    const regEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  
    if (!regEx.test(talk.watchedAt)) {
      res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
      return;
    }
  
    if (talk.rate < 1 || talk.rate > 5) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
  
    return next();
  };

module.exports = {
    postTalker,
    tokenVerify,
    validateName, 
    validateAge,
    validateTalk,
    validateDateRate,
};
