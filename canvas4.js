//step 1 環境設定
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
//step 2 設定寬高
canvas.width = innerWidth;
canvas.height = innerHeight;
//step 3 設定滑鼠座標
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
//step 4 設定顏色
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

//step 5 設定事件

addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

//多用途function
function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function randomColor(color){
    return colors[Math.floor(Math.random() * colors.length)];
};
//環境設定結束
//step 6 物件設定
function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromcenter = randomIntFromRange(50, 120);//2d旋轉範圍(大小)
    //this.distanceFromcenter = { 3D 
       // x: randomIntFromRange(50, 120),
        //y: randomIntFromRange(50, 120)
    //}
    this.lastMouse = {x: x, y: y};

    this.update = function(){
        const lastPoint = {
            x: this.x,
            y: this.y
        }

        //Drag effect追蹤效果
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        //move points over time
        this.radians += this.velocity;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromcenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromcenter;//movecircle 使用三角函數
        this.draw(lastPoint);
    };

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    };
};



//物件設定結束
//step 7 執行設定
let particles;
function init(){
    particles = [];

    for(let i = 0; i < 50; i++){
        const radius = (Math.random() * 3) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    };
    console.log(particles);
};

//動畫循環
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 0.1)';//殘影效果
    c.fillRect(0, 0, canvas.width, canvas.height);

    
    particles.forEach(particle => {
        particle.update();
    })
};

init();
animate();