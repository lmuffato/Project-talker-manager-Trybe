const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS = 400;

const ERRO = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') {
   return res.status(HTTP_UNAUTHORIZED_STATUS)
    .json({ message: 'Token não encontrado' }); 
  }
    if (authorization.length !== 16) {
      return res.status(HTTP_UNAUTHORIZED_STATUS)
        .json({ message: 'Token inválido' }); 
      }
  next();
  }; 

  const validateEmail = (req, res, next) => { 
    const { email } = req.body;
    if (!email || email === '') {
  return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "email" é obrigatório' }); 
  }
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) === false) {
  return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
    next();
  };

 const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
   return res.status(HTTP_BAD_REQUEST_STATUS)
     .json({ message: 'O campo "password" é obrigatório' }); 
  }
     if (password.length < 6) {
   return res.status(HTTP_BAD_REQUEST_STATUS)
     .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });   
  }
  next();
};

const validateName = (req, res, next) => {
const { name } = req.body;
if (!name || name === '') {
  return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "name" é obrigatório' }); 
}
if (name.length < 3) {
  return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
    next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "age" é obrigatório' }); 
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
    }
      next();
  };

  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || talk === '') {
      return res.status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: ERRO }); 
    }
        next();
    };
  
  const validateRate = (req, res, next) => {
      const { rate } = req.body.talk;
      if (rate < 1 || rate > 5) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
          .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
      }
      if (!rate || Number.isNaN(rate)) {
        return res.status(HTTP_BAD_REQUEST_STATUS)
          .json({ message: ERRO }); 
      }

          next();
      };

  const validateWatchedAt = (req, res, next) => {
        const { watchedAt } = req.body.talk;
        const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

        if (!watchedAt || watchedAt === '') {
          return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: ERRO }); 
        }
        if (!regex.test(watchedAt)) {
          return res.status(HTTP_BAD_REQUEST_STATUS)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
        }
            next();
        };

module.exports = {
  validateToken,
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
};
