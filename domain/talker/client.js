module.exports = class TalkerClient {
    constructor() {
        this.ListHandler = require('./list');
        this.GetHandler = require('./get');
        this.CreateHandler = require('./create');
        this.UpdateHandler = require('./update');
        this.ValidateTalkerMiddleware = require('./validate');
    }

    list = async (...args) => {
        this.ListHandler.call(this, ...args);
    }

    get = async (...args) => {
        this.GetHandler.call(this, ...args);
    }

    create = async (...args) => { 
        this.CreateHandler.call(this, ...args);
    }
    
    update = async (...args) => {
        this.UpdateHandler.call(this, ...args);
    }

    validate = async (...args) => {
        this.ValidateTalkerMiddleware.call(this, ...args);
    }
};