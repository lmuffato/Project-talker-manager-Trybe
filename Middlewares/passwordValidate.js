const checkPassword = (password) => {
    const lengthPassword = 6;
    return (password).length >= lengthPassword;
};

module.exports = (req, res, next) => {
   const password = req.body;
    if (!password) {
        res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (!checkPassword) {
        res.status(400)
        .send({ message: 'O campo "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};