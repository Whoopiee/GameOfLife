import Cell from './Cell.js';
import Constants from './Constants.js';

//Клітина типу Перешкода. Не має ніякого функціоналу
export default class Obstacle extends Cell {

    color = Constants.ObstacleColor;

    constructor(Ocean, offset) {
        super(Ocean, offset);
    }
}
