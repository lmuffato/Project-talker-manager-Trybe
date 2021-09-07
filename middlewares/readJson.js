const fsAsync = require('fs').promises;

async function readJson() {
  const file = await fsAsync.readFile('./talker.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    return JSON.parse(data);
  });
  return file;
}

module.exports = readJson;
