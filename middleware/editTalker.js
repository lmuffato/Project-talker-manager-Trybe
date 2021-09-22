const fs = require('fs');

const editTalker = (req, res, _next) => {
  const id = Number(req.params.id);
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const talker = talkers.find((selectedTalker) => selectedTalker.id === id);
  talker.name = req.body.name;
  talker.age = req.body.age;
  talker.talk.watchedAt = req.body.talk.watchedAt;
  talker.talk.rate = +req.body.talk.rate;
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  res.status(200).json(talker);
};

module.exports = editTalker;
