const getTalkers = require('./getTalkers');

const getTalkersById = (id) => getTalkers()
  .then((arr) => arr.find((ele) => ele.id === parseInt(id, 10)));

module.exports = getTalkersById;
