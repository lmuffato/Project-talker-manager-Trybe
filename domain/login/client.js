module.exports = class LoginClient {
    constructor() {
        this.LoginHandler = require('./login');
        this.ValidateLoginMiddleware = require('./validate');
    }

    login = async (...args) => {
        this.LoginHandler.call(this, ...args);
    }

    validate = async (...args) => {
        this.ValidateLoginMiddleware.call(this, ...args);
    }
};