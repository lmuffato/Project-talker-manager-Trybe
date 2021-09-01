const express = require('express');
const getTalkers = require('../util/getTalkers');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sendJson = await getTalkers();
  console.log(sendJson);
  return res.status(200).json(sendJson);
});

module.exports = router;
