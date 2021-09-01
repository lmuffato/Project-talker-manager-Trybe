const isRateValid = (rate) => (
  rate === Math.round(rate) && rate >= 1 && rate <= 5
);

module.exports = isRateValid;
