const crypto = require('crypto');

const tokenCreate = () => {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
};

const checkEmail = (email) => {
    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email);
};

const checkPassword = (password) => {
    const lengthPassword = 6;
    return String(password).length >= lengthPassword;
};

/* checkEmail: https://pt.stackoverflow.com/
questions/1386/
express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-m */
console.log(tokenCreate());

module.exports = { tokenCreate, checkEmail, checkPassword };
