// race game

// define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// set to true to end game
var end = false;

var score = 0;
var timeRemaining = 100;

// set canvas dimensions
canvas.width = 800;
canvas.height = 200;

var pinkMonster = {
  x: 45,
  y: 45,
  dx: 0.2,
  dy: 0,
  counter: 0,
  frame: 0,
  animationRate: 5,

  img: document.querySelector('.pink-monster-race'),

  draw: function() {
    if (this.frame > 5){
      this.frame = 0;
    }
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    c.drawImage(this.img, 32 * this.frame, 0, 25, 100, this.x, this.y, 40, 160);
    this.counter ++;
    if (this.counter > this.animationRate) {
      this.frame ++;
      this.counter = 0;
    }
  },
  update: function () {

    // update position from velocities
    this.x += this.dx;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

// define pet sprite
var petSprite = {

  x: 50,
  y: 120,
  dx: 0,
  dy: 0,
  counter: 0,
  frame: 0,
  animationRate: 5,

  img: document.querySelector('.pet-sprite-race'),

  draw: function() {
    if (this.frame > 5){
      this.frame = 0;
    }
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    c.drawImage(this.img, 24 * this.frame + (24 * 4), 0, 25, 100, this.x, this.y, 40, 160);
    this.counter ++;
    if (this.counter > this.animationRate) {
      this.frame ++;
      this.counter = 0;
    }
  },
  update: function () {

    // update position from velocities
    this.x += this.dx;
    if (this.dx > 0) {
      this.dx -= 0.01;
    }
    else if (this.dx < 0) {
      this.dx = 0;
    };

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

// define text prompt object
var promptText = {
//   ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);
  x: petSprite.x + 40,
  y: 145,
  dx: 0,
  dy: 0,

  textOptions: ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", " "],
  textChoice: "",
  prompt: "",

  draw: function() {
    c.font = "20px Bookman";
    c.fillText(this.prompt, this.x, this.y);
  },

  update: function () {

    if (this.prompt === "") {
      this.textChoice = this.textOptions[Math.floor(Math.random() * this.textOptions.length)];
      // update prompt from choice
      if (this.textChoice === "ArrowUp") {
        this.prompt = "↑";
      }
      if (this.textChoice === "ArrowDown") {
        this.prompt = "↓";
      }
      if (this.textChoice === "ArrowRight") {
        this.prompt = "→";
      }
      if (this.textChoice === "ArrowLeft") {
        this.prompt = "←";
      }
      if (this.textChoice === " ") {
        this.prompt = "Space!";
      }
    }
    // update position from velocities
    this.x = petSprite.x + 40;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
}

document.addEventListener('keydown', function(event){
  if(!end) {
      if (event.key === promptText.textChoice) {
        promptText.prompt = "";
        petSprite.dx += .25;
      // update score
      score += 1;
      document.getElementById('scoreboard-race').textContent = `Score: ${score}`;
      }
    }
  }
);

function animate() {
  if (!end) {
    requestAnimationFrame(animate);
  }
  c.clearRect(0, 0, innerWidth, innerHeight);
  petSprite.update();
  pinkMonster.update();
  promptText.update();
  c.beginPath();
  c.moveTo(700, 0);
  c.lineTo(700, 200);
  c.strokeStyle = "yellow";
  c.stroke();
  if (end) {
    return;
  }
};


// set timer
var timer = setInterval(function () {
  timeRemaining -= 1;

  document.getElementById('timer-race').textContent = `Time remaining: ${timeRemaining}`;
  

  // when time runs out
  if (timeRemaining === 0) {
    clearInterval(timer);
    end = true;
  }
}, 1000);

animate();