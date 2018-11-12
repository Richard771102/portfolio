var canvas = document.querySelector('canvas');
console.log('hi');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//c.fillRect(x, y, width, height);
//c.fillStyle-for color
// c.fillStyle = "rgba(255,0,0,0.2)";
// c.fillRect(100, 300, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.2)";
// c.fillRect(200, 400, 100, 100);
// c.fillStyle = "rgba(0,0,255,0.2)";
// c.fillRect(300, 500, 100, 100);

// //line
// c.beginPath();
// //c.moveTo(x, y);
// c.moveTo(50, 300);
// //c.lineTo(x, y);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// //c.stroke();
// //c.strokeStyle-for color
// c.strokeStyle= "#fa34a3";
// c.stroke();

// //Arc/Circle
// //c.arc(x, y, r, startAngle, endAngle, drawCounterClockwise)
// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle= 'blue';
// c.stroke();

// for(var i = 0; i < 300; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var color = ['red', 'blue', 'yellow', 'black', 'grey', 'green', 'orange'];
//     var s = color[Math.floor(Math.random() * color.length)];
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle= s;
//     c.stroke();
// };
//Animation
// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = (Math.random() - 0.5)*8;
// var dy = (Math.random() - 0.5)*8;
// var radius = 30;
var colorArray = [
    "#FF6138",
    "#FFFF9D",
    "#BEEB9F",
    "#79BD8F",
    "#00A388",
  ];

var mouse = {
    x: undefined,
    y: undefined
};

var max = 40;
//var min = 2;

window.addEventListener('mousemove',
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.min = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle= 'blue';
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50)
            {
            if(this.radius < max){
                this.radius += 1;
            }
        }else if(this.radius > this.min){
            this.radius -= 1;
        }

        this.draw();
    }
}

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = (Math.random() - 0.5)*8;
// var dy = (Math.random() - 0.5)*8;
// var radius = 30;

// var circleArray = [];

// for(var i = 0; i < 1000; i++){
//     var radius = Math.random() * 3 + 1;
//     var x = Math.random() * (innerWidth - radius*2) + radius;
//     var y = Math.random() * (innerHeight - radius*2) + radius;
//     var dx = (Math.random() - 0.5)*5;
//     var dy = (Math.random() - 0.5)*5;
//     circleArray.push(new Circle(x, y, dx, dy, radius));
//     //var circle = new Circle(200, 200, 3, 3, 30);
// }

var circleArray = [];
function init(){
    circleArray = [];
    for(var i = 0; i < 1000; i++){
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius*2) + radius;
        var y = Math.random() * (innerHeight - radius*2) + radius;
        var dx = (Math.random() - 0.5)*5;
        var dy = (Math.random() - 0.5)*5;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    //var circle = new Circle(200, 200, 3, 3, 30);
    }   
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    //circle.update();

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

    // c.beginPath();
    // c.arc(x, y, radius,0, Math.PI * 2, false);
    // c.strokeStyle= 'blue';
    // c.stroke();
    
    // if(x + radius > innerWidth || x - radius < 0){
    //     dx = -dx;
    // }
    // if(y + radius > innerHeight || y - radius < 0){
    //     dy = -dy;
    // }
    // x += dx;
    // y += dy;
}

init();

animate();
