import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';

// const GRID_SIZE = 10;
// const CELL_SIZE = 40;

interface Position {
  x: number;
  y: number;
}

const mockingMessages = [
  "Wrong again, Einstein!",
  "Not even close!",
  "Are you even trying?",
  "That's cute, you thought that was the way!",
  "Maybe try walking into MORE walls?",
  "Pro tip: The exit isn't here!",
  "Your sense of direction is... unique!",
  "Plot twist: You're going backwards!",
];

const getGridConfig = (width: number) => {
  if (width < 400) return { size: 8, cellSize: 35 };
  if (width < 600) return { size: 9, cellSize: 38 };
  return { size: 10, cellSize: 40 };
};

const ImpossibleMaze: React.FC = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const gridConfig = getGridConfig(width);
  const GRID_SIZE = gridConfig.size;
  const CELL_SIZE = gridConfig.cellSize;

  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [exitPos, setExitPos] = useState<Position>({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 });
  const [walls, setWalls] = useState<boolean[][]>([]);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [rageQuitAttempts, setRageQuitAttempts] = useState(0);
  const [fakeExits, setFakeExits] = useState<Position[]>([]);
  const [touchStartPos, setTouchStartPos] = useState<Position | null>(null);

  useEffect(() => {
    generateMaze();
  }, []);

  const generateMaze = () => {
    const newWalls = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(false).map(() => Math.random() < 0.3)
    );
    
    newWalls[0][0] = false;
    newWalls[playerPos.y][playerPos.x] = false;
    
    const px = playerPos.x;
    const py = playerPos.y;
    if (py > 0) newWalls[py-1][px] = false; 
    if (py < GRID_SIZE-1) newWalls[py+1][px] = false; 
    if (px > 0) newWalls[py][px-1] = false; 
    if (px < GRID_SIZE-1) newWalls[py][px+1] = false; 
    
    const newFakeExits: Position[] = [];
    for (let i = 0; i < 3; i++) {
      let fx: number, fy: number;
      do {
        fx = Math.floor(Math.random() * GRID_SIZE);
        fy = Math.floor(Math.random() * GRID_SIZE);
      } while (
        (Math.abs(fx - playerPos.x) < 2 && Math.abs(fy - playerPos.y) < 2) || 
        newFakeExits.some(exit => exit.x === fx && exit.y === fy) || 
        newWalls[fy][fx] 
      );
      newFakeExits.push({ x: fx, y: fy });
      newWalls[fy][fx] = false; 
    }
    
    setWalls(newWalls);
    setFakeExits(newFakeExits);
  };

  const moveExit = useCallback(() => {
    let newX: number, newY: number;
    do {
      newX = Math.floor(Math.random() * GRID_SIZE);
      newY = Math.floor(Math.random() * GRID_SIZE);
    } while (
      walls[newY][newX] || 
      (newX === playerPos.x && newY === playerPos.y) || 
      fakeExits.some(exit => exit.x === newX && exit.y === newY) 
    );
    setExitPos({ x: newX, y: newY });
  }, [walls, playerPos, fakeExits]);

  const showMockingMessage = (message: string) => {
    setMessage(message);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleMove = (dx: number, dy: number) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) {
      showMockingMessage("The void beckons, but you can't go there!");
      return;
    }

    if (walls[newY][newX]) {
      showMockingMessage(mockingMessages[Math.floor(Math.random() * mockingMessages.length)]);
      return;
    }

    setPlayerPos({ x: newX, y: newY });
    setAttempts(prev => prev + 1);

    if (fakeExits.some(exit => exit.x === newX && exit.y === newY)) {
      showMockingMessage("Just kidding! Not the real exit!");
      generateMaze();
      setRotation(prev => prev + 90);
      return;
    }

    if (Math.random() < 0.2) {
      moveExit();
      showMockingMessage("Oops! Exit got bored and moved!");
    }

    if (Math.random() < 0.15) {
      setRotation(prev => prev + 90);
      showMockingMessage("Getting dizzy yet?");
    }

    if (Math.random() < 0.1) {
      generateMaze();
      showMockingMessage("Walls were feeling adventurous!");
    }
  };

  const handleRageQuit = () => {
    setRageQuitAttempts(prev => prev + 1);
    const messages = [
      "Nice try! But you're stuck here forever!",
      "Rage quitting won't save you!",
      "The maze feeds on your frustration!",
      "That's cute, you thought you could quit?",
      `Failed rage quit attempts: ${rageQuitAttempts + 1}`,
    ];
    showMockingMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    switch (e.key) {
      case 'ArrowUp':
        handleMove(0, -1);
        break;
      case 'ArrowDown':
        handleMove(0, 1);
        break;
      case 'ArrowLeft':
        handleMove(-1, 0);
        break;
      case 'ArrowRight':
        handleMove(1, 0);
        break;
    }
  }, [playerPos, walls]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartPos.x;
    const dy = touch.clientY - touchStartPos.y;
    
    const minSwipeDistance = 30;
    
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
      handleMove(dx > 0 ? 1 : -1, 0);
    } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > minSwipeDistance) {
      handleMove(0, dy > 0 ? 1 : -1);
    }
    
    setTouchStartPos(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex flex-col items-center justify-center relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-4 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all flex items-center space-x-2 text-lg"
        onClick={() => navigate('/')}
      >
        <span>←</span>
        <span>Back</span>
      </motion.button>

      <div className="mb-4 text-white text-xl font-medium">Attempts: {attempts}</div>
      
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 60 }}
        className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-xl backdrop-blur-sm shadow-xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="grid gap-1" 
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            touchAction: 'none' 
          }}
        >
          {walls.map((row, y) => (
            row.map((isWall, x) => (
              <div
                key={`${x}-${y}`}
                className={`rounded-sm transition-colors duration-300 ${
                  isWall ? 'bg-gray-800 shadow-inner' :
                  playerPos.x === x && playerPos.y === y ? 'bg-blue-500 shadow-lg' :
                  exitPos.x === x && exitPos.y === y ? 'bg-green-500 animate-pulse' :
                  fakeExits.some(exit => exit.x === x && exit.y === y) ? 'bg-green-300 animate-pulse' :
                  'bg-white bg-opacity-20'
                }`}
                style={{ 
                  width: CELL_SIZE, 
                  height: CELL_SIZE,
                  WebkitTapHighlightColor: 'transparent' 
                }}
              />
            ))
          ))}
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col items-center space-y-4 w-full max-w-xs">
        <div className="grid grid-cols-3 gap-3 w-full">
          <div />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full h-14 bg-white bg-opacity-20 text-white text-2xl rounded-lg hover:bg-opacity-30 active:bg-opacity-40 transition-all shadow-lg flex items-center justify-center"
            onClick={() => handleMove(0, -1)}
          >
            ↑
          </motion.button>
          <div />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full h-14 bg-white bg-opacity-20 text-white text-2xl rounded-lg hover:bg-opacity-30 active:bg-opacity-40 transition-all shadow-lg flex items-center justify-center"
            onClick={() => handleMove(-1, 0)}
          >
            ←
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full h-14 bg-white bg-opacity-20 text-white text-2xl rounded-lg hover:bg-opacity-30 active:bg-opacity-40 transition-all shadow-lg flex items-center justify-center"
            onClick={() => handleMove(0, 1)}
          >
            ↓
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full h-14 bg-white bg-opacity-20 text-white text-2xl rounded-lg hover:bg-opacity-30 active:bg-opacity-40 transition-all shadow-lg flex items-center justify-center"
            onClick={() => handleMove(1, 0)}
          >
            →
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-600 active:bg-red-700 transition-all shadow-lg"
          onClick={handleRageQuit}
        >
          Rage Quit
        </motion.button>
      </div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-xl text-center max-w-[90vw]"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImpossibleMaze;
