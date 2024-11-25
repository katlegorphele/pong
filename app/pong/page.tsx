"use client";

import { useEffect, useRef } from "react";

const PongPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game object properties
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballRadius = 10;

    let leftPaddleY = canvas.height / 2 - paddleHeight / 2; // Initialize left paddle position
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2; // Initialize right paddle position

    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: ballRadius,
      color: "white",
      velocityX: 3,
      velocityY: 3,
    };

    // Drawing functions
    const drawRect = (x: number, y: number, width: number, height: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    };

    const drawCircle = (x: number, y: number, radius: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    const drawNet = () => {
      for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
      }
    };

    // Ball movement and collision detection
    const updateBall = () => {
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // Bounce off top and bottom edges
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY *= -1;
      }

      // Ball collision with left paddle
      if (
        ball.x - ball.radius < paddleWidth &&
        ball.y > leftPaddleY &&
        ball.y < leftPaddleY + paddleHeight
      ) {
        ball.velocityX *= -1;
      }

      // Ball collision with right paddle
      if (
        ball.x + ball.radius > canvas.width - paddleWidth &&
        ball.y > rightPaddleY &&
        ball.y < rightPaddleY + paddleHeight
      ) {
        ball.velocityX *= -1;
      }

      // Reset ball if it goes off the left or right edge
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.velocityX *= -1;
      }
    };

    const renderGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw net
      drawNet();

      // Draw paddles and ball
      drawRect(0, leftPaddleY, paddleWidth, paddleHeight, "white");
      drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, "white");
      drawCircle(ball.x, ball.y, ball.radius, ball.color);

      // Update ball position
      updateBall();
    };

    // Keyboard event listeners for paddle movement
    const handleKeyDown = (event: KeyboardEvent) => {
      const paddleSpeed = 10;

      if (event.key === "w" && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed; // Move left paddle up
      } else if (event.key === "s" && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed; // Move left paddle down
      } else if (event.key === "ArrowUp" && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed; // Move right paddle up
      } else if (event.key === "ArrowDown" && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += paddleSpeed; // Move right paddle down
      }
    };

    // Animation loop
    const gameLoop = () => {
      renderGame();
      requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    gameLoop();

    // Listen for key presses
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PongPage;
