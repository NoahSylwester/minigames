// fruit catcher game

// define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// set to true to end game
var end = false;

var score = 0;
var timeRemaining = 30;
var fruitAppearanceRate = .95; // fruit appears (100 - fruitAppearanceRate) percent of frames

// build an array of possible fruits
var possibleFruits = document.querySelectorAll('.fruit');

// set canvas dimensions
canvas.width = 500;
canvas.height = 500;

// establish key direction variables to store user input
var isRight = false;
var isLeft = false;
var isJump = false;

// define player sprite object
var playerSprite = {
  x: 250,
  y: 467,
  dy: 0,

  animationRate: 5,
  // define animation state
  animationState: {
    // jogging is default mode
      counter: 0,
      frame: 0,
      lastFrame: 5,
      spriteSheetOffset: 4
  },
  // define all possible animation states
  animationModes: {
    standing: {
      counter: 0,
      frame: 0,
      lastFrame: 4,
      spriteSheetOffset: 0
    },
    jogging: {
      counter: 0,
      frame: 0,
      lastFrame: 5,
      spriteSheetOffset: 4
    },
    jumping: {
      counter: 0,
      frame: 0,
      lastFrame: 2,
      spriteSheetOffset: 10
    }
  }, 

  img: document.querySelector('.player-sprite-fruit'),
  draw: function() {

    // move from user input
    if (isRight === true && this.x < canvas.width - 30) {
      this.x += 5;
    };
    if (isLeft === true && this.x > -6) {
      this.x -= 5;
    };
    if (isJump === true && this.y === 467) {
      this.dy = 10;
    };
    // update y from dy
    this.y -= this.dy;
    // establish ground
    if (this.y > 467) {
      this.y = 467;
    }
    // establish gravity
    else if (this.y < 467) {
      this.dy -= 1;
    }

    // define conditions for each animation state
    if (isJump) {
      this.animationState = this.animationModes.jumping;
    }
    else if (!isRight && !isLeft) {
      this.animationState = this.animationModes.standing;
    }
    else {
      this.animationState = this.animationModes.jogging;
    }
    // execute sprite animations
    if (this.animationState.frame > this.animationState.lastFrame) {
      this.animationState.frame = 0;
    }
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    c.drawImage(this.img, 24 * this.animationState.frame + (24 * this.animationState.spriteSheetOffset), 0, 25, 100, this.x, this.y, 40, 160);
    this.animationState.counter ++;
    if (this.animationState.counter > this.animationRate) {
      this.animationState.frame ++;
      this.animationState.counter = 0;
    }
  },
  update: function () {

  }
};

// define fruit constructor function
function Fruit(x, y, spd) {
  // set fruit stats
  this.x = x;
  this.y = y;
  this.show = true;
  this.spd = spd;
  this.img = possibleFruits[Math.floor(Math.random() * possibleFruits.length)];

  // draw img
  this.draw = function () {
    if (this.show)
      c.drawImage(this.img, this.x, this.y, 20, 20)
  };

  // update stats
  this.update = function () {
    // update position
    this.y += this.spd;

    // delete fruit when it hits ground
    if (this.y > 500) {

      // fruitsArray.splice(fruitsArray.indexOf(this), 1);
      this.show = false;
    }
    // if player catches fruit
    else if (this.y > playerSprite.y - 20 &&
      this.y < playerSprite.y + 30 &&
      this.x < playerSprite.x + 30 &&
      this.x > playerSprite.x - 10) {
      if (this.show) score += 1;
      this.show = false;
      document.getElementById('scoreboard-fruit').textContent = `Score: ${score}`;

    }

    // redraw
    this.draw();
  };
}

function generateFruit() {
  // determine frequency of fruit appearance
  if (Math.random() > fruitAppearanceRate) {
    // determine fruit stats, include in array
    fruitsArray.push(new Fruit((Math.random() * 480), -5, 2));
  }
  // update fruits in array
  for (let i = 0; i < fruitsArray.length; i++) {
    fruitsArray[i].update();
  }
}

var fruitsArray = [];

// interactivity
document.addEventListener("keydown", function (event) {
  // log key-downs
  if (event.key === "ArrowRight") {
    isRight = true;
  }
  if (event.key === "ArrowLeft") {
    isLeft = true;
  }
  if (event.key === "ArrowUp") {
    isJump = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowRight") {
    isRight = false;
  }
  if (event.key === "ArrowLeft") {
    isLeft = false;
  }
  if (event.key === "ArrowUp" && isJump === true) {
    isJump = false;
  }
});

// define animation function
function animate() {
  if (!end) {
    requestAnimationFrame(animate);
  }
  c.clearRect(0, 0, innerWidth, innerHeight);
  generateFruit();
  playerSprite.draw();
  if (end) {
    return;
  }
}

// set timer
var timer = setInterval(function () {
  timeRemaining -= 1;

  document.getElementById('timer-fruit').textContent = `Time remaining: ${timeRemaining}`;
  

  // when time runs out
  if (timeRemaining === 0) {
    clearInterval(timer);
    end = true;
  }
}, 1000);

// call functions
animate();
