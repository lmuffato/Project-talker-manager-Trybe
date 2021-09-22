const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const HTTP_OK_STATUS = 200;
const app = express();
const talkerRouter = require('./talkerRouter');
const { emailValid, passValid, generateToken } = require('./validations/loginValid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(PORT, () => console.log('Online na porta: %s', PORT));

/**
 * ENDPOINTS
 */
app.get('/', (req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.post('/login', emailValid, passValid, async (req, res) => {
  const token = generateToken();
  res.status(HTTP_OK_STATUS).json({ token });
});
