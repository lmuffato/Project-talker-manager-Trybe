const { Router } = require('express');
const fs = require('fs').promises;
const {
  isValidName,
  isValidToken,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
} = require('../Validations/validations');

const router = Router();

const getFile = async () => {
  const respose = await fs.readFile('talker.json', 'utf-8');
  const data = JSON.parse(respose);
  return data;
};

const createTalker = async (body) => {
  const { name, age, talk, id } = body;
  const data = await getFile();
  const newTalker = {
    name,
    age,
    id,
    talk,
  };
  data.push(newTalker);
  fs.writeFile('talker.json', JSON.stringify(data));
  return newTalker;
};

router.get('/', async (_req, res) => {
  try {
    const data = await getFile();
    res.status(200).json(data);
  } catch (e) {
    console.error(`Erro: ${e}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getFile();
    const talker = data.find((t) => t.id === parseInt(id, 0));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (e) {
    console.error(`Erro: ${e}`);
  }
});

router.post('/',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const data = await getFile();
      const id = data.length + 1;
      const newTalker = {
        name,
        age,
        id,
        talk,
      };
      createTalker(newTalker);
      res.status(201).json(newTalker);
    } catch (e) {
      console.log(`Erro: ${e}`);
    }
  });

// router.put('/:id',
//   isValidToken,
//   isValidName,
//   isValidAge,
//   isValidTalk,
//   isValidDate,
//   isValidRate,
//   async (req, res) => {
//     try {
//       const { name, age, talk } = req.body;
//       const { id } = req.params;
//       const data = await getFile();
//       const talker = data.find((t) => t.id === parseInt(id, 0));
//       const newTalker = {
//         ...talker,
//         name,
//         age,
//         talk,
//       };
//       data.splice(talker, 1, newTalker);
//       fs.writeFile('talker.json', JSON.stringify(data));
//       const showtalker = data.find((t) => t.id === parseInt(id, 0));
//       res.status(200).json(showtalker);
//     } catch (e) {
//       console.error(`Erro: ${e}`);
//     }
//   });

module.exports = router;