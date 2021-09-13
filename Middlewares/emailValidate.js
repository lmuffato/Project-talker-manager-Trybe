const checkEmail = (email) => {
    const validateEmail = /\w+@\w+.\w+/i;
 validateEmail.test(email);
};

module.exports = (req, res, next) => {
    const email = req.body;
    if (!email || email === '') {
        res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!checkEmail) {
        res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};
