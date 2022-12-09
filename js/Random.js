const MAX = 32767;

module.exports = {
Random: class Random{
        constructor(){
            this.seed1 = 3797;
            this.seed2 = 2117;
            this.first = true;
        }

        // init(s1, s2){
        //     this.seed1 = s1;
        //     this.seed2 = s2;
        // }

        // randReal(){
        //     let c;

        //     if(this.first){
        //         this.seed1 *= 2;
        //         this.seed2 *= 2;

        //         if(this.seed1>MAX)this.seed1 -= MAX;
        //         if(this.seed2>MAX)this.seed2 -= MAX;

        //         this.first = false;

        //         for(let i = 0; i <= 30; i++)
        //         this.randReal();
        //     }
        //     c = this.seed1 + this.seed2;

        //     if(c > MAX)c-=MAX;
        //     c *= 2;
        //     if(c > MAX)c-=MAX;
        //     this.seed1 = this.seed2;
        //     this.seed2 = c;

        //     return (c / 32767.0);
        // }

        nextIntBetween(min, max){
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        }
    },
    nextIntBetween: function(min, max){
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
};