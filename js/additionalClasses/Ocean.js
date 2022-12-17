import Constants from './Constants.js'; //include modules
import Random from './Random.js';
import Cell from './Cell.js';
import Coordinate from './Coordinate.js';
import Obstacle from './Obstacle.js';
import Predator from './Predator.js';
import Prey from './Prey.js';

export default class Ocean {
    _numRows = 0;
    _numCols = 0;
    _size = 0;
    _numPrey = 0;
    _numPredators = 0;
    _numObstacles = 0;
    cells = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    //ініціалізація полів класа
    initialize() {
        this._numRows = Constants.MaxRows;
        this._numCols = Constants.MaxCols;
        this._size = this._numRows * this._numCols;
        this._numPrey = Constants.DefaultNumPrey;
        this._numPredators = Constants.DefaultNumPredators;
        this._numObstacles = Constants.DefaultNumObstacles;
        this.initCells();
    }

    //додавання усіх елементів до "Океану"
    initCells() {
        this.addEmptyCells();

        this.addObstacles();
        this.addPrey();
        this.addPredators();

    }

    getEmptyCellCoord() { //подумати над більш ефективною реалізацією
        // let x, y;

        // do {
        //     x = Random.nextIntBetween(0, this._numCols - 1);
        //     y = Random.nextIntBetween(0, this._numRows - 1);
        // } while (this.cells[y][x].getImage() != Constants.DefaultImage);

        let arr = [];
        for (let row = 0; row < Constants.MaxRows; row++) {
            for (let col = 0; col < Constants.MaxCols; col++) {
                if(this.cells[row][col].image == Constants.DefaultImage)
                arr.push(this.cells[row][col]);
            }
        }

        let position = 0;

        if(arr.length != 0){
            position = Random.nextIntBetween(0, arr.length);
        }
        
         return arr[position].getOffset();
    }

    //заповнення Океану пустими комірками
    addEmptyCells() {
        for (let row = 0; row < this._numRows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this._numCols; col++) {
                this.cells[row][col] = new Cell(this, new Coordinate(col, row));
            }
        }
    }

    //додавання здобичи
    addPrey() {
        for (let i = 0; i < this._numPrey; i++) {
            const empty = this.getEmptyCellCoord();
            this.cells[empty.getY()][empty.getX()] = new Prey(this, empty);
        }
    }

    //додавання перешкод
    addObstacles() {
        for (let i = 0; i < this._numObstacles; i++) {
            const empty = this.getEmptyCellCoord();
            this.cells[empty.getY()][empty.getX()] = new Obstacle(this, empty);
        }
    }

    //додавання хижаків
    addPredators() {
        let empty = new Coordinate();

        for (let i = 0; i < this._numPredators; i++) {
            empty = this.getEmptyCellCoord();
            this.cells[empty.getY()][empty.getX()] = new Predator(this, empty);
        }
    }

    //геттери та сеттери
    getNumPrey() {
        return this._numPrey;
    }

    setNumPrey(num) {
        this._numPrey = num;
    }

    getNumPredators() {
        return this._numPredators;
    }

    setNumPredators(num) {
        this._numPredators = num;
    }

    //виведення даних стану Океану
    displayStats(iteration) {
        console.log(`Iteration: ${iteration}, Obst: ${this._numObstacles}, Predat: ${this._numPredators}, Prey: ${this._numPrey}`);
    }

    //функція запуску "життя"
    run() {
        let numIter = 0;
        if (numIter > 1000 || numIter < 0) numIter = 1000;
        window.requestAnimationFrame(() => this.gameLoop(numIter));
    }

    //функція виведення даних про стан кожної комірки у задовільному вигляді
    view() {
        let arr = [];
        for (let row = 0; row < Constants.MaxRows; row++) {
            arr[row] = [];
            for (let col = 0; col < Constants.MaxCols; col++) {
                this.cells[row][col].draw();
                arr[row][col] = this.cells[row][col].image;
            }
        }

        arr.forEach((item) => {
            console.log(item);
        });
    }

    //запуск логіки "життя" кожної комірки двовимірного масиву і малювання ігрового поля кожні 1000мс
    gameLoop(numIter) {

        if ((this._numPredators > 0 && this._numPrey > 0) && numIter < Constants.DefaultNumIterations) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.displayStats(numIter + 1);
            this.view();
            for (let row = 0; row < this._numRows; row++)
                for (let col = 0; col < this._numCols; col++) {
                    if (!this.cells[row][col].moved) {
                        this.cells[row][col].process();
                    }
                }

            for (let row = 0; row < this._numRows; row++)
                for (let col = 0; col < this._numCols; col++) {
                    if (this.cells[row][col].moved)
                        this.cells[row][col].moved = false;
                }

            numIter++;
        } else if (this._numPredators == 0 || this._numPrey == 0 || numIter >= Constants.DefaultNumIterations) {
            for (let row = 0; row < this._numRows; row++)
                for (let col = 0; col < this._numCols; col++)
                    this.cells[row][col].draw();
            clearTimeout();
        }
        setTimeout(() => {
            window.requestAnimationFrame(() => this.gameLoop(numIter));
        }, 1000);

    }

}
