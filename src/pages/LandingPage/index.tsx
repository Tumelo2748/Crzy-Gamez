import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface GameCard {
  title: string;
  description: string;
  path: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Chaos' | 'Spicy';
  color: string;
}

const games: GameCard[] = [
  {
    title: 'Profile Page',
    description: 'A profile page with multiplying buttons that create chaos when clicked!',
    path: '/profile',
    emoji: '👤',
    difficulty: 'Easy',
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Uncatchable Button',
    description: 'Try to catch the button that never wants to be caught!',
    path: '/uncatchable',
    emoji: '🏃',
    difficulty: 'Medium',
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Social Media But Worse',
    description: 'Experience social media where everything goes hilariously wrong!',
    path: '/social',
    emoji: '🤪',
    difficulty: 'Chaos',
    color: 'from-pink-500 to-rose-500'
  },
  {
    title: 'RoastBot-3000',
    description: 'Chat with an AI that roasts you in ways your friends never dared!',
    path: '/roast',
    emoji: '🔥',
    difficulty: 'Spicy',
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'Gravity Form',
    description: 'Try to submit a form while fighting against gravity! Watch out for floating inputs and bouncing buttons.',
    path: '/gravity-form',
    emoji: '🌍',
    difficulty: 'Medium',
    color: 'from-purple-500 to-indigo-500'
  }
];

export const LandingPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Welcome to Crazy Games! 🎮
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            A collection of unique and chaotic games that will make you question everything!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {games.map((game) => (
            <Link
              key={game.path}
              to={game.path}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-2xl active:scale-98 touch-manipulation"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-75 group-hover:opacity-85 transition-opacity`} />
              
              <div className="relative p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl">{game.emoji}</span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white
                    ${game.difficulty === 'Easy' ? 'bg-green-500' :
                      game.difficulty === 'Medium' ? 'bg-yellow-500' :
                      game.difficulty === 'Hard' ? 'bg-red-500' :
                      game.difficulty === 'Chaos' ? 'bg-purple-500' :
                      'bg-orange-500'}`}
                  >
                    {game.difficulty}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {game.title}
                </h2>
                
                <p className="text-sm sm:text-base text-white/90">
                  {game.description}
                </p>

                <div className="mt-4 flex items-center text-white/90 group-hover:text-white text-sm sm:text-base">
                  <span>{isMobile ? 'Tap to Play' : 'Play Now'}</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 text-sm sm:text-base">
            More crazy games coming soon! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};
