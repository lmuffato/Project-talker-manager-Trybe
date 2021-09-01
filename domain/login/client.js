const validators = require('./validate');

module.exports = class LoginClient {
    constructor() {
        this.LoginHandler = require('./login');

        this.validators = [
            validators.validateEmail,
            validators.validatePassword,
        ];
    }

    login = async (...args) => {
        this.LoginHandler.call(this, ...args);
    }
};