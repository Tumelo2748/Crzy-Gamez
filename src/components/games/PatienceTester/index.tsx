import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const mockingMessages = [
  "Take a break, it's only a game... or is it?",
  "Your patience is admirable, but futile",
  "Loading... just kidding!",
  "Error 404: Patience not found",
  "Have you tried turning it off and... waiting?",
  "Loading might take a while. Like, forever.",
  "Pro tip: Staring won't make it go faster",
  "Time is relative. This is relatively slow.",
];

const PatienceTester: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [level, setLevel] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const holdTimeout = useRef<number | null>(null);
  const progressInterval = useRef<number | null>(null);

  const showRandomMessage = () => {
    const msg = mockingMessages[Math.floor(Math.random() * mockingMessages.length)];
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
  };

  const resetProgress = () => {
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const startProgress = () => {
    resetProgress();
    let currentProgress = 0;
    
    progressInterval.current = window.setInterval(() => {
      currentProgress += Math.random() * 1;
      
      // Random events
      if (Math.random() < 0.1) {
        currentProgress -= Math.random() * 3;
      }
      if (Math.random() < 0.01) {
        setShowLockScreen(true);
        setTimeout(() => setShowLockScreen(false), 4000);
      }
      if (Math.random() < 0.15) {
        showRandomMessage();
      }
      
      currentProgress = Math.max(0, Math.min(currentProgress, 99.9));
      
      if (currentProgress > 99 && Math.random() < 0.5 + (level * 0.1)) {
        currentProgress = 99.9;
      }
      
      setProgress(currentProgress);
    }, 100);
  };

  const handleHoldStart = () => {
    setIsHolding(true);
    setHoldProgress(0);
    
    let currentHoldProgress = 0;
    holdTimeout.current = window.setInterval(() => {
      currentHoldProgress += 1;
      if (currentHoldProgress <= 100) {
        setHoldProgress(currentHoldProgress);
      } else {
        if (holdTimeout.current) {
          clearInterval(holdTimeout.current);
        }
        setLevel(prev => prev + 1);
        setIsHolding(false);
        startProgress();
      }
    }, 100);
  };

  const handleHoldEnd = () => {
    if (holdTimeout.current) {
      clearInterval(holdTimeout.current);
    }
    setIsHolding(false);
    setHoldProgress(0);
    setAttempts(prev => prev + 1);
    showRandomMessage();
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (holdTimeout.current) clearInterval(holdTimeout.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex flex-col items-center justify-center relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all flex items-center space-x-2"
        onClick={() => navigate('/')}
      >
        <span>←</span>
        <span>Back</span>
      </motion.button>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Level {level}</h2>
          <p className="text-lg opacity-80">Failed Attempts: {attempts}</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-white text-sm">
              <span>Progress</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="h-4 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 30 }}
              />
            </div>
          </div>

          <motion.button
            className={`w-full py-4 rounded-lg font-medium text-white transition-all ${
              isHolding ? 'bg-green-500' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
            }`}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
          >
            {isHolding ? `Hold for ${((100 - holdProgress) / 10).toFixed(1)} more seconds` : "Hold to Progress"}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg text-lg"
          >
            {message}
          </motion.div>
        )}

        {showLockScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <div className="text-center text-white space-y-4">
              <h3 className="text-2xl font-bold">Screen Locked</h3>
              <p className="text-lg opacity-80">Take a break, you've earned it!</p>
              <p className="text-sm opacity-60">(or have you?)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatienceTester;
