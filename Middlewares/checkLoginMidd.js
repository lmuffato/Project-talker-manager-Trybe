const { tokenCreate, checkEmail, checkPassword } = require('../routes/utilities/checkLogin');

const token = tokenCreate();

module.exports = (req, res) => {
    const { email, password } = req.body;
    const checkEmailcreate = checkEmail(email);
    const checkPasswordcreate = checkPassword(password);
    if (!email) {
        res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!checkEmailcreate) {
        res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    console.log(checkPasswordcreate);
    return res.status(200).send({ token });
};

console.log(token);
