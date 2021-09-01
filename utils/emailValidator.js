function emailValidator(email) {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const test = EMAIL_REGEX.test(email);
  return test;
}

module.exports = emailValidator;
