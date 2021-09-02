// primeiro: validar token
const verifiedToken = (req, res, next) => {
    const token = req.headers.authorization;
    const conditionRegex = !/^[a-zA-Z0-9]{16}$/;
    
    if (token && conditionRegex.test(token)) {
        return res.status(200).json({ token }); 
    }

    next();
};

module.exports = { verifiedToken };