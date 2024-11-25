import React from 'react';

export const GameControls: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-bold mb-2">Controls</h3>
        <p>Space: Start/Pause</p>
        <p>↑/↓: Move Paddle</p>
      </div>
    </div>
  );
};