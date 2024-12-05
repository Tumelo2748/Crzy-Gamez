import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UncatchableButton } from './UncatchableButton';
import Confetti from 'react-confetti';

export const UncatchablePage: React.FC = () => {
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  const handleStart = () => {
    setGameStarted(true);
    setTimeElapsed(0);
    setAttempts(0);
    setShowConfetti(false);
  };

  const handleCatch = () => {
    setGameStarted(false);
    if (!bestTime || timeElapsed < bestTime) {
      setBestTime(timeElapsed);
    }
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyDescription = (diff: 'easy' | 'medium' | 'hard') => {
    switch (diff) {
      case 'easy':
        return "Slower movement, predictable patterns";
      case 'medium':
        return "Faster movement, occasional tricks";
      case 'hard':
        return "Chaotic movement, teleports, mind games!";
    }
  };

  const getDifficultyEmoji = (diff: 'easy' | 'medium' | 'hard') => {
    switch (diff) {
      case 'easy':
        return "🎯";
      case 'medium':
        return "🏃‍♂️";
      case 'hard':
        return "👻";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      <Link 
        to="/" 
        className="fixed top-4 left-4 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
        Back to Games
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 text-transparent bg-clip-text">
            Catch Me If You Can!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {isMobile ? "Swipe and tap to catch the button! 📱" : "Think you're quick enough? Try to click the button! 🏃‍♂️"}
          </p>
          {!gameStarted && !showConfetti && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`px-6 py-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
                      difficulty === diff
                        ? `bg-gradient-to-r ${
                            diff === 'easy'
                              ? 'from-green-500 to-green-600'
                              : diff === 'medium'
                              ? 'from-yellow-500 to-orange-500'
                              : 'from-red-500 to-purple-500'
                          } text-white shadow-lg`
                        : `bg-white/90 backdrop-blur-sm ${
                            diff === 'easy'
                              ? 'text-green-600 hover:bg-green-50'
                              : diff === 'medium'
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-red-600 hover:bg-red-50'
                          }`
                    }`}
                  >
                    <div className="text-2xl mb-2">{getDifficultyEmoji(diff)}</div>
                    <div className="font-bold capitalize mb-1">{diff}</div>
                    <div className="text-xs opacity-90">{getDifficultyDescription(diff)}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleStart}
                className={`px-8 py-3 bg-gradient-to-r text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-300 ${
                  difficulty === 'easy'
                    ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    : difficulty === 'medium'
                    ? 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                    : 'from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600'
                }`}
              >
                Start {difficulty} Mode
              </button>
            </div>
          )}
        </div>

        {gameStarted && (
          <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4 flex justify-between items-center">
                <div className="text-white">
                  <p className="text-sm font-medium opacity-90">Time</p>
                  <p className="text-2xl font-bold">{formatTime(timeElapsed)}</p>
                </div>
                <div className="text-white text-right">
                  <p className="text-sm font-medium opacity-90">Best Time</p>
                  <p className="text-2xl font-bold">
                    {bestTime ? formatTime(bestTime) : '--:--'}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
                    <span className="mr-2">{getDifficultyEmoji(difficulty)}</span>
                    <span className="font-medium capitalize">{difficulty} Mode</span>
                  </div>
                </div>
                <UncatchableButton 
                  text={`${isMobile ? "Catch me! " : "Click Me! "}${getDifficultyEmoji(difficulty)}`}
                  containerClassName={`h-[300px] rounded-xl relative touch-none ${
                    difficulty === 'hard' ? 'bg-gradient-to-br from-red-50 to-purple-50' : 'bg-gray-50'
                  }`}
                  className={`bg-gradient-to-r px-8 py-3 text-lg font-medium shadow-lg ${
                    difficulty === 'easy'
                      ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      : difficulty === 'medium'
                      ? 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                      : 'from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600'
                  }`}
                  evasionDistance={isMobile ? 60 : 80}
                  triggerDistance={isMobile ? 100 : 120}
                  difficulty={difficulty}
                  onCatch={handleCatch}
                />
              </div>
            </div>
          </>
        )}

        {showConfetti && (
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 {difficulty === 'hard' ? 'INCREDIBLE!' : 'Great Catch!'} 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              {difficulty} mode completed in {formatTime(timeElapsed)}
              {bestTime === timeElapsed && " (New Best Time!)"}
            </p>
            <div className="space-y-4">
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-gradient-to-r text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-300"
              >
                Play Again
              </button>
              {difficulty !== 'hard' && (
                <p className="text-gray-600">
                  Ready for a bigger challenge? Try {difficulty === 'easy' ? 'medium' : 'hard'} mode!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
