import Constants from './Constants.js';

export default class Viewer {

    //відрисовка полотна
    static draw(Ocean) {
        const arrCells = Ocean.cellGetter();
        for (let row = 0; row < Constants.MaxRows; row++) {
            for (let col = 0; col < Constants.MaxCols; col++) {
                arrCells[row][col].draw();
            }
        }
    }

    //оновлення констант вхідними даними
    static addVariablesToConst(doc) {
        const objArr = doc.querySelectorAll('input');

        //змінити
        for(let obj of objArr){
            if(obj.value<0 || obj.value>100)obj.value = 50;
        }

            Constants.DefaultNumPrey = objArr[0].value;
            Constants.DefaultNumPredators = objArr[1].value;
            Constants.DefaultNumObstacles = objArr[2].value;
            Constants.DefaultNumIterations = objArr[3].value;
        
    }

    //виведення даних на екран
    static displayStats(Ocean, doc) {

        const objArr = doc.querySelectorAll('.streaming-data');

        objArr[0].innerHTML = `Prey: ${Ocean.NumPrey}`
        objArr[1].innerHTML = `Predator: ${Ocean.getNumPredators()}`
        objArr[2].innerHTML = `Obstacle: ${Ocean.getNumObst()}`
        objArr[3].innerHTML = `Iteration: ${Ocean.getIter() + 1}`

    }

    static gameOver(doc){
        doc.querySelector('.gameOver').style.visibility = 'visible';
    }
}