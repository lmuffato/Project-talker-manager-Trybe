const { Router } = require('express');
const { randToken } = require('../utils/funtions');
const { validadeEmail, validadePassword } = require('../middlewares');

const router = Router();

// Requisito 3
router.post('/', validadeEmail, validadePassword, (_req, res) => {
  const token = randToken(16);

  res.status(200).json({ token });
});

module.exports = router;