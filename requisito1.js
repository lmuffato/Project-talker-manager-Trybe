const { Router } = require('express');
const {
  lerDados,
} = require('./crud');

const router = Router();

router.get('/', async (_req, res) => {
  const data = await lerDados();

  res.status(200).json(data);
});

module.exports = router;
