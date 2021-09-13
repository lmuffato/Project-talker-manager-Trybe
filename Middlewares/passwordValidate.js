/* const checkPassword = (password) => {
    const lengthPassword = 6;
    return (password).length >= lengthPassword;
}; */

module.exports = (req, res, next) => {
   const { password } = req.body;
    if (!password || password === '') {
       return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
     if (password.length < 5) {
       return res.status(400)
        .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};
