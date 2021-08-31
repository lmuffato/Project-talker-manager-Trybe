const readFile = require('./readFile');
const writeFile = require('./writeFile');

const add = (user) => {
  const users = readFile('user.json');
  users.push(user);

  writeFile('user.json', users);
};

module.exports = {
  add,
};
