const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./talkerRouter');

const app = express();
app.use(bodyParser.json());

const OK = 200;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
// const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(OK).send();
});

app.use('/talker', talkerRouter);

app.post('/login', async (req, res) => {
  const { email, password: pass } = req.body;
  const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = validator.test(email);
  if (!email) return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  if (!isValidEmail) {
    return res.status(BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    }); 
}
  if (!pass) return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  if (pass.length < 6) {
    return res.status(BAD_REQUEST).json({
    message: 'O "password" deve ter pelo menos 6 caracteres',
  }); 
}
  const token = '16caracteresaqui';
  res.status(OK).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
