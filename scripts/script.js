var sex = document.getElementById("score");
var audio = document.getElementById("gfm");
var car = document.querySelector(".car");
var obs = document.querySelector(".obs");
var road = document.querySelector(".road");

var leftPressed = false;
var rightPressed = false;

var score = 0;
var xPos = 0;
var xVel = 0;
var yVel = 4;


const xSpeed = .2;
const maxXVel = 5;
const roadWidth = 15;

document.addEventListener('keydown', (e) => {
    if (e.key === "a") {
        leftPressed = true;
        console.log("left"+ xVel + " "+xPos);
    } else if (e.key === "d") {
        rightPressed = true;
        console.log("right"+xVel+" "+xPos);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === "a") {
        leftPressed = false;
        console.log("leftRel");
    } else if (e.key === "d") {
        rightPressed = false;
        console.log("rightRel");
    }
});

obs.addEventListener('animationiteration', () => {
    score++;
    yVel -= yVel * .05;
    yVel = Math.max(yVel, 2);
    const x = Math.random() * 30;
    obs.style.left = (x+30) + '%';
    obs.style.animationDuration = yVel + 's'; 
    road.style.animationDuration = yVel + 's'; 
})

function gameLoop() {
    if (leftPressed) {
        xVel -= xSpeed;
    } else if (rightPressed) {
        xVel += xSpeed;
    } else {
        xVel = xVel * .85;
    }
    xVel = Math.min(xVel, maxXVel);
    xVel = Math.max(xVel, -maxXVel);

    xPos += xVel;
    xPos = Math.max(xPos, -roadWidth);
    xPos = Math.min(xPos, roadWidth);
    
    // car.style.transform = "rotate("+ Math.atan(yVel/xVel) * 180/Math.PI + ")";
    car.style.left = (xPos + 50)+ '%';

    if (collides()) gameOver();
}

function collides() {
    const carBox = car.getBoundingClientRect();
    const obsBox = obs.getBoundingClientRect();

    return (
        carBox.top < obsBox.bottom &&
        carBox.right > obsBox.left &&
        carBox.left < obsBox.right &&
        carBox.bottom > obsBox.top 
    );
}

function gameOver() {
    saveScore();
    score = 0;
    xPos = 0;
    xVel = 0;
    yVel = 4;
    alert("Game over. High Score: "+ localStorage.getItem("highScore"));
}

setInterval(gameLoop, 33);

function saveScore() {
    const highScore = localStorage.getItem("highScore");
    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }
}
