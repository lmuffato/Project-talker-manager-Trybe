const fs = require('fs').promises;

async function talkerUpdate(req, res) {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const arrTalkers = JSON.parse(talkers); 
  // const updateId = arrTalkers.find((e) => e.id === Number(id));
  const updateTalker = { id: Number(id), name, age, talk };

 const newTalkers = arrTalkers.map((t) => {
    if (t.id === Number(id)) {
      return updateTalker;
    }
    return t;
  });

  await fs.writeFile('./talker.json', (JSON.stringify(newTalkers)));
   res.status(200).json(updateTalker);
}

module.exports = talkerUpdate;

// Requisito feito com auxílio do colega Adelino Junior