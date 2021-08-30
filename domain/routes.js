const express = require('express');

module.exports = (server) => {
    const root = express.Router();

    // Dont't remove this endpoint
    root.get('/', (_, res) => {
        res.send();
    });
   
    root.use('/talker', talkerRouter(server));
    root.use('/login', loginRouter(server));

    return root;
};

const talkerRouter = (server) => {
    const router = express.Router({ mergeParams: true });

    router.get(
        '/',
        server.talkerClient.list,
    );

    router.get(
        '/:id',
        server.talkerClient.get,
    );
    
    return router;
};

const loginRouter = (server) => {
    const router = express.Router({ mergeParams: true });

    router.post(
        '/',
        server.loginClient.validate,
        server.loginClient.login,
    );

    return router;
};
