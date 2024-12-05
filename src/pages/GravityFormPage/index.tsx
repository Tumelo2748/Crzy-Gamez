import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BackButton } from '../../components/ui/BackButton';
import { soundManager } from '../../utils/sound';

interface FormField {
  id: string;
  label: string;
  value: string;
  isActive: boolean;
  position: { x: number; y: number };
}

const TROPHIES = [
  '🏆 Master of Gravity',
  '🎯 Precision Clicker',
  '🚀 Anti-Gravity Champion',
  '🎮 Form Warrior',
  '🌟 Gravity Defier',
];

const FALLEN_MESSAGES = [
  "Oops! Your inputs are having too much fun in space! 🚀",
  "Houston, we have a problem... Your inputs are floating away! 🛸",
  "Looks like your form fields went skydiving without a parachute! 🪂",
  "Your inputs decided to take a gravity vacation! 🏖️",
  "Form fields: 'Weeeee! Can't catch us!' 😜",
  "Breaking news: Local form fields defy gravity! 📰",
  "Your inputs joined the space force! 👨‍🚀",
];

const GravityFormPage: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([
    { id: 'name', label: 'Name', value: '', isActive: true, position: { x: 0, y: 0 } },
    { id: 'email', label: 'Email', value: '', isActive: true, position: { x: 0, y: 0 } },
    { id: 'message', label: 'Message', value: '', isActive: true, position: { x: 0, y: 0 } },
  ]);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showTrophy, setShowTrophy] = useState(false);
  const [trophy, setTrophy] = useState('');
  const [showWhereDidItGo, setShowWhereDidItGo] = useState(false);
  const [showFallenMessage, setShowFallenMessage] = useState(false);
  const [fallenMessage, setFallenMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Handle input change and reset field activity
  const handleInputChange = (id: string, value: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, value, isActive: true } : field
    ));
  };

  // Make fields fall after inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      const hasInactiveFields = fields.some(field => field.value === '');
      
      if (hasInactiveFields) {
        setShowWhereDidItGo(true);
        soundManager.play('whoosh');
        setTimeout(() => {
          setShowWhereDidItGo(false);
          soundManager.play('fall');
        }, 2000);
      }
      
      setFields(fields.map(field => ({
        ...field,
        isActive: field.value !== '',
        position: field.value === '' ? {
          x: (Math.random() * (isMobile ? 100 : 500)) - (isMobile ? 50 : 250),
          y: Math.min(window.innerHeight, 600)
        } : field.position
      })));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [fields]);

  // Animate submit button
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const containerBounds = containerRef.current.getBoundingClientRect();
        const maxX = Math.min(containerBounds.width - 120, 200); // Limit movement range on mobile
        const maxY = 30; // Reduce vertical movement
        setButtonPosition({
          x: Math.random() * maxX,
          y: Math.sin(Date.now() / 1000) * maxY
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fallenFields = fields.filter(field => !field.isActive);
    
    if (fallenFields.length > 0) {
      const randomMessage = FALLEN_MESSAGES[Math.floor(Math.random() * FALLEN_MESSAGES.length)];
      setFallenMessage(randomMessage);
      setShowFallenMessage(true);
      soundManager.play('message');
      setTimeout(() => setShowFallenMessage(false), 3000);
      return;
    }

    if (fields.every(field => field.value)) {
      setTrophy(TROPHIES[Math.floor(Math.random() * TROPHIES.length)]);
      setShowTrophy(true);
      soundManager.play('success');
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        transition: { duration: 1 }
      });
    }
  };

  const resetGame = () => {
    setFields([
      { id: 'name', label: 'Name', value: '', isActive: true, position: { x: 0, y: 0 } },
      { id: 'email', label: 'Email', value: '', isActive: true, position: { x: 0, y: 0 } },
      { id: 'message', label: 'Message', value: '', isActive: true, position: { x: 0, y: 0 } },
    ]);
    setShowTrophy(false);
    setShowWhereDidItGo(false);
    soundManager.resetPlayedSounds();
    soundManager.play('pop');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center px-4">
            <BackButton to="/" />
            <div className="flex gap-2">
              <button
                onClick={() => soundManager.toggleMute()}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
                title={soundManager.isSoundMuted() ? "Unmute sounds" : "Mute sounds"}
              >
                {soundManager.isSoundMuted() ? "🔇" : "🔊"}
              </button>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
              >
                🔄 Restart
              </button>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center mt-4 px-4">Gravity Form Challenge</h1>
          <p className="text-center mt-2 px-4">Can you submit the form before it falls apart? 🎮</p>
        </div>

        <div ref={containerRef} className="relative max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-4 sm:p-8 overflow-hidden touch-none">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {fields.map((field) => (
              <motion.div
                key={field.id}
                animate={field.isActive ? { x: 0, y: 0 } : field.position}
                transition={{ type: 'spring', damping: 10 }}
                className="relative"
              >
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                <input
                  type={field.id === 'email' ? 'email' : 'text'}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  onFocus={() => handleInputChange(field.id, field.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              animate={buttonPosition}
              transition={{ type: 'spring', damping: 10 }}
              className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-100 touch-none"
            >
              Submit if you can! 😈
            </motion.button>
          </form>
        </div>

        {showFallenMessage && (
          <motion.div
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -50 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white/90 text-purple-800 px-6 py-4 rounded-xl shadow-lg text-lg font-semibold text-center max-w-sm mx-4"
          >
            <div className="text-2xl mb-2">🎪</div>
            {fallenMessage}
          </motion.div>
        )}

        {showWhereDidItGo && (
          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 text-purple-800 px-6 py-3 rounded-full shadow-lg text-lg font-semibold"
          >
            Oh no! Where did it go? 😱
          </motion.div>
        )}

        {showTrophy && (
          <motion.div
            initial={{ scale: 0 }}
            animate={controls}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-center w-[90%] max-w-sm"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Congratulations! 🎉</h2>
            <p className="text-3xl sm:text-4xl mb-4">{trophy}</p>
            <button
              onClick={() => setShowTrophy(false)}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Close
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GravityFormPage;
