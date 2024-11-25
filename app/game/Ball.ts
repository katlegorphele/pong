import { GameObject } from "./gameObject";

export class Ball extends GameObject {
    private velocityX: number = 0;
    private velocityY: number = 0;
    private speed: number;
    private maxSpeed: number;
  
    constructor(x: number, y: number, size: number) {
      super(x, y, size, size);
      this.speed = 5;
      this.maxSpeed = 15;
      this.reset();
    }
  
    reset(): void {
      this.x = window.innerWidth / 2;
      this.y = window.innerHeight / 2;
      this.speed = 5;
      const angle = (Math.random() * Math.PI / 4) - Math.PI / 8;
      this.velocityX = this.speed * (Math.random() < 0.5 ? 1 : -1);
      this.velocityY = this.speed * Math.sin(angle);
    }
  
    update(): void {
      this.x += this.velocityX;
      this.y += this.velocityY;
  
      // Bounce off top and bottom
      if (this.y <= 0 || this.y + this.height >= window.innerHeight) {
        this.velocityY *= -1;
      }
    }
  
    reverseX(): void {
      this.velocityX *= -1;
      // Increase speed with each paddle hit
      this.speed = Math.min(this.speed + 0.5, this.maxSpeed);
      this.velocityX = this.velocityX > 0 ? this.speed : -this.speed;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    }
  }