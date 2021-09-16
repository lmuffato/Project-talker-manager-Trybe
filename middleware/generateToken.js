const HTTP_OK_STATUS = 200;

const generateToken = (_req, res) => {
  const randomGenerate = () => Math.random().toString(36).substr(2);
  const token = (randomGenerate() + randomGenerate()).substr(0, 16);

  return res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = generateToken;
