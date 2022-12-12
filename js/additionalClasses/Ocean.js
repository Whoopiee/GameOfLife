const Constants = require('./Constants.js'), //include modules
    Random = require('./Random.js'),
    Cell = require('./Cell.js'),
    Coordinate = require('./Coordinate.js'),
    Obstacle = require('./Obstacle.js'),
    Predator = require('./Predator.js'),
    Prey = require('./Prey.js');

module.exports = {
    Ocean: class Ocean {

        constructor(canvas = null) {
            this._numRows = 0;
            this._numCols = 0;
            this._size = 0;
            this._numPrey = 0;
            this._numPredators = 0;
            this._numObstacles = 0;

            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');

            this.cells = [];
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
            let x, y;

            do {
                x = Random.nextIntBetween(0, this._numCols - 1);
                y = Random.nextIntBetween(0, this._numRows - 1);
            } while (this.cells[y][x].getImage() != Constants.DefaultImage);

            return this.cells[y][x].getOffset();
        }

        //заповнення Океану пустими комірками
        addEmptyCells() {
            for (let row = 0; row < this._numRows; row++) {
                this.cells[row] = [];
                for (let col = 0; col < this._numCols; col++) {
                    this.cells[row][col] = new Cell.Cell(this, new Coordinate.Coordinate(col, row));
                }
            }
        }

        //додавання здобичи
        addPrey() {
            let empty = new Coordinate.Coordinate();

            for (let i = 0; i < this._numPrey; i++) {
                empty = this.getEmptyCellCoord();
                this.cells[empty.getY()][empty.getX()] = new Prey.Prey(this, empty);
            }
        }

        //додавання перешкод
        addObstacles() {
            let empty = new Coordinate.Coordinate();

            for (let i = 0; i < this._numObstacles; i++) {
                empty = this.getEmptyCellCoord();
                this.cells[empty.getY()][empty.getX()] = new Obstacle.Obstacle(this, empty);
            }
        }

        //додавання хижаків
        addPredators() {
            let empty = new Coordinate.Coordinate();

            for (let i = 0; i < this._numPredators; i++) {
                empty = this.getEmptyCellCoord();
                this.cells[empty.getY()][empty.getX()] = new Predator.Predator(this, empty);
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
};


