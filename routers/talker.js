const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;

// const {
//   getTalkerFile,
// } = require('../fsFunctions');

router.get('/', rescue(async (_req, res) => {
  const talkerFile = await fs.readFile('talker.json', 'utf-8');
  const talkerContent = talkerFile ? JSON.parse(talkerFile) : [];

  console.log(talkerContent);

  return res.status(HTTP_OK_STATUS).json(talkerContent);
}));

module.exports = router;
// router.get()