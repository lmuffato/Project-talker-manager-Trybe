const validaEmail = (req, res, next) => {
    const { email } = req.body;
    if (email === '' || !email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!(email.includes('@') && email.includes('.com'))) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const validaPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};
// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
function generateToken(n) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < n; i += 1) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

const validaToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });
    if (token.length < 16 || token.length > 16
    ) return res.status(401).json({ message: 'Token inválido' });
    next();
  };

const validaName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
    next();
};
  
const validaAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res
      .status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validaTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || (!(talk.watchedAt && talk.rate) && talk.rate !== 0)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validaRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!rate && rate !== 0) {
    return res.status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validaDate = (req, res, next) => {
  const { talk } = req.body;
  // regex: https://www.w3resource.com/javascript/form/javascript-date-validation.php
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!regex.test(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
    validaEmail,
    validaPassword,
    generateToken,
    validaToken,
    validaName,
    validaAge,
    validaRate,
    validaTalker,
    validaDate,
};
