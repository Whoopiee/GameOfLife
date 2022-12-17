import Cell from './Cell.js';
import Constants from './Constants.js';

export default class Prey extends Cell {
    constructor(Ocean, offset) {
        super(Ocean, offset);
        this.timeToReproduce = Constants.TimeToReproduce;
        this.image = Constants.DefaultPreyImage;
        this.moved = false;
        this.color = 'green';
    }

    //зміна положення клітини від точки до точки
    moveFrom(from, to) {
        this.timeToReproduce--;
        if (to.notEqualXY(from)) {
            this.setOffset(to);
            this.assignCellAt(to, this);
            this.moved = true;
            if (this.timeToReproduce <= 0) {
                this.timeToReproduce = Constants.TimeToReproduce;
                this.assignCellAt(from, this.reproduce(from));
            } else {
                this.assignCellAt(from, new Cell(this.Ocean1, from));
            }
        }
    }

    // "розмноження" клітини типу Здобич
    reproduce(anOffset) {
        let temp = new Prey(this.Ocean1, anOffset);
        temp.moved = true;
        this.Ocean1.setNumPrey(this.Ocean1.getNumPrey() + 1);
        return temp;
    }

    //імітація "життя" клітини типу Здобич
    process() {
        this.moveFrom(this.offset, this.getEmptyNeighborCoord());
    }
}