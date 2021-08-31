const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

router.use(bodyParser.json());

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
 return res.status(400)
  .json({ message: 'O campo "email" é obrigatório' }); 
}
  if (!(email.includes('@')) || !(email.includes('.com'))) {
 return res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  next();
};

const passwordValidate = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
 return res.status(400)
  .json({ message: 'O campo "password" é obrigatório' }); 
}
  if (password.length < 6) {
 return res.status(400)
  .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
  next();
};

router.post('/', passwordValidate, validateEmail, (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;