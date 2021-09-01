function returnTalkerByID(talkersArray, tid) {
  return talkersArray.find(({ id }) => id === tid);
}

function returnArrayDifferentID(talkersArray, tid) {
  return talkersArray.filter(({ id }) => id !== tid);
}

module.exports = {
  returnTalkerByID,
  returnArrayDifferentID,
};
