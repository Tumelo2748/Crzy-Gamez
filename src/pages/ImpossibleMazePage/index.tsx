import React from 'react';
import ImpossibleMaze from '../../components/games/ImpossibleMaze';

const ImpossibleMazePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Impossible Maze</h1>
          <p className="text-xl text-white opacity-90">
            Can you escape? (Spoiler: Probably not!)
          </p>
        </div>
        
        <ImpossibleMaze />
      </div>
    </div>
  );
};

export default ImpossibleMazePage;
