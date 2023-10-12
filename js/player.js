var isUp = false;
var isRight = false;
var isLeft = false;


let jumpSound = new Audio("./assets/jump.mp3");


export class Player {
    constructor(playerObject) {
        this.playerObject = playerObject;
        this.x = 250;
        this.y = 100;
        this.jumpVelocity = 0;
        this.isJumping = false;
        this.speed = 5;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.update();
    }

    handleKeyDown(event) {
        switch(event.key){
        case 'ArrowUp':
            isUp = true;
            break;
        case 'ArrowRight':
            isRight = true;
            break;
         case 'ArrowLeft':
            isLeft = true; 
            break;
        }
        
        if (isUp && !this.isJumping) {
            jumpSound.play();
            this.jump();
        }
    }

    handleKeyUp(event) {
        switch(event.key){
            case 'ArrowUp':
                isUp = false;
                break;
            case 'ArrowRight':
                isRight = false;
                break;
             case 'ArrowLeft':
                isLeft = false; 
                break;
            }
    }

    jump() {
        this.isJumping = true;
        this.jumpVelocity = 15;
    }

    update() {
        if(window.healthCounter <= 0){
            isUp = false;
            isRight = false;
            isLeft = false;
            this.isJumping = false;
            this.playerObject.style.display = "none";
            this.x = 100;
            this.y = 0;
        }

        if (isRight) {
            this.x += this.speed;
        }
        if (isLeft) {
            this.x -= this.speed;
        }
        if (this.isJumping) {
            this.y += this.jumpVelocity;
            this.jumpVelocity -= 1;
            if (this.y <= 100) {
                this.y = 100;
                this.isJumping = false;
            }
        }

        if (this.x > 562) this.x = 562;
        if (this.x < 0) this.x = 0;

        this.updatePlayerPosition();
        requestAnimationFrame(this.update.bind(this));
    }

    updatePlayerPosition() {
        this.playerObject.style.left = this.x + 'px';
        this.playerObject.style.bottom = this.y + 'px';
    }
}
