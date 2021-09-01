const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { PORT } = require('./util/constants');

// https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Online on http://localhost:${PORT}/`);
});
