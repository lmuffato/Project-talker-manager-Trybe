const router = require('express').Router();
const { deleteTalker } = require('../../../utils/handleFile');
const { HTTP_OK_STATUS } = require('../../../utils/serverStatus');

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  deleteTalker(+id);

  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
