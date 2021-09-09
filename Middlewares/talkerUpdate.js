const fs = require('fs').promises;

async function talkerUpdate(req, res) {
  const { id } = req.body.talk;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const arrTalkers = JSON.parse(talkers);
  const talkerIndex = arrTalkers.findIndex((t) => t.id === Number(id));
  console.log(talkerIndex);
  arrTalkers[talkerIndex] = { ...arrTalkers[talkerIndex] };

  await fs.writeFile('./talker.json', (JSON.stringify(arrTalkers)));
  return res.status(200).json(arrTalkers[talkerIndex]);
}

module.exports = talkerUpdate;