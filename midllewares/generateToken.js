const cripto = require('crypto');

const generateToken = (_req, res) => {
    const rawData = cripto.randomBytes(8);
    const token = rawData.toString('hex');
    return res.status(200).json({ token });
};

module.exports = generateToken;