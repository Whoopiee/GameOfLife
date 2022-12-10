const Constants = require('./Constants');

module.exports = {

Cell: class Cell{

    constructor(Ocean = null, coords = null){
        this.Ocean1 = Ocean;
        this.offset = coords;
        this.image = Constants.DefaultImage;  //замінити візуалізацією на сайті
        this.color = 'white';
        this.width = 10;
        this.height = 10;
    }

    getImage(){
        return this.image;
    }

    getOffset(){
        return this.offset;
    }

    setOffset(anOffset){
        this.offset = anOffset;
    }

    getCellAt(aCoord){ //maybe
        return this.Ocean1.cells[aCoord.getY()][aCoord.getX()];
    }

    assignCellAt(aCoord, aCell){ //not sure
        this.Ocean1.cells[aCoord.getY()][aCoord.getX()] = aCell;
    }

    getNeighborWithImage(anImage){//rework for site
        let array = [],
        count = 0;

        if(this.north().getImage() == anImage){
            array.push(this.north());
            count++;
        }
        if(this.south().getImage() == anImage){
            array.push(this.south());
            count++;
        }
        if(this.east().getImage() == anImage){
            array.push(this.east());
            count++;
        }
        if(this.west().getImage() == anImage){
            array.push(this.west());
            count++;
        }

        if(count == 0)return this;
        else{
            let random = Math.floor(Math.random() * ((count - 1) - 0) + 0 );
            return array[random];
        }
    }

    getEmptyNeighborCoord(){
        return this.getNeighborWithImage(Constants.DefaultImage).getOffset();
    }

    getPrayNeighborCoord(){
        return this.getNeighborWithImage(Constants.DefaultPreyImage).getOffset();
    }

    north(){
        let yvalue;

        yvalue = (this.offset.getY()>0)?(this.offset.getY()-1):(this.Ocean1._numRows-1);
        return this.Ocean1.cells[yvalue][this.offset.getX()];
    }

    south(){
        let yvalue;

        yvalue = (this.offset.getY()+1) % this.Ocean1._numRows;
        return this.Ocean1.cells[yvalue][this.offset.getX()];
    }

    east(){
        let xvalue;

        xvalue = (this.offset.getX()+1) % this.Ocean1._numCols;
        return this.Ocean1.cells[this.offset.getY()][xvalue];
    }

    west(){
        let xvalue;

        xvalue = (this.offset.getX()>0)?(this.offset.getX()-1):(this.Ocean1._numCols-1);
        return this.Ocean1.cells[this.offset.getY()][xvalue];
    }

    reproduce(anOffset){
        let temp = new Cell(this, anOffset);
        return temp;
    }
    
    process(){} //nothing

    draw(){ //допрацювати
        this.Ocean1.context.fillStyle = this.color;
        this.Ocean1.context.fillRect(this.offset.getX() * this.width, this.offset.getY() * this.height, this.width, this.height);
    }
}
};