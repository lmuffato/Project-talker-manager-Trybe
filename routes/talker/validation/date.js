const regEx = /\d{2}\/\d{2}\/\d{4}/;

const isDateValid = (date) => (
  regEx.test(date)
);

module.exports = isDateValid;
