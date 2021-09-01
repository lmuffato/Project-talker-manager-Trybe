const {
  lerDados,
  escreverDados,
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

const requisito3 = async (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' });

const requisito4 = async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const data = await lerDados();
    
   if (data[data.length - 1]) {
     const { id: oldId } = data[data.length - 1];
     
     const id = parseInt(oldId, 10) + 1;

     data.push({ id, name, age, talk: { watchedAt, rate } });

     await escreverDados(data);
   }

    const newData = await lerDados();
    res.status(201).json(newData[newData.length - 1]);
};

const requisito5 = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const data = await lerDados();
  const newObj = { id: +id, name, age, talk };
  
  const dataFind = data.filter((d) => d.id !== +id);
  dataFind.push(newObj);
  await escreverDados(dataFind);
  res.status(200).json(newObj);
};

module.exports = {
  requisito1,
  requisito2,
  requisito3,
  requisito4,
  requisito5,
};
