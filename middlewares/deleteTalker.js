const { readFile, writeFileTalker } = require('../fs-util');

async function deleteTalker(req, res) {
  const { id } = req.params;
  const arrTalkers = await readFile();

  const filtredArr = arrTalkers.filter((talker) => Number(talker.id) !== Number(id));

  await writeFileTalker(filtredArr);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}

module.exports = deleteTalker;
