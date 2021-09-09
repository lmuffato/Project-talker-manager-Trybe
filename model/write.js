const fs = require('fs').promises;
const read = require('./conn');

const registerTalker = async (talker) => {
  const { name, age, talk: { watchedAt, rate } } = talker;
  const data = await read();
  const talkerShape = {
    id: data[data.length - 1].id + 1,
    name,
    age: Number(age),
    talk: {
      watchedAt,
      rate: Number(rate),
    },
  };
  data.push(talkerShape);
  await fs.writeFile('./talker.json', JSON.stringify(data));
  return talkerShape;
};

module.exports = registerTalker;
