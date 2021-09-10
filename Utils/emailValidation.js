module.exports = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') {
        return res.status(400).json(
            { message: 'O campo "email" é obrigatório' },
        );
    }
    const emailValido = /\w+@\w+.\w+/g;
    if (!emailValido.test(email)) {
        return res.status(400).json(
            { message: 'O "email" deve ter o formato "email@email.com"' },
        );
    }

    next();
};
