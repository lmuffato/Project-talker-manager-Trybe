const fs = require('fs').promises;

async function talkerDelete(req, res) {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const arrTalkers = JSON.parse(talkers); 
  const talkerToChange = arrTalkers.findIndex((talker) => talker.id === Number(id));

  delete talkers[talkerToChange];

  await fs.writeFile('./talker.json', JSON.stringify(talkers));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}

module.exports = talkerDelete;

// delete operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete