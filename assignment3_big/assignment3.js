//Create the canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 536;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";

var bugReady = false;
var bugImage = new Image();

bugImage.onload = function () {
    bugReady = true;
}
bugImage.src = "images/ladybug.png"


//score 

var score = 0;

var hoppingInterval = 3500;

var bugMovement = setInterval(function () {
    resetLocation();
}, hoppingInterval);

var bug = {
    speed: 300
}

//Mouse clicks

canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
    e.preventDefault();
    var x = e.clientX;
    var y = e.clientY;

    if (x > bug.x && x < bug.x + 35 && y > bug.y && y < bug.y + 205) {
        score += 100;
        resetLocation();

        if (hoppingInterval - 50 >= 100) {
            clearInterval(bugMovement);
            hoppingInterval -= 50;
            bugMovement = setInterval(function () {
                resetLocation();
            }, hoppingInterval)
        }
    }
}

//resets the bug after click
var resetLocation = function () {
    bug.x = Math.random() * (canvas.width - 32);
    bug.y = Math.random() * (canvas.height - 32);
};

//reset hop

var resetSpeed = function () {
    clearInterval(bugMovement);
    hoppingInterval = 1000;
    bugMovement = setInterval(function () {
        resetLocation();
    }, hoppingInterval);
};

var resetScore = function () {
    score = 0;

    resetSpeed();
}

//renders the game

var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0,);
    }

    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }

    ctx.fillStyle = "rbg(0, 0, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = "Score: " + score;
};


var main = function () {
    render();

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

main();