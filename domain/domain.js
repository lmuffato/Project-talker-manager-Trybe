const TalkerClient = require('./talker/client');
const LoginClient = require('./login/client');
const AuthClient = require('./auth/client');
const ConfigClient = require('./config/client');

module.exports = async (server) => {
    server.authClient = new AuthClient();
    server.talkerClient = new TalkerClient();
    server.loginClient = new LoginClient();
    server.configClient = new ConfigClient();
};