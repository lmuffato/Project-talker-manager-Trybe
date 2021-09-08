const { tokenCreate, checkEmail, checkPassword } = require('../routes/utilities/checkLogin');

module.exports = (req, res) => {
    const { email, password } = req.body;
    const checkEmailcreate = checkEmail(email);
    const checkPasswordcreate = checkPassword(password);
    if (!email) {
        res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!checkEmailcreate) {
        res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
        res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (!checkPasswordcreate) {
            res.status(400)
            .send({ message: 'O campo "password" deve ter pelo menos 6 caracteres' });
    }
    const token = tokenCreate();
    return res.status(200).send({ token });
};
