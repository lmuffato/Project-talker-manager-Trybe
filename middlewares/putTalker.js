const fs = require('fs');

const putTalker = (req, res, _next) => {
  const { id } = req.params;
  const editTalker = req.body;
  editTalker.id = parseInt(id, 10);

  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talkerId = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

  talkers[talkerId] = editTalker;
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));

  return res.status(200).json(editTalker);
};

module.exports = { putTalker };
