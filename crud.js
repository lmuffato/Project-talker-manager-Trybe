const {
  lerDados,
} = require('./lerOsDados');

const requisito1 = async (_req, res) => {
  const data = await lerDados();

  res.status(200).json(data);
};

const requisito2 = async (req, res) => {
  const { id } = req.params;

  const data = await lerDados();
  const parseId = parseInt(id, 10);
  const resposta = data.find((d) => d.id === parseId);
  if (!resposta) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(resposta);
};

module.exports = {
  requisito1,
  requisito2,
};
