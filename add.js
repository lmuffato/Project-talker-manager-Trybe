const fileReader = require('./fileManager');

const addTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    try {
      const ArrayOfTalkers = await fileReader();
      const dataparse = JSON.parse(ArrayOfTalkers);
      const data = { name, age, talk, id: dataparse.length + 1 };
      const dataAdd = [...dataparse, data];
      console.log(dataAdd);
      /* if (!dataAdd) {
          return res.status(404).json(
              { message: 'not add' },
            );  
        } */
        res.status(200).json(dataAdd);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  module.exports = addTalker;