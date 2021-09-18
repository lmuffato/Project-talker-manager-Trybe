const fs = require('fs').promises;

const HTTP_CREATE_STATUS = 201;

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await fs.readFile('./talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);
  const newData = {
    id: fetchData.length + 1,
    name,
    age,
    talk,
  };
  fetchData.push(newData);
  await fs.writeFile('./talker.json', JSON.stringify(fetchData));

  return res.status(HTTP_CREATE_STATUS).json(newData);
};

module.exports = createTalker;
