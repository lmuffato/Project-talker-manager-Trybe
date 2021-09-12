const { Router } = require('express');
const { randomToken, validarEmail, validarPassword } = require('../middlewares');

const router = Router();

router.post('/', validarEmail, validarPassword, (_req, res) => {
  const token = randomToken(16);

  res.status(200).json({ token });
});

module.exports = router; 