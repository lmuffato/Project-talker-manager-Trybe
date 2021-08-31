const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('./errors/client');
const initdom = require('./domain');
const initroutes = require('./routes');

// Constants
const ETAG = 'etag';

module.exports = class Server {
    constructor() {
        this.app = express();
                
        // Dependency injection allows mocking of these clients in tests
        this.configClient = defaultClient();
        this.authClient = defaultClient();
        this.talkerClient = defaultClient();
        this.loginClient = defaultClient();
    }
    
    init = async () => {
        await initdom(this);

        this.preRoutesMiddlewares();

        this.app.use(
            this.configClient.appConfig().baseUrl,
            initroutes(this),
        );
        
        this.posRoutesMiddlewares();
    }

    start = () => {
        const port = this.configClient.appConfig().port || 3000;

        this.app.listen(port, () => {
            console.info(`Server running on ${port} port.`);
        });
    }

    preRoutesMiddlewares = () => {
        this.app.disable(ETAG);
        this.app.use(bodyParser.json());
    }

    posRoutesMiddlewares = () => {
        this.app.use(errorHandler);
    }
};

const defaultClient = () => {};