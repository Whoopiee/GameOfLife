import Constants from './Constants.js';

export default class Cell {

    color = Constants.DefaultColor;
    width = 10;
    height = 10;

    constructor(Ocean = null, coords = null) {
        this.Ocean1 = Ocean;
        this.offset = coords;
    }

    //геттери та сеттери
    getCurrentColor(){
        return this.color;
    }

    setCurrentColor(parColor){
        this.color = parColor;
    }

    getOffset() {
        return this.offset;
    }

    setOffset(anOffset) {
        this.offset = anOffset;
    }

 //пошук "сусіда" по позначці (переробити)
 getNeighborWithImage(color) {
    let array = [],
        count = 0;
    if (this.north().getCurrentColor() == color) {
        array.push(this.north());
        count++;
    }
    if (this.south().getCurrentColor() == color) {
        array.push(this.south());
        count++;
    }
    if (this.east().getCurrentColor() == color) {
        array.push(this.east());
        count++;
    }
    if (this.west().getCurrentColor() == color) {
        array.push(this.west());
        count++;
    }

    if (count == 0) return this;
    else {
        let random = Math.floor(Math.random() * ((count - 1) - 0) + 0);
        return array[random];
    }
}

    //знаходження пустої сусідньої клітинки
    getEmptyNeighborCoord() {
        return this.getNeighborWithImage(Constants.DefaultColor).getOffset();
    }

    //знаходження сусідньої клітинки типу Здобич
    getPrayNeighborCoord() {
        return this.getNeighborWithImage(Constants.DefaultPreyColor).getOffset();
    }

    //перевірка верхньої клітинки
    north() {
        let yvalue;

        yvalue = (this.offset.getY() > 0) ? (this.offset.getY() - 1) : (this.Ocean1.getNumRows() - 1);
        return this.Ocean1.getCellByCoord(yvalue, this.offset.getX());
    }

    //перевірка нижньої клітинки    
    south() {
        let yvalue;

        yvalue = (this.offset.getY() + 1) % this.Ocean1.getNumRows();
        return this.Ocean1.getCellByCoord(yvalue, this.offset.getX());
    }

    //перевірка правої клітинки
    east() {
        let xvalue;

        xvalue = (this.offset.getX() + 1) % this.Ocean1.getNumCols();
        return this.Ocean1.getCellByCoord(this.offset.getY(), xvalue);
    }

    //перевірка лівої клітинки
    west() {
        let xvalue;

        xvalue = (this.offset.getX() > 0) ? (this.offset.getX() - 1) : (this.Ocean1.getNumCols() - 1);
        return this.Ocean1.getCellByCoord(this.offset.getY(), xvalue);
    }

    //функція "розмноження" клітини
    reproduce(anOffset) {
        let temp = new Cell(this, anOffset);
        return temp;
    }

    //обробка дій клітини в залежності від її типу
    process() { }

    //малювання квадрату в залежності від типу клітинки
    draw() {
        this.Ocean1.context.fillStyle = this.getCurrentColor();
        this.Ocean1.context.fillRect(this.offset.getX() * this.width, (this.offset.getY()) * this.height, this.width, this.height);
    }
}