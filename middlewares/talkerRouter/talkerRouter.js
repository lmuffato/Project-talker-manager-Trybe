const express = require('express');

const router = express.Router();

const { showTalkers } = require('./showTalkers');

/* router.get('/talker/search', );

router.get('/talker/:id', );

router.put('/talker/:id',  );

router.delete('/talker/:id', ); */

router.get('/talker', showTalkers);

// router.post('/talker',  );