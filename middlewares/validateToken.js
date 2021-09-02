const FAIL_STATUS = 401;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
 
  if (!authorization) {
    return res.status(FAIL_STATUS).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(FAIL_STATUS).json({ message: 'Token inválido' });
  }
  next();  
};

module.exports = validateToken;

// http :3000/talker/ {authorization=token="fsfs"} /"name"="Danielle Santos","age"=56,{talk={"watchedAt": "22/10/2019","rate"=5}