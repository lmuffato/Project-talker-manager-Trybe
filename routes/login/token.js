const { HTTP_OK_STATUS } = require('../../util/constants');

const maybeUpperCase = (char) => (Math.random() > 0.5 ? char.toUpperCase() : char);
const genRandomChar = () =>
    [...Number(Math.floor(Math.random() * 26)).toString(36)]
        .map(maybeUpperCase)
        .reduce((acc, cur) => acc + cur, '');
const genRandomToken = (length) =>
    [...Array(length)]
        .reduce((acc, _cur) => (acc + genRandomChar()), '');

const token = async (_req, res) => {
    const randomToken = genRandomToken(16);
    res.status(HTTP_OK_STATUS).json({ token: randomToken });
};

module.exports = token;
