const writeFile = require('./writeFile');

const add = (user) => {
  writeFile('user.json', [user]);
};

module.exports = {
  add,
};
