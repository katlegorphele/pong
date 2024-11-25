import { GameObject } from "./gameObject";

export class Paddle extends GameObject {
  private speed: number;
  private maxY: number;
  private score: number = 0;

  constructor(x: number, y: number, width: number, height: number, maxY: number) {
    super(x, y, width, height);
    this.speed = 7;
    this.maxY = maxY;
  }

  moveUp(): void {
    this.y = Math.max(0, this.y - this.speed);
  }

  moveDown(): void {
    this.y = Math.min(this.maxY - this.height, this.y + this.speed);
  }

  incrementScore(): void {
    this.score++;
  }

  getScore(): number {
    return this.score;
  }

  update(): void {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
