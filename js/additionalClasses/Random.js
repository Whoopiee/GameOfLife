const MAX = 32767;

module.exports = {
    Random: class Random {
        constructor() { }
    },

    //функція знаходження рандомного числа між двома заданими числами
    nextIntBetween: function (min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
};