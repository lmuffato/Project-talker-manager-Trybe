const HTTP_OK_STATUS = 200;
const ERROR_STATUS = 400;
const { nanoid } = require('nanoid'); // https://github.com/ai/nanoid

const token = nanoid(16);

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  const passLength = 6;
  if (!email) {
    return res.status(ERROR_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(/(.+@.+\.com)(\.br)?/)) {
    return res.status(ERROR_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(ERROR_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < passLength) {
    return res.status(ERROR_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = { validateLogin };
