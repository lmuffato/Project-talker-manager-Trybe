// const express = require('express');

// const parsedData = require('./utils/parseData');
// const getById = require('./utils/getTalkerById');
// const validations = require('./middlewares/validations');
// const createTalker = require('./utils/createTalker');

// const router = express.Router();

// router.get('/', async (_req, res) => {
//   const talkers = await parsedData();

//   if (!talkers) {
//     return res.status(200).json([]);
//   }

//   res.status(200).json(talkers);
// });

// router.get('/:id', async (req, res, next) => {
//   const { id } = req.params;

//   const talker = await getById(id);

//   if (!talker) {
//     return next({
//       statusCode: 404,
//       message: 'Pessoa palestrante não encontrada',
//     });
//   }

//   res.status(200).json(talker);
// });

// router.post(
//   '/',
//   // tokenValidate
//   // talkMiddleware,
//   // rateMiddleware,
//   validations,
//   async (req, res) => {
//     const { name, age, talk, id } = req.body;

//     const newTalker = await createTalker({ name, age, talk, id });

//     return res.status(201).json(newTalker);
//   },
// );
// module.exports = router;
