// plantao coruja
const rescue = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (e) {
    res.status(404).json(e.message);
  }
};

module.exports = rescue;