// follow game

// define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// set to true to end game
var end = false;

var score = 0;
var timeRemaining = 30;

// set canvas dimensions
canvas.width = 500;
canvas.height = 500;


// define pet sprite
var petSprite = {
  // initialize random stats
  x: Math.random() * 460,
  y: Math.random() * 450,
  dx: 0,
  dy: 0,
  stamina: 100,
  maxStamina: 100,
  counter: 0,
  frame: 0,
  animationRate: 5,

  img: document.querySelector('.pet-sprite-follow'),

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
  update: function() {

    // bounce off walls
    if (this.x > 465 || this.x < -15) {
      this.dx = -this.dx;
    }
    if (this.y > 468 || this.y < -5) {
      this.dy = -this.dy;
    }

    // move toward cursor
    this.dx = (cursor.x - (this.x + 17))/70;
    this.dy = (cursor.y - (this.y + 20))/70;

    // add random movement component for unpredictability
    // this.dx += (Math.random() - 0.5)/2;
    // this.dy += (Math.random() - 0.5)/2;

    // update position from velocities
    this.x += this.dx;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

var heart = {
  // initialize random stats
  x: Math.random() * 460,
  y: Math.random() * 450,
  counter: 0,
  frame: 1,
  animationRate: 10,

  img: document.querySelector('.heart-sprite-follow3'),

  draw: function() {
    if (this.frame > 3){
      this.frame = 1;
    }
    this.img = document.querySelector(`.heart-sprite-follow${this.frame}`);
    c.drawImage(this.img, this.x, this.y, 15, 15);
    this.counter ++;
    if (this.counter > this.animationRate) {
      this.frame ++;
      this.counter = 0;
    }
  },
  update: function() {
    // update based on player sprite location
    this.x = petSprite.x + 30;
    this.y = petSprite.y;


    // add random movement component for unpredictability
    // this.dx += (Math.random() - 0.5)/2;
    // this.dy += (Math.random() - 0.5)/2;

    // update position from velocities
    // this.x += this.dx;
    // this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
}

var cursor = {
  // initialize random stats
  x: 0,
  y: 0,
  w: 0,
  h: 0,


  draw: function() {
    
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    
    c.beginPath();
    c.rect(this.x, this.y, this.w, this.h);
    c.stroke();
  },

  update: function() {

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

canvas.addEventListener('mousemove', function(event){
  if(!end) {
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
  }
});

function animate() {
  if (!end) {
    requestAnimationFrame(animate);
  }
  c.clearRect(0, 0, innerWidth, innerHeight);
  petSprite.update();
  cursor.update();
  heart.update();
  if (end) {
    return;
  }
}

// set timer
var timer = setInterval(function () {
  timeRemaining -= 1;

  document.getElementById('timer-follow').textContent = `Time remaining: ${timeRemaining}`;
  

  // when time runs out
  if (timeRemaining === 0) {
    clearInterval(timer);
    end = true;
  }
}, 1000);

animate();