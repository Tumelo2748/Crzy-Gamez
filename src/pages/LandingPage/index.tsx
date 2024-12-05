import React from 'react';
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
  }
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Crazy Games! 🎮
          </h1>
          <p className="text-xl text-gray-600">
            A collection of unique and chaotic games that will make you question everything!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.path}
              to={game.path}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-75 group-hover:opacity-85 transition-opacity`} />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{game.emoji}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white
                    ${game.difficulty === 'Easy' ? 'bg-green-500' :
                      game.difficulty === 'Medium' ? 'bg-yellow-500' :
                      game.difficulty === 'Hard' ? 'bg-red-500' :
                      game.difficulty === 'Chaos' ? 'bg-purple-500' :
                      'bg-orange-500'}`}
                  >
                    {game.difficulty}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">
                  {game.title}
                </h2>
                
                <p className="text-white/90">
                  {game.description}
                </p>

                <div className="mt-4 flex items-center text-white/90 group-hover:text-white">
                  <span>Play Now</span>
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
          <Link
            to="/gravity-form"
            className="group block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Gravity Form</h3>
              <span className="text-2xl">🌍</span>
            </div>
            <p className="text-gray-600">
              Try to submit a form while fighting against gravity! Watch out for floating inputs and bouncing buttons.
            </p>
          </Link>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            More crazy games coming soon! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};
