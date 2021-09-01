const { writeFile } = require('fs').promises;

async function writeAnObjectIntoAJSONFile(objectToWrite) {
  try {
    const readyToWrite = await JSON.stringify(objectToWrite);
    await writeFile('./talker.json', readyToWrite);
    return 0;
  } catch (err) {
    return err;
  }
}

module.exports = {
  writeAnObjectIntoAJSONFile,
};
