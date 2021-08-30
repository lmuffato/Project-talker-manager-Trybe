const { StatusCodes } = require('http-status-codes');
const randstr = require('randomstring');

module.exports = async function (_, res, next) {
    try {
        const token = genToken();

        return res.status(StatusCodes.OK).json({ token: token });
    } catch (err) {
        next(err);
    }
};

const genToken = () => {
    return randstr.generate(16)
};