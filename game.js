// fruit catcher game

// define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var score = 0;
var timeRemaining = 30;
var fruitAppearanceRate = .95; // fruit appears (100 - fruitAppearanceRate) percent of frames

// build an array of possible fruits
var possibleFruits = document.querySelectorAll('.fruit');

// set canvas dimensions
canvas.width = 500;
canvas.height = 500;

// establish keyDirection variable to store user input
var keyDirection = "";
var isJump = false;

// define player sprite object
var playerSprite = {
  x: 250,
  y: 479,
  dy: 0,
  img: document.querySelector('.player-sprite'),
  draw: function() {
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

    // move from user input
    if (keyDirection === "ArrowRight" && this.x < canvas.width - 30) {
      this.x += 5;
    };
    if (keyDirection === "ArrowLeft" && this.x > 0) {
      this.x -= 5;
    };
    if (isJump === true && this.y === 479) {
      this.dy = 10;
    };
    this.y -= this.dy;
    if (this.y > 479) {
      this.y = 479;
    }
    if (this.y < 479) {
      this.dy -= 1;
    }

    c.drawImage(this.img, 20, 0, 25, 100, this.x, this.y, 25, 100);
  },
  update: function() {

  }
};

// define fruit constructor function
function Fruit(x, y, spd) {
  // set fruit stats
  this.x = x;
  this.y = y;
  this.spd = spd;
  this.img = possibleFruits[Math.floor(Math.random() * possibleFruits.length)];

  // draw img
  this.draw = function() {
    c.drawImage(this.img, this.x, this.y, 20, 20);
  };

  // update stats
  this.update = function() {
    // update position
    this.y += this.spd;

    // delete fruit when it hits ground
    if (this.y > 500) {
      fruitsArray.splice(fruitsArray[this], 1);
    }
    // if player catches fruit
    else if (this.y > playerSprite.y - 20 &&
            this.y < playerSprite.y + 20 &&
            this.x < playerSprite.x + 20 &&
            this.x > playerSprite.x - 10) {
      fruitsArray.splice(fruitsArray[this], 1);
      document.getElementById('scoreboard').textContent = `Score: ${score}`;
      score += 1;
    }

    // redraw
    this.draw();
  };
}

function generateFruit() {
  // determine frequency of fruit appearance
  if (Math.random() > fruitAppearanceRate) {
    // determine fruit stats, include in array
    fruitsArray.push(new Fruit((Math.random() * 480),5,2));
  }
  // update fruits in array
  for (let i = 0; i < fruitsArray.length; i++) {
    fruitsArray[i].update();
  }
}

var fruitsArray = [];

// interactivity
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight" ||
      event.key === "ArrowLeft"){
    keyDirection = event.key;
  }
  if (event.key === "ArrowUp") {
    isJump = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "ArrowRight" && keyDirection === "ArrowRight" ||
      event.key === "ArrowLeft" && keyDirection === "ArrowLeft") {
    keyDirection = "";
  }
  if (event.key === "ArrowUp" && isJump === true) {
    isJump = false;
  }
});

// define animation function
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  generateFruit();
  playerSprite.draw();
}

// set timer
var timer = setInterval(function() {
  timeRemaining -= 1;
  document.getElementById('timer').textContent = `Time remaining: ${timeRemaining}`;
  if (timeRemaining === 0) {
    clearInterval(timer);
  }
}, 1000);

// call functions
animate();