const rescue = require('express-rescue');
const talkersUtils = require('../promisesFs.js');

const HTTP_OK_STATUS = 200;

const talkerId = rescue(async (req, res) => {
  const talkersList = await talkersUtils.readFile();
  const talker = talkersList.find(({ id }) => id === Number(req.params.id));
 
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = talkerId;
// http :3000/talker/1
