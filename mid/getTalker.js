const HTTP_OK_STATUS = 200;
const fs = require('fs').promises;

async function read() {
  const talker = await fs.readFile('./talker.json', 'utf-8')
  .then((e) => JSON.parse(e));

  return talker;
}

const getTalker = async (_req, res) => {
  try {
    const talker = await read();
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    res.status(HTTP_OK_STATUS).json([]);
  }
};

module.exports = getTalker;
