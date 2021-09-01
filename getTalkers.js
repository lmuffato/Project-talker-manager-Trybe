const { readFile } = require('fs').promises;

const fileTalkers = './talker.json';
const HTTP_OK_STATUS = 200;

const readFileTalker = () => readFile(fileTalkers, 'utf-8').then((data) => JSON.parse(data));

  // console.log(readFileTalker()); // promise

const getTalkers = async (_req, res) => {
  const talkers = await readFileTalker();

  // console.log(talkers); // json

  if (talkers === []) return res.status(200).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = getTalkers;
