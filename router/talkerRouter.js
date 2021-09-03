const { Router } = require('express');
const {
  readData,
  writeData,
} = require('../Connections/connections');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
} = require('../validations/talkerValidations');

const router = Router();

const HTTP_ERROR_STATUS = 404;
const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;

router.get('/search',
  validateToken,
  async (req, res) => {
    const { q } = req.query;
    if (!q) {
    const data = await readData();
    res.status(HTTP_OK_STATUS).json(data);
    }
    const data = await readData();
    const querySearch = data.filter((d) => d.name.includes(q));
    if (!querySearch) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    return res.status(HTTP_OK_STATUS).json(querySearch);
  });

router.get('/', async (_req, res) => {
    const data = await readData();
    if (!data) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    res.status(HTTP_OK_STATUS).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readData();
  const selectedId = data.filter((d) => d.id === parseInt(id, 10));

  if (!selectedId.length) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'Pessoa palestrante não encontrada' },
    );
  }
  res.status(HTTP_OK_STATUS).json(...selectedId);
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,

  async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const data = await readData();

    if (data) {
      const { id: dataId } = data[data.length - 1];
      const id = parseInt(dataId, 10) + 1;

      data.push({ id, name, age, talk: { watchedAt, rate } });
      await writeData(data);
    }

    const newData = await readData();

    return res.status(CREATED_STATUS).json(newData[newData.length - 1]);
  });

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,

  async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;

    const { id: dataId } = req.params;
    const id = parseInt(dataId, 10);
    const data = await readData();
    const dataFiltered = data.filter((d) => d.id !== parseInt(id, 10));

    dataFiltered.push({ id, name, age, talk: { watchedAt, rate } });
    await writeData(dataFiltered);

    const newData = await readData();

    return res.status(HTTP_OK_STATUS).json(newData[newData.length - 1]);
  });

router.delete('/:id',
  validateToken,

  async (req, res) => {
    const { id } = req.params;
    const data = await readData();
    const dataFiltered = data.filter((d) => d.id !== parseInt(id, 10));

    await writeData(dataFiltered);

    return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

module.exports = router;

// Durante o desenvolvimento do requisito 4 foi consultado o repositório do colega Gabriel Pereira
// https://github.com/tryber/sd-010-a-project-talker-manager/blob/gbl97-sd-010-a-project-talker-manager/crud.js
// Também recebi dicas do colega Sergio Murillo Gonçalves para utilizar o router nas salas de breakroom.