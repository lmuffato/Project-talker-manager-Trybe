const fsP = require('fs').promises;

const fs = require('fs');

function createTalker(req, res) {
  const { talk } = req.body;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  talkers.push(talk);
  fsP.writeFile('./talker.json', JSON.stringify(talkers))
    .then(() => console.log('Pessoa palestrante registrada com sucesso'))
    .catch((err) => console.log(err.message));
  return res.status(201).json(talk);
}

module.exports = createTalker;
