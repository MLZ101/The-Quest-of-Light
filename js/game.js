
// other than these comments, missing:
//      winning page
// problem with direction hits


import { Player } from "./player.js";
import { Howler } from "./howler.js";

let colors = ['red', 'orange', 'rgb(163, 163, 3)', 'green', 'blue', 'indigo', 'violet'];
let levelCounter = 0;
const playerElement = document.querySelector(".player");
const howlerElement = document.querySelector(".howler");
const player = new Player(playerElement);                // I initialized all the movements in the constructors
let howler = new Howler(howlerElement, levelCounter+1 , levelCounter+2);        // this should be of variable speed depending on lvl
howlerElement.style.borderTop =`solid ${colors[levelCounter]}`;

const container = document.querySelector(".game-container");
container.style.background = "black";

let health1 = document.getElementById("health1");       // these are styled transparently when hit
let health2 = document.getElementById("health2");
let health3 = document.getElementById("health3");
let health = [health1, health2, health3];
let healthCount = 3;





//  Audio
let audioPlaying = false;
let collideSound = new Audio("./assets/hit.mp3");
let hitSound = new Audio("./assets/hitt.mp3");
let soundtrack = new Audio("./assets/game.mp3");
let soundDiv = document.querySelector(".sound-container")
soundDiv.innerHTML = (audioPlaying)? '🔈':'🔇';

soundDiv.addEventListener("click", ()=>{
    if(audioPlaying){
        soundDiv.innerHTML = "🔇";
        soundtrack.pause();
    }
    else {
        soundDiv.innerHTML = "🔈";
        soundtrack.play();
    }
    audioPlaying = !audioPlaying;
})



// game loop and collisions

function update() {

    window.healthCounter = healthCount;
    
    const playerBoundingBox = {
        x: player.x,
        y: player.y,
        width: 30,
        height: 30
    };


        const howlerBoundingBox = {
            x: howler.x,
            y: howler.y,
            width: 70,
            height: 70
        };

        // Check for collision with the player
        if (isColliding(playerBoundingBox, howlerBoundingBox) && healthCount > 0) {
            console.log("Collide detected");
            player.x += -1 * howler.howlerDirection * 120;
            healthCount--;
            collideSound.play();
            health[healthCount].style.background = "transparent";
    
            if (healthCount === 0) {
                setTimeout(() => {
                    container.innerHTML = `<p style="font-size: larger; margin:1rem">
                    Game Over <br> 
                    Though the Light Did Not Descend... Yet Your Legacy Rises... <br> <br> <br>
                    <span id="retry">&#8635;</span> 
                    </p>`;
                    let retryButton = document.getElementById("retry");
                    retryButton.addEventListener("mouseover", () => {
                        retryButton.style.backgroundColor = "white";
                        retryButton.style.color = "black";
                    });
    
                    retryButton.addEventListener("mouseout", () => {
                        retryButton.style.backgroundColor = "";
                        retryButton.style.color = "";
                    });
    
                    retryButton.addEventListener("click", () => {
                        location.reload();
                    });
                }, 2000);
            }
        }
    
        if (isHitting(playerBoundingBox, howlerBoundingBox) && howler.hits > 0) {
            howler.hits--;
            hitSound.play();
            if (player.y < 220) player.jump();
            console.log("hit");

            if (howler.hits === 0){
                let dot = document.getElementById("dot"+`${levelCounter+1}`)
                dot.style.background = colors[levelCounter]
                container.style.background = `${colors[levelCounter]}`;
                levelCounter ++;
                howler = new Howler(howlerElement, levelCounter+1 , levelCounter+2);
                howlerElement.style.borderTop = `solid ${colors[levelCounter]}`;
                howler.hits = levelCounter +2;
            }
            if(levelCounter == 7){
                setTimeout(() => {
                    container.style.background = "white";
                    container.innerHTML = `<p style="font-size: larger; margin:1rem; color:black;">
                    YOU HAVE DONE IT! <br>
                    Colors unite and Stand as one... For hardships are darkness, and bravery is the Sun!  
                    </p>`;
                }, 10000);

            }
        }
    
        setTimeout(() => {
            requestAnimationFrame(update);
        }, 220);
    }
    
    function isColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height 
        );
    }
    
    function isHitting(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y + rect1.height >= rect2.y
        );
    }
    

if (healthCount > 0)
    update();
