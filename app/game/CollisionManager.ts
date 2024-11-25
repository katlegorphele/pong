import { Ball } from './Ball';
import { Paddle } from './Paddle';

export class CollisionManager {
  checkPaddleCollision(ball: Ball, paddle: Paddle): boolean {
    const ballBounds = ball.getBounds();
    const paddleBounds = paddle.getBounds();

    return (
      ballBounds.x < paddleBounds.x + paddleBounds.width &&
      ballBounds.x + ballBounds.width > paddleBounds.x &&
      ballBounds.y < paddleBounds.y + paddleBounds.height &&
      ballBounds.y + ballBounds.height > paddleBounds.y
    );
  }
}