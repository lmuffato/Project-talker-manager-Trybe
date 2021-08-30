const isValidEmail = (email) => {
    if (!email) {
        return false;
    }
    
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const isValidPassword = (password) => password.length >= 6;

module.exports = {
    isValidEmail,
    isValidPassword,
};