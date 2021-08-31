const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

function getTalkers() {
 return fs.readFile('./talker.json', 'utf-8').then((result) => JSON.parse(result));
}

router.get('/', async (_req, res) => {
  try {
    const talkerPeople = await getTalkers();
    if (talkerPeople.length === 0) return res.status(200).send([]);
    return res.status(200).send(talkerPeople);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
