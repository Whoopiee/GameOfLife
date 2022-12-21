import Cell from './Cell.js';
import Constants from './Constants.js';
import Prey from './Prey.js';

export default class Predator extends Prey {

    timeToFeed = Constants.TimeToFeed;
    color = Constants.DefaultPredColor;

    constructor(Ocean = null, offset = null) {
        super(Ocean, offset);
    }

    // "розмноження" клітини типу Хижак
    reproduce(anOffset) {
        let temp = new Predator(this.Ocean1, anOffset);
        this.Ocean1.setNumPredators(this.Ocean1.getNumPredators() + 1);
        temp.moved = true;
        return temp;
    }

    //імітація "життя" клітини типу Хижак
    process() {
        if (--this.timeToFeed <= 0) {
            this.Ocean1.assignCellAt(this.offset, new Cell(this.Ocean1, this.offset));
            this.Ocean1.setNumPredators(this.Ocean1.getNumPredators() - 1);
            delete this;
        } else {
            let toCoord = this.getPrayNeighborCoord();
            if (toCoord != this.offset) {
                this.Ocean1.setNumPrey(this.Ocean1.NumPrey - 1);
                this.timeToFeed = Constants.TimeToFeed;
                this.moveFrom(this.offset, toCoord);
            } else {
                super.process();
            }
        }
    }
}