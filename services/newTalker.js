function talkerNew(name, age, id, talk) {
  const { watchedAt, rate } = talk;

  const addTalker = {
    name,
    age,
    id,
    talk: { watchedAt, rate },
  };

  return addTalker;
}

module.exports = talkerNew;