function returnTalkerByID(talkersArray, tid) {
  return talkersArray.find(({ id }) => parseInt(id, 10) === parseInt(tid, 10));
}

function returnArrayDifferentID(talkersArray, tid) {
  return talkersArray.filter(({ id }) => parseInt(id, 10) !== parseInt(tid, 10));
}

module.exports = {
  returnTalkerByID,
  returnArrayDifferentID,
};
