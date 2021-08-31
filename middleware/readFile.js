const fs = require('fs');
const utils = require('util');

const readFilePromise = utils.promisify(fs.readFile);

const readFileSync = (path) => readFilePromise(path)
    .then((content) => JSON.parse(content))
    .catch((err) => console.error(err));

module.exports = { readFileSync };
