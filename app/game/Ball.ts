class Ball {
    x: number;
    y: number;
    radius: number;
    velocityX: number;
    velocityY: number;

    constructor(x: number, y: number, radius: number, velocityX:number, velocityY: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(paddle : {y: number; height: number; width: number; x: number;}) {
        if (
            this.x - this.radius < paddle.x + paddle.width &&
            this.x + this.radius > paddle.x &&
            this.y + this.radius > paddle.y &&
            this.y - this.radius < paddle.y + paddle.height
        ) {
            this.velocityX = -this.velocityX //Bounce ball in opposite direction
        }
    }

    checkWallCollision(canvasHeight: number) {
        if (this.y - this.radius <=0 || this.y + this.radius >= canvasHeight)
            {this.velocityY = -this.velocityY;}
    }
}

export default Ball;