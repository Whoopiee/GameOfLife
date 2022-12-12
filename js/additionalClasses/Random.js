const MAX = 32767;

export default class Random {
    //функція знаходження рандомного числа між двома заданими числами
    static nextIntBetween(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
}