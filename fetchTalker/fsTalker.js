// Requisição do arquivo json para manipulação CRUD.
const fs = require('fs');
const fsWrite = require('fs').promises;

const fsTalker = (file) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
  return promise;
};

const fsWriteTalker = async (file, talker) => {
  try {
    await fsWrite.writeFile(file, talker);
  } catch (err) {
    return err;
  }
};

module.exports = { fsTalker, fsWriteTalker };