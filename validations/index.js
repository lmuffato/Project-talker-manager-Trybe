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
};
