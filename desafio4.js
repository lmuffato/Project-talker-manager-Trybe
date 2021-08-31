const validateToken = (authorization, res) => {
    if (!authorization || authorization === '') {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    return false;
};

const validateName = (name, res) => {
    if (!name || name === '') {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return false;
};

const validateAge = (age, res) => {
    if (!age || age === '') {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    if (typeof (age) !== 'number') {
        return res.status(400).json({ message: 'Idade deve ser um número' });
    }
    return false;
};

const createTalker = (req, res) => {
    const { authorization } = req.headers;
    const talker = req.body;
    const { name, age, watchedAt, rate } = req.body;

    if (validateToken(authorization, res)) return;
    if (validateName(name, res)) return;
    if (validateAge(age, res)) return;

    res.status(201).json(talker);
};

module.exports = createTalker;