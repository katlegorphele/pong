import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { CollisionManager } from './CollisionManager';

export enum GameState {
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER,
}

export class Game {
  private ball: Ball;
  private playerPaddle: Paddle;
  private aiPaddle: Paddle;
  private collisionManager: CollisionManager;
  private gameState: GameState;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    const paddleWidth = 10;
    const paddleHeight = 100;
    
    this.ball = new Ball(canvas.width / 2, canvas.height / 2, 10);
    this.playerPaddle = new Paddle(50, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, canvas.height);
    this.aiPaddle = new Paddle(canvas.width - 50 - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, canvas.height);
    
    this.collisionManager = new CollisionManager();
    this.gameState = GameState.MENU;
  }

  start(): void {
    this.gameState = GameState.PLAYING;
    this.ball.reset();
  }

  pause(): void {
    this.gameState = this.gameState === GameState.PLAYING ? GameState.PAUSED : GameState.PLAYING;
  }

  update(): void {
    if (this.gameState !== GameState.PLAYING) return;

    this.ball.update();
    this.updateAI();

    // Check collisions
    if (this.collisionManager.checkPaddleCollision(this.ball, this.playerPaddle) ||
        this.collisionManager.checkPaddleCollision(this.ball, this.aiPaddle)) {
      this.ball.reverseX();
    }

    // Check scoring
    const ballBounds = this.ball.getBounds();
    if (ballBounds.x <= 0) {
      this.aiPaddle.incrementScore();
      this.ball.reset();
    } else if (ballBounds.x >= this.canvas!.width) {
      this.playerPaddle.incrementScore();
      this.ball.reset();
    }

    // Check win condition
    if (this.playerPaddle.getScore() >= 11 || this.aiPaddle.getScore() >= 11) {
      this.gameState = GameState.GAME_OVER;
    }
  }

  draw(): void {
    if (!this.ctx || !this.canvas) return;

    // Clear canvas
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw center line
    this.ctx.setLineDash([5, 15]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();

    // Draw game objects
    this.ball.draw(this.ctx);
    this.playerPaddle.draw(this.ctx);
    this.aiPaddle.draw(this.ctx);

    // Draw scores
    this.ctx.font = '32px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.playerPaddle.getScore().toString(), this.canvas.width / 4, 50);
    this.ctx.fillText(this.aiPaddle.getScore().toString(), (this.canvas.width * 3) / 4, 50);
  }

  handleInput(key: string, isKeyDown: boolean): void {
    if (this.gameState !== GameState.PLAYING) return;

    if (isKeyDown) {
      if (key === 'ArrowUp') {
        this.playerPaddle.moveUp();
      } else if (key === 'ArrowDown') {
        this.playerPaddle.moveDown();
      }
    }
  }

  private updateAI(): void {
    const ballBounds = this.ball.getBounds();
    const paddleBounds = this.aiPaddle.getBounds();
    const paddleCenter = paddleBounds.y + paddleBounds.height / 2;
    const ballCenter = ballBounds.y + ballBounds.height / 2;

    if (paddleCenter < ballCenter - 10) {
      this.aiPaddle.moveDown();
    } else if (paddleCenter > ballCenter + 10) {
      this.aiPaddle.moveUp();
    }
  }

  getGameState(): GameState {
    return this.gameState;
  }
}