// chaser game

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
  x: Math.random() * 500,
  y: Math.random() * 500,
  dx: (Math.random() - 0.5) * 1,
  dy: (Math.random() - 0.5) * 1,
  counter: 0,
  frame: 0,
  animationRate: 5,

  img: document.querySelector('.pet-sprite-chaser'),

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

    // add random movement component for unpredictability
    this.dx += (Math.random() - 0.5)/2;
    this.dy += (Math.random() - 0.5)/2;

    // update position from velocities
    this.x += this.dx;
    this.y += this.dy;

    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

document.addEventListener('click', function(event){
  if(!end) {
    // detects position of click relative to sprite
    if (petSprite.x > event.x - 60 && petSprite.x < event.x - 5 &&
        petSprite.y > event.y - 145 && petSprite.y < event.y - 65) {
        // slow down sprite on catch
      if (petSprite.dx < 0) {
        petSprite.dx += 2;
      }
      else if (petSprite.dx > 0) {
        petSprite.dx -= 2;
      }
      if (petSprite.dy < 0) {
        petSprite.dy += 2;
      }
      else if (petSprite.dy > 0) {
        petSprite.dy -= 2;
      }
      // update score
      score += 1;
      document.getElementById('scoreboard-chaser').textContent = `Score: ${score}`;
    }
  }
});

function animate() {
  if (!end) {
    requestAnimationFrame(animate);
  }
  c.clearRect(0, 0, innerWidth, innerHeight);
  petSprite.update();
  if (end) {
    return;
  }
}

// set timer
var timer = setInterval(function () {
  timeRemaining -= 1;

  document.getElementById('timer-chaser').textContent = `Time remaining: ${timeRemaining}`;
  

  // when time runs out
  if (timeRemaining === 0) {
    clearInterval(timer);
    end = true;
  }
}, 1000);

animate();