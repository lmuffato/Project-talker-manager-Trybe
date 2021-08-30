const Server = require('./domain/server');

(async () => {
    const server = new Server();

    try {
        await server.init();
        server.start();
    } catch (err) {
        console.error(err);
    }
})();