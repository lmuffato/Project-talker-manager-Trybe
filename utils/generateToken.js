const generateToken = () => Math.random().toString(16).substr(2) 
    + Math.random().toString(16).substr(12);

module.exports = generateToken;
