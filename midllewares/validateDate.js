const INVALID_DATE = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

const validateAuxiliar = (arr) => {
    const day = arr[0];
    const month = arr[1];        
    if (+day < 0 || day > 31) return false;
    if (+month < 0 || month > 12) return false;
    return true;    
};

const validateYear = (year) => {
    if (+year / 1000 < 1) return false;
    return true;
};

const validateDate = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const arr = watchedAt.split('/');
    if (arr.length !== 3) return res.status(400).json(INVALID_DATE);
    const condition = validateAuxiliar(arr);
    const yearCondition = validateYear(arr[2]);
    if (!condition || !yearCondition) return res.status(400).json(INVALID_DATE);
    next();
};

module.exports = validateDate;