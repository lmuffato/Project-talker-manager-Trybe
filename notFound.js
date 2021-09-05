module.exports = (_err, _req, res, _next) => res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
