const isKeyExists = (object, key) => {
  try {
    const result = Object.prototype.hasOwnProperty.call(object, key);
    return result;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

module.exports = isKeyExists;
