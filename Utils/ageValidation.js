module.exports = (req, res, next) => {
    const { age } = req.body;
    if (!age || age.length === '') {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
        });
    } if (parseInt(age, 10) < 18) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    next();
};