//step1 環境設定
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

//step2 設立變數
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = [
    '#F23C50',
	'#FFCB05',
	'#E9F1DF',
    '#4AD9D9',
    '#36B1BF'
];

var gravity = 2;
var friction = 0.78;

//step3 Eventlistener
addEventListener("mousemove", function(event){
  mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
  init();
});

addEventListener("click", function(event) {
	init();
});

// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

//step4
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    
    this.update = function(){
        if(this.y + this.radius + this.dy> canvas.height)
        {
            this.dy = -this.dy * friction;
        }else{
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius  <= 0){
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
  
    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.stroke();
      c.closePath();
    };  
}


// Implementation
var ball;
var ballArray;
function init() {
    ballArray = [];
    for(i = 0; i < 300; i++){
        var radius = randomIntFromRange(8, 30);
        var x = randomIntFromRange(radius, canvas.width);
        var y = randomIntFromRange(radius, canvas.height - radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors)
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
    //ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, canvas.width, canvas.height)
    for(i = 0; i< ballArray.length; i++){
        ballArray[i].update();
    }
}

init()
animate()