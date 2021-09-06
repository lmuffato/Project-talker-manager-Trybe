const fs = require('fs').promises;

const validationEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!email || email === '') {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!re.test(email)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return 'Err';
};

function readFile(file) {
  return fs.readFile(file, 'utf8')
    .then((res) => JSON.parse(res));
}

module.exports = {
  validationEmail,
  readFile,
};
