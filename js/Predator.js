const Cell = require('./Cell'),
      Constants = require('./Constants'),
      Prey = require('./Prey.js');

module.exports = {
    Predator: class Predator extends Prey.Prey{
        constructor(Ocean = null, offset = null){
            super(Ocean, offset);
            this.timeToFeed = Constants.TimeToFeed;
            this.image = Constants.DefaultPredImage;
            this.color = 'red';
        }
        
        reproduce(anOffset){
            let temp = new Predator(this.Ocean1, anOffset);
            this.Ocean1.setNumPredators(this.Ocean1.getNumPredators()+1);
            temp.moved = true;
            return temp;
        }

        process(){
            if(--this.timeToFeed<=0){
                this.assignCellAt(this.offset, new Cell.Cell(this.Ocean1, this.offset));
                this.Ocean1.setNumPredators(this.Ocean1.getNumPredators()-1);
                delete this;
            }else{
                let toCoord = this.getPrayNeighborCoord();
                if(toCoord!=this.offset){
                    this.Ocean1.setNumPrey(this.Ocean1.getNumPrey()-1);
                    this.timeToFeed = Constants.TimeToFeed;
                    this.moveFrom(this.offset, toCoord);
                }else{
                    super.process();
                }
            }
        }
    }
}