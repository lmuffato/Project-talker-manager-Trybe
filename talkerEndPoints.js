const { Router } = require('express');

const fs = require('fs').promises;

const router = Router();

async function getTalkerList(_req, res) {
  const talkers = await fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response))
    .catch((err) => console.log(err.message));
  console.log(talkers[0]);
  return res.status(200).json(talkers);
}

router.get('/', getTalkerList);

module.exports = router;