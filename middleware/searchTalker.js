const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const searchTalker = async (req, res) => {
  const { searchTerm } = req.query;
  const data = await fs.readFile('./talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);
  
  if (!searchTerm || searchTerm === '') return res.status(HTTP_OK_STATUS).json(fetchData);
  
  const filterTerms = fetchData.filters((terms) => terms.name.includes(searchTerm));
  
  if (!filterTerms) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(filterTerms);
};

module.exports = searchTalker;
