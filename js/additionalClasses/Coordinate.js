module.exports = {

    Coordinate: class Coordinate{
        constructor(aX = 0, aY = 0){
            this.x = aX;
            this.y = aY;
        }

        setXYfromObj(obj){
            this.x = obj.x;
            this.y = obj.y;
        }

        //geters
        getX(){
            return this.x;
        }

        getY(){
            return this.y;
        }

        //setters
        setX(aX){
            this.x = aX;
        }

        setY(aY){
            this.y = aY;
        }

        //  equal/not equal
        equalXY(obj){
            return (this.x == obj.x && this.y == obj.y);
        }

        notEqualXY(obj){
            return (this.x != obj.x || this.y != obj.y);
        }

    }


}