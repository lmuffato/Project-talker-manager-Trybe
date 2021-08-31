const HTTP_OK_STATUS = 200;
const HTTP_NOTOK_STATUS = 400;

const validateEmail = (req, res, next) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(HTTP_NOTOK_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.match(regex)) {
    return res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  console.log('deu bom');
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === ' ') {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const createToken = (_req, res, next) => {
  // Fonte: https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
  const Rand = () => Math.random(0).toString(36).substr(2);
  const token = (Rand() + Rand()).substr(0, 16);

  res.status(HTTP_OK_STATUS).json({ token });
  next();
};

module.exports = {
  createToken,
  validateEmail,
  validatePassword,
};
