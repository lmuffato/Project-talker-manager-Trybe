const fs = require('fs').promises;
const path = require('path');
const TALKER = path.join('..', 'talker')

function getStuff(TALKER) {
    return fs.readFile(TALKER, 'utf8')
}

module.exports = getStuff;