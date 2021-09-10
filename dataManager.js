const fs = require('fs');

const TALKER_DATA = './talker.json';

const managerTalkData = () => {
  try {
    const data = fs.readFileSync(TALKER_DATA, 'utf8');
    const results = JSON.parse(data);

    return results;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = managerTalkData;
