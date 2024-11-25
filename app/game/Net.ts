class Net {
    draw(ctx: CanvasRenderingContext2D, canvasHeight: number, canvasWidth: number) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]); // Dotted line effect
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.stroke();
      ctx.setLineDash([]); // Reset the dashed effect
    }
  }
  
  export default Net;
  