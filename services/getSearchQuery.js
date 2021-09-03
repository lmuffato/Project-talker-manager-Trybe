const getTalkers = require('./getTalkers');

const searchTalkers = async (q) => {
  const talkersArr = await getTalkers();
  if (!q) {
    return talkersArr;
  }
  const filteredTalkers = talkersArr.filter((ele) => ele.name.includes(q));
  return filteredTalkers;
};

module.exports = searchTalkers;
