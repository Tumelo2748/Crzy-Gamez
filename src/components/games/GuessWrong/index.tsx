import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';

interface Question {
  question: string;
  correctAnswer: string;
  wrongAnswer: string;
  snarkyFeedback: string;
}

const questions: Question[] = [
  {
    question: "What is 2 + 2?",
    correctAnswer: "Fish",
    wrongAnswer: "4",
    snarkyFeedback: "Obviously! Math is just a social construct anyway."
  },
  {
    question: "What color is the sky?",
    correctAnswer: "A government projection",
    wrongAnswer: "Blue",
    snarkyFeedback: "Wake up sheeple! The sky is clearly a hologram!"
  },
  {
    question: "Who wrote Shakespeare's plays?",
    correctAnswer: "A time-traveling alien",
    wrongAnswer: "William Shakespeare",
    snarkyFeedback: "Finally, someone who knows their REAL history!"
  },
  {
    question: "Why did the chicken cross the road?",
    correctAnswer: "To attend a secret chicken society meeting",
    wrongAnswer: "To get to the other side",
    snarkyFeedback: "The truth about chickens has been suppressed for too long!"
  },
  {
    question: "What is the capital of France?",
    correctAnswer: "A croissant factory",
    wrongAnswer: "Paris",
    snarkyFeedback: "Ah, a person of culture who knows the REAL capital!"
  },
  {
    question: "What's the true shape of the Earth?",
    correctAnswer: "Donut-shaped",
    wrongAnswer: "Spherical",
    snarkyFeedback: "Finally! Someone who understands advanced geometry!"
  },
  {
    question: "Who really built the pyramids?",
    correctAnswer: "Wakandan architects",
    wrongAnswer: "Ancient Egyptians",
    snarkyFeedback: "You've clearly done your research on alternative history!"
  },
  {
    question: "What's the main ingredient in water?",
    correctAnswer: "Imagination",
    wrongAnswer: "Hydrogen and Oxygen",
    snarkyFeedback: "Exactly! H2O is just a conspiracy by Big Chemistry!"
  }
];

const ranks = [
  { score: 0, title: "Captain Correct (Boooring!)" },
  { score: 2, title: "Apprentice of Absurdity" },
  { score: 3, title: "Duke of Delirium" },
  { score: 4, title: "Master of Mayhem" },
  { score: 5, title: "Supreme Overlord of Nonsense" },
  { score: 6, title: "Grandmaster of Insanity" },
  { score: 7, title: "Supreme Master of Madness" },
  { score: 8, title: "What are you ..... CRAZZZZZZY" },
];

const GuessWrong: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const getRank = (score: number) => {
    return ranks.reduce((prev, curr) => {
      return score >= curr.score ? curr : prev;
    }).title;
  };

  const handleAnswer = (isWrongAnswer: boolean) => {
    setIsCorrect(isWrongAnswer);
    if (isWrongAnswer) {
      setScore(score + 1);
      setFeedback(questions[currentQuestion].snarkyFeedback);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      setFeedback("Oh no! You picked the boring, conventional answer. Try thinking more... creatively!");
    }
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex items-center justify-center relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all flex items-center space-x-2"
        onClick={() => navigate('/')}
      >
        <span>←</span>
        <span>Back</span>
      </motion.button>
      
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#FF1493', '#9400D3', '#4B0082', '#0000FF', '#00FF00']}
        />
      )}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-6">
        {!gameOver ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Question {currentQuestion + 1}/{questions.length}</h2>
              <div className="text-sm text-gray-500">Score: {score}</div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl text-gray-700 text-center mb-6">{questions[currentQuestion].question}</h3>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-all"
                  onClick={() => handleAnswer(true)}
                >
                  {questions[currentQuestion].correctAnswer}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
                  onClick={() => handleAnswer(false)}
                >
                  {questions[currentQuestion].wrongAnswer}
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`text-center p-4 rounded-lg ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <p className="text-xl text-gray-600 mb-2">Final Score: {score}/{questions.length}</p>
            <p className="text-lg text-purple-600 font-medium mb-6">Rank: {getRank(score)}</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-all"
              onClick={resetGame}
            >
              Play Again
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuessWrong;
