const lettersTiny = ['a', 'b', 'c', 'd', 'e', 'f', 
'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const lettersCapital = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 
'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 
'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const arrays = [lettersTiny, numbers, lettersCapital];

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateToken = (length) => Array
    .from({ length }, () => {
        const array = arrays[getRandomIndex(0, 3)];
        if (array.length === 26) return array[getRandomIndex(0, 25)];
        return array[getRandomIndex(0, 10)];
    }).join('');

module.exports = generateToken;
