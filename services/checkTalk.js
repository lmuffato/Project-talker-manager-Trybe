const checkTalk = (talk) => {
  if (!talk) return true;
  if (talk.rate === 0) return false;
  return (!talk.watchedAt || !talk.rate);
};

const validateRate = (rate) => (+rate < 1 || +rate > 5);

module.exports = {
  checkTalk,
  validateRate,
};