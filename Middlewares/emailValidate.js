/* const checkEmail = (email) => {
    const validateEmail = /\w+@\w+.\w+/i;
return validateEmail.test(email); 
}; */

module.exports = (req, res, next) => {
    const { email } = req.body;
    const emailValidator = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);
    console.log(emailValidator);
    if (!email || email === '') {
       return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } 
    if (!emailValidator) {
       return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};
