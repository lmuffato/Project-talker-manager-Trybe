const isAgeValid = (age) => (
  (age === Math.round(age)) && (age >= 18)
);

module.exports = isAgeValid;
