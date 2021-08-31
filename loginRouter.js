const { Router } = require('express');

const router = Router();

const verifyEmailExists = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
    next();
};

const verifyEmailPattern = (req, res, next) => {
  const { email } = req.body;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
  if (emailPattern.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
    next();
};

const verifyPasswordExists = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
    next();
};

const verifyPasswordLenght = (req, res, next) => {
  const { password } = req.body;
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
    next();
};

const generateToken = () => {
  const length = 16;
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
};

router.post('/', 
verifyEmailExists, verifyEmailPattern, 
verifyPasswordExists, verifyPasswordLenght, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;