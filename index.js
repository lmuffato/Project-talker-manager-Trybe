const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/talker');
const STATUS = require('./status/http_status');

const app = express();
app.use(bodyParser.json());
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`We are running and ready to rock on ${PORT}`);
});
