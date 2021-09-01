const { returnArrayIncludesTerm } = require('../utils/talkerFilters');
const { readJsonReturnArray } = require('../utils/read');

async function searchTerm(request, response) {
  try {
    const { q } = request.query;
    if (q) {
      const talkerDBPath = './talker.json';
      const talkerDB = await readJsonReturnArray(talkerDBPath);
      const talkerKey = 'name';
      const arrayOfTalkersThatIncludeTerm = returnArrayIncludesTerm(talkerDB, q, talkerKey);
      return response.status(200).json(arrayOfTalkersThatIncludeTerm);
    }
  } catch (err) {
    return { ERROR: err };
  }
}

module.exports = searchTerm;
