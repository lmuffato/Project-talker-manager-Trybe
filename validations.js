module.exports = {
  emailValidation: (req, res, next) => {
    const { email } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validEmail = emailRegex.test(email);

    if (!email || email === '') {
      return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!validEmail) {
      return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
  }, 

  passwordValidation: (req, res, next) => {
    const { password } = req.body;

    if (!password || password === '') {
      return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 

    next();
  },

  tokenValidation: (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).send({ message: 'Token inválido' });
    }

    next();
  },

  nameValidation: (req, res, next) => {
    const { name } = req.body;

    if (!name || name === '') {
      return res.status(400).send({ message: 'O campo "name" é obrigatório' });
    }

    if (name.length < 3) {
      return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
  },

  ageValidation: (req, res, next) => {
    const { age } = req.body;
    
    if (!age || age === '') {
      return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    }
    if (parseInt(age, 10) < 18) {
      return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
  },

  talkValidation: (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
      return res
        .status(400)
        .send({ 
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }

    next();
  },

  talkWatchedAtValidation: (req, res, next) => {
    const { talk } = req.body;
    const dateValidation = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateValidation.test(talk.watchedAt)) {
      return res
        .status(400)
        .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    next();
  },
  
  talkRateValidation: (req, res, next) => {
    const { talk } = req.body;

    if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
      return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();
  },
};