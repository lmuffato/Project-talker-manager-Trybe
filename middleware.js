const emailValidate = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!(email.includes('@') && email.includes('.com'))) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
  };
  
  const passwordValidate = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }
  
    next();
  };

  const ageValidate = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '') {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  };

  const tokenValidate = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || authorization === '') {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };

  const nameValidate = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };

  const talkValidate = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    next();
  };

  const fieldValidate = (req, res, next) => {
    const { talk } = req.body;
    const rates = [1, 2, 3, 4, 5];
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/.test(talk.watchedAt);
  
    if (!dateRegex) {
      return res.status(400).json({ message:
        'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!rates.includes(talk.rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };

module.exports = {
    emailValidate,
    passwordValidate,
    ageValidate,
    tokenValidate,
    nameValidate,
    talkValidate,
    fieldValidate,
};