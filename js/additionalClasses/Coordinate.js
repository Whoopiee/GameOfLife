module.exports = {

    Coordinate: class Coordinate {
        constructor(aX = 0, aY = 0) {
            this.x = aX;
            this.y = aY;
        }

        //встановлення координат з координат заданого об'єкту
        setXYfromObj(obj) {
            this.x = obj.x;
            this.y = obj.y;
        }

        //геттери та сеттери координат
        getX() {
            return this.x;
        }

        getY() {
            return this.y;
        }

        //setters
        setX(aX) {
            this.x = aX;
        }

        setY(aY) {
            this.y = aY;
        }

        //перевірка рівності об'єктів координат
        equalXY(obj) {
            return (this.x == obj.x && this.y == obj.y);
        }

        //перевірка нерівності об'єктів координат
        notEqualXY(obj) {
            return (this.x != obj.x || this.y != obj.y);
        }

    }


}