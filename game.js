var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

console.log(canvas.width);

canvas.width = 500;
canvas.height = 500;

function Fruit(x, y, spd) {
  this.x = x;
  this.y = y;
  this.spd = spd;

  this.draw = function() {

  };

  this.update = function() {

  };
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
}