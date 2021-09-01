const checkTalk = (talk) => (!talk || !talk.watchedAt || !talk.rate);
const validateRate = (rate) => (+rate < 1 || +rate > 5);

module.exports = {
  checkTalk,
  validateRate,
};