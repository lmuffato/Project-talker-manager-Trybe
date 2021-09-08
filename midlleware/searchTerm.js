// Middleware que retorna um array vazio caso o termo não satisfaçaa busca
const { fsTalker } = require('../fetchTalker/fsTalker');

const searchTerm = async (req, res, next) => {
  const { q: term } = req.query;
  let data = [];

  try {
    data = await fsTalker('talker.json');
  } catch (err) {
    next(err);
  }

  if (!term || term.length === 0) {
    return res.status(200).json(data);
  }

  next();
};

module.exports = searchTerm;