const Cell = require('./Cell.js'),
      Constants = require('./Constants.js');

module.exports = {
Obstacle: class Obstacle extends Cell.Cell{
    constructor(Ocean, offset){
        super(Ocean, offset);
        this.image = Constants.ObstacleImage;
        this.color = 'black';
    }
}
};