import Cell from './Cell.js';
import Constants from './Constants.js';

//Клітина типу Перешкода. Не має ніякого функціоналу
export default class Obstacle extends Cell {
    constructor(Ocean, offset) {
        super(Ocean, offset);
        this.image = Constants.ObstacleImage;
        this.color = 'black';
    }
}
