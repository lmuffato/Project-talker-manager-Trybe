const fs = require('fs').promises;

const getTalkerFile = async () => {
  const talkerFile = await fs.readFile('./talker.json', 'utf-8');
  
  const talkerContent = JSON.parse(talkerFile);

  return talkerContent;
};

module.exports = {
  getTalkerFile,
};
