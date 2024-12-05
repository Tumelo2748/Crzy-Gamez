import React from 'react';
import GuessWrong from '../../components/games/GuessWrong';

const GuessWrongPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Guess the Wrong Answer</h1>
          <p className="text-xl text-white opacity-90">
            Where conventional wisdom goes to die! Pick the most absurd answer to win.
          </p>
        </div>
        
        <GuessWrong />
      </div>
    </div>
  );
};

export default GuessWrongPage;
