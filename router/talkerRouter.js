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

router.get('/', async (_req, res) => {
  try {
    const data = await readData();
    res.status(HTTP_OK_STATUS).json(data);
  } catch (e) {
    res.status(HTTP_OK_STATUS).json([]);
  }
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

    if (data[data.length - 1]) {
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

module.exports = router;

// Durante o desenvolvimento do requisito 4 foi consultado o repositório do colega Gabriel Pereira
// https://github.com/tryber/sd-010-a-project-talker-manager/blob/gbl97-sd-010-a-project-talker-manager/crud.js