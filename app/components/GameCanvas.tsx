'use client';

import React, { useEffect, useRef } from 'react';
import { Game,GameState } from '../game/Game';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set canvas size
    canvasRef.current.width = 800;
    canvasRef.current.height = 600;

    // Initialize game
    gameRef.current = new Game(canvasRef.current);

    // Start game loop
    let animationFrameId: number;
    const gameLoop = () => {
      if (!gameRef.current) return;

      gameRef.current.update();
      gameRef.current.draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        if (gameRef.current?.getGameState() === GameState.MENU) {
          gameRef.current?.start();
        } else {
          gameRef.current?.pause();
        }
      } else {
        gameRef.current?.handleInput(e.key, true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameRef.current?.handleInput(e.key, false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Start the game loop
    animationFrameId = requestAnimationFrame(gameLoop);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <canvas
        ref={canvasRef}
        className="border-4 border-white rounded-lg"
        style={{ backgroundColor: 'black' }}
      />
    </div>
  );
};
