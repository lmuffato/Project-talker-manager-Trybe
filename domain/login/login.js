const { StatusCodes } = require('http-status-codes');
const randstr = require('randomstring');

module.exports = async function (_, res, next) {
    try {
        const token = genToken();

        return res.status(StatusCodes.OK).json({ token });
    } catch (err) {
        next(err);
    }
};

const genToken = () => randstr.generate(16);