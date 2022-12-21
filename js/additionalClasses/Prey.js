import Cell from './Cell.js';
import Constants from './Constants.js';

export default class Prey extends Cell {

    timeToReproduce = Constants.TimeToReproduce;
    color = Constants.DefaultPreyColor;

    constructor(Ocean, offset) {
        super(Ocean, offset);
    }

    //зміна положення клітини від точки до точки
    moveFrom(from, to) {
        this.timeToReproduce--;
        if (to.notEqualXY(from)) {
            this.setOffset(to);
            this.Ocean1.assignCellAt(to, this);
            this.moved = true;
            if (this.timeToReproduce <= 0) {
                this.timeToReproduce = Constants.TimeToReproduce;
                this.Ocean1.assignCellAt(from, this.reproduce(from));
            } else {
                this.Ocean1.assignCellAt(from, new Cell(this.Ocean1, from));
            }
        }
    }

    // "розмноження" клітини типу Здобич
    reproduce(anOffset) {
        let temp = new Prey(this.Ocean1, anOffset);
        temp.moved = true;
        this.Ocean1.setNumPrey(this.Ocean1.NumPrey + 1);
        return temp;
    }

    //імітація "життя" клітини типу Здобич
    process() {
        this.moveFrom(this.offset, this.getEmptyNeighborCoord());
    }
}