const assert = require('assert');
const config = require('./default.json');

module.exports = class ConfigClient {
    constructor() {
        this.config = config;
    }

    get = (key) => {
        assert(key && this.config[key]);
        return this.config[key];    
    }

    appConfig = () =>  this.get('app')
};