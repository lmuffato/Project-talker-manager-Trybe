function ddmmyyValidator(date) {
  const regexddmmyy = /^\d{2}\/\d{2}\/\d{4}$/;
  return regexddmmyy.test(date);
}

module.exports = {
  ddmmyyValidator,
};
