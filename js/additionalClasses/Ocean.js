import Constants from './Constants.js'; //include modules
import Random from './Random.js';
import Cell from './Cell.js';
import Coordinate from './Coordinate.js';
import Obstacle from './Obstacle.js';
import Predator from './Predator.js';
import Prey from './Prey.js';
import Viewer from './Viewer.js';

export default class Ocean {
    #numRows = 0;
    #numCols = 0;
    _size = 0;
    #numPrey = 0;
    #numIter;
    #numPredators = 0;
    #numObstacles = 0;
    #cells;
    alreadyProcessed = [];

    constructor(canvas, doc) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.document = doc;
    }

    //ініціалізація полів класа
    initialize() {
        Viewer.addVariablesToConst(this.document);
        this.#numPrey = Constants.DefaultNumPrey;
        this.#numPredators = Constants.DefaultNumPredators;
        this.#numRows = Constants.MaxRows;
        this.#numCols = Constants.MaxCols;
        this.#numIter = 0;
        this.#cells = [];
        this._size = this.#numRows * this.#numCols;
        this.#numObstacles = Constants.DefaultNumObstacles;
        this.initCells();
    }

    //додавання усіх елементів до "Океану"
    initCells() {
        this.addEmptyCells();
        this.addObstacles();
        this.addPrey();
        this.addPredators();

    }

    //пошук рандомної точки у просторі (переробити)
    getEmptyCellCoord() { 
        let x, y;

        do {
            x = Random.nextIntBetween(0, this.#numCols - 1);
            y = Random.nextIntBetween(0, this.#numRows - 1);
        } while (this.#cells[y][x].getCurrentColor() != Constants.DefaultColor);
        return this.#cells[y][x].getOffset();
    }

    //заповнення Океану пустими комірками
    addEmptyCells() {
        for (let row = 0; row < this.#numRows; row++) {
            this.#cells[row] = [];
            this.alreadyProcessed[row] = [];
            for (let col = 0; col < this.#numCols; col++) {
                this.#cells[row][col] = new Cell(this, new Coordinate(col, row));
                this.alreadyProcessed[row][col] = false; 
            }
        }
    }

    //додавання перешкод
    addObstacles() {
        if (Constants.DefaultNumObstacles >= this._size) return;
        for (let i = 0; i < this.#numObstacles; i++) {
            const empty = this.getEmptyCellCoord();
            this.#cells[empty.getY()][empty.getX()] = new Obstacle(this, empty);
        }
        this._size -= this.#numObstacles; 
    }

    //додавання здобичи
    addPrey() {
        if (Constants.DefaultNumPrey >= this._size) return;
        for (let i = 0; i < this.#numPrey; i++) {
            const empty = this.getEmptyCellCoord();
            this.#cells[empty.getY()][empty.getX()] = new Prey(this, empty);
        }
        this._size -= this.#numPrey;
    }

    //додавання хижаків
    addPredators() {
        if (Constants.DefaultNumPredators >= this._size) return;
        for (let i = 0; i < this.#numPredators; i++) {
            const empty = this.getEmptyCellCoord();
            this.#cells[empty.getY()][empty.getX()] = new Predator(this, empty);
        }
        this._size -= this.#numPredators;
    }

    //геттери та сеттери
    get NumPrey() {
        return this.#numPrey;
    }

    setNumPrey(num) {
        this.#numPrey = num;
    }

    getNumPredators() {
        return this.#numPredators;
    }

    setNumPredators(num) {
        this.#numPredators = num;
    }

    setNumObst(num) {
        this.#numObstacles = num;
    }

    getNumObst() {
        return this.#numObstacles;
    }

    getNumCols() {
        return this.#numCols;
    }

    setNumColss(num) {
        this.#numCols = num;
    }

    getNumRows() {
        return this.#numRows;
    }

    setNumRows(num) {
        this.#numRows = num;
    }

    getIter(){
        return this.#numIter;
    }

    setNumIter(iteration){
        this.#numIter = iteration;
    }

    //функція запуску "життя"
    run() {
        window.requestAnimationFrame(() => this.gameLoop());
    }

    //запуск логіки "життя" кожної комірки двовимірного масиву і малювання ігрового поля кожні 1000мс
    gameLoop() {
        
        if ((this.#numPredators > 0 && this.#numPrey > 0) && this.#numIter < Constants.DefaultNumIterations) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            Viewer.displayStats(this, this.document);
            Viewer.draw(this);
            for (let row = 0; row < this.#numRows; row++)
                for (let col = 0; col < this.#numCols; col++) {
                    if (!this.alreadyProcessed[row][col]) {
                        const inUseCell = this.#cells[row][col];
                        this.#cells[row][col].process();
                        this.alreadyProcessed[inUseCell.getOffset().getY()][inUseCell.getOffset().getX()] = true;

                    }
                }

            for (let row = 0; row < this.#numRows; row++)
                for (let col = 0; col < this.#numCols; col++) {
                    if (this.alreadyProcessed[row][col])
                    this.alreadyProcessed[row][col] = false;
                }

            this.#numIter++;
        } else if (this.#numPredators == 0 || this.#numPrey == 0 || this.#numIter >= Constants.DefaultNumIterations) {
            Viewer.draw(this);
            Viewer.gameOver(this.document);
            clearTimeout();
        }
        setTimeout(() => {
            window.requestAnimationFrame(() => this.gameLoop());
        }, 800);

    }

    //отримання об'єкту Клітинки по її координатам у двовимірномк масиві
    getCellAt(aCoord) {
        return this.#cells[aCoord.getY()][aCoord.getX()];
    }

    //встановлення певного об'єкту Клітини у задане місце двовимірного масиву
    assignCellAt(aCoord, aCell) {
        this.#cells[aCoord.getY()][aCoord.getX()] = aCell;
    }

    getCellByCoord(y, x) {
        if (this.#cells[y][x]) return this.#cells[y][x];
    }

    cellGetter(){
        return this.#cells;
    }

    clearAll(){
        this.#numIter = Constants.DefaultNumIterations;
    }
}
