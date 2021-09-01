function returnTalkerByID(talkersArray, tid) {
  return talkersArray.find(({ id }) => parseInt(id, 10) === parseInt(tid, 10));
}

function returnArrayDifferentID(talkersArray, tid) {
  return talkersArray.filter(({ id }) => parseInt(id, 10) !== parseInt(tid, 10));
}

function returnArrayIncludesTerm(talkersArray, term, key) {
  return talkersArray.filter((talker) => {
    return talker[key].includes(term);
  });
}

module.exports = {
  returnTalkerByID,
  returnArrayDifferentID,
  returnArrayIncludesTerm,
};
