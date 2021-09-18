const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const updateTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const data = await fs.readFile('./talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);
  const talkerId = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const updateTalkers = fetchData.map((r) => {
    if (r.id === Number(id)) return talkerId;
    return r;
  });
  await fs.writeFile('./talker.json', JSON.stringify(updateTalkers));
  res.status(HTTP_OK_STATUS).json(talkerId);
};

module.exports = updateTalker;
