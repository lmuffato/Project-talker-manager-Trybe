const router = (app, fs) => {
  const TALKER = './talker.json';

  app.get('/talker', (_request, response) => {
    fs.readFile(TALKER, 'utf8', (e, content) => {
        if (e) {
            throw e;
        }
        response.json(content);
    });
  });
};

module.exports = router;