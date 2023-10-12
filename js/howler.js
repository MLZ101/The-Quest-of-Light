

export class Howler {
    constructor(playerObject, speed, hits) {
        this.hits = hits;
        this.playerObject = playerObject;
        this.howlerDirection = (Math.random() > 0.5)? 1: -1;
        this.speed = speed;
        if(this.howlerDirection === -1){
            this.x = 500;
            this.y=90;
        } else{
            this.x=0;
            this.y=90;
        }
        if (this.hits>0) this.update();
    }



    update() {
        this.x += this.speed * this.howlerDirection;

        if(this.hits === 0){
            this.playerObject.display = "none";
            this.x = 0;
            this.y = 0;
        }


        if (this.x > 520 || this.x < 0){
            this.playerObject.style.transform = `scaleX(${this.howlerDirection})`;
            this.howlerDirection *= -1;
        }
            

        this.updatePlayerPosition();
        requestAnimationFrame(this.update.bind(this));
    }

    updatePlayerPosition() {
        this.playerObject.style.left = this.x + 'px';
        this.playerObject.style.bottom = this.y + 'px';
    }
}
