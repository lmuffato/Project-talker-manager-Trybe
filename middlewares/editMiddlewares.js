const { writeFileTalker, readFile } = require('../promisesFs');

const HTTP_OK_STATUS = 200;

const addMiddlewares = async (req, res) => {
  const talkersList = await readFile();
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkerChanged = { 
    name,
    age,
    id: Number(id),
    talk };

  talkersList.filter((talker) => Number(talker.id) !== Number(id));
  talkersList.push(talkerChanged);
  
  await writeFileTalker(talkersList);
  
  return res.status(HTTP_OK_STATUS).json(talkerChanged);
};

module.exports = addMiddlewares;