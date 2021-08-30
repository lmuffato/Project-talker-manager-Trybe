const { StatusCodes } = require('http-status-codes');

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

const errorHandler = async (err, req, res, _) => {
    console.error(
        { path: req.path, query: req.query, body: req.body, message: err.message },
    );

    if (err instanceof CustomError) {
        res.status(err.status);
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    res.json({ message: err.message });
};
    
module.exports = {
    errorHandler,
    CustomError,
};