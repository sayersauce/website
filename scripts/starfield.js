// Max Sayer
// http://max.lat
// Largely inspired by https://www.youtube.com/watch?v=17WoOqgXsRM

class Star {
    constructor(canvasWidth, canvasHeight) {
        this.spawnWidth = canvasWidth;
        this.spawnHeight = canvasHeight;
        this.radius = 2;

        this.spawn();
    }

    spawn() {
        this.x = this.spawnWidth - (2 * Math.floor(Math.random() * this.spawnWidth));
        this.y = this.spawnHeight - (2 * Math.floor(Math.random() * this.spawnHeight));
        this.z = Math.floor(Math.random() * this.spawnWidth * 1.8);
        this.px = (this.x / this.z) * this.spawnWidth;
        this.py = (this.y / this.z) * this.spawnHeight;
    }

    draw(ctx) {
        this.sx = (this.x / this.z) * this.spawnWidth;
        this.sy = (this.y / this.z) * this.spawnHeight;

        // Draw streaks
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(this.sx, this.sy);
        ctx.stroke();

        this.px = this.sx;
        this.py = this.sy;
    }

    update(speed) {
        this.z -= speed;

        if(this.z < 1 || Math.abs(this.sx) > (this.spawnWidth/2) || Math.abs(this.sy) > (this.spawnHeight/2)) {
            this.spawn();
        }
        
        this.radius = this.spawnWidth / (1.5 * this.z);
    }
}

function init(){
    const canvas = document.getElementById("star-canvas");
    const ctx = document.getElementById("star-canvas").getContext("2d");
    const stars = [];
    const noStars = canvas.width;
    const minSpeed = 4;
    const maxSpeed = 16;

    let speed = minSpeed;

    for(let i = 0; i < noStars; i++){
        stars.push(new Star(canvas.width, canvas.height));
    }

    canvas.addEventListener("mouseenter", () => { speed = maxSpeed; });
    canvas.addEventListener("mouseout", () => { speed = minSpeed; });

    setInterval(() => { loop(ctx, stars, speed); }, 1000/60);
}

function loop(ctx, stars, speed){
    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Stars
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
    stars.forEach(element => {
        element.update(speed);
        element.draw(ctx);
    });
    ctx.resetTransform();
}

init();
