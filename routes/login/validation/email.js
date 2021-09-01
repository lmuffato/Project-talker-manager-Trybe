const regEx = /\w+@\w+.com/;

const isEmailValid = (email) => (
  regEx.test(email)
);

module.exports = isEmailValid;
