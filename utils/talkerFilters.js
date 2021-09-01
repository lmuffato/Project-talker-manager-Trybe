function returnTalkerByID(talkersArray, tid) {
  talkersArray.find(({ id }) => id === tid);
}
