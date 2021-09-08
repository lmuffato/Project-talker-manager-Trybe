const validEmail = (req, res, next) => {
    const { email } = req.body; 
    const re = /\S+@\S+\.\S+/;
    const regex = re.test(email);
    if (!email || email === '') {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (regex === false) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
      next();
  };

  const validPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
      next();
  };
  const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
  
    next(); 
  };
  const validateNameSize = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next(); 
  };
  const validateage = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '') {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
  
    next(); 
  };
  const validateMinority = (req, res, next) => {
    const { age } = req.body;
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next(); 
  };

  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
     // const { rate, watchedAt } = talk;
        if (!talk || talk === undefined) {
       return res.status(400).json(
         { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
       );
     }
    if (talk.rate === undefined || talk.watchedAt === undefined) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
    next();
  };
  const validDate = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk; 
    const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const regexDate = re.test(watchedAt);
     if (regexDate === false) {
      return res.status(400).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
    }
    next();
  }; 
  const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next(); 
  };
  // pesquisa : https://github.com/tryber/sd-010-a-project-talker-manager/pull/95
  const validateToken = (req, res, next) => {
    const { authorization: token } = req.headers;
    const sizeToken = 16;
   console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (token.length !== sizeToken) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next(); 
  };
module.exports = { 
          validEmail, 
          validPassword, 
          validateName, 
          validateNameSize, 
          validateMinority, 
          validateage, 
          validDate,
          validateRate,
          validateTalk,
          validateToken,
        };