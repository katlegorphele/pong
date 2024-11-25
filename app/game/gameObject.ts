export abstract class GameObject {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
  
    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    abstract update(): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;
  
    getBounds(): { x: number; y: number; width: number; height: number } {
      return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
  }