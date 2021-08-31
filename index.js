const { app } = require('./middlewares');

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});
