const test = (_req, _res, next) => {
    console.log('entrou na rota');
    next();
};

module.exports = test;