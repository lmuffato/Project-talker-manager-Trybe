const validateToken = (authorization, res) => {
    if (!authorization || authorization === '') {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    return false;
};

const createTalker = (req, res) => {
    const { authorization } = req.headers;
    const talker = req.body;

    if (validateToken(authorization, res)) return;

    res.status(201).json(talker);
};

module.exports = createTalker;