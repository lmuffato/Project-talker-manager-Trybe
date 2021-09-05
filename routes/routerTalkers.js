const express = require('express');

const router = express.Router();
const {
  getTalkers,
  getTalkersById,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
} = require('../middlewares');

router.get('/search', searchTalker);
router.get('/', getTalkers);
router.get('/:id', getTalkersById);
router.post('/', createTalker);
router.put('/:id', editTalker);
router.delete('/:id', deleteTalker);

module.exports = router;
