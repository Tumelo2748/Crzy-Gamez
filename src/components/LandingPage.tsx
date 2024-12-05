import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface GameCard {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Evil';
  path: string;
  emoji: string;
  color: string;
}

const games: GameCard[] = [
  {
    id: 'profile',
    title: 'Professional Profile',
    description: 'A totally normal professional profile page... or is it?',
    difficulty: 'Medium',
    path: '/profile',
    emoji: '👔',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'uncatchable',
    title: 'Catch Me If You Can',
    description: 'Try to click the button. Simple, right?',
    difficulty: 'Hard',
    path: '/uncatchable',
    emoji: '🏃‍♂️',
    color: 'from-red-400 to-red-600',
  },
  // Add more games here as we create them
];

export const LandingPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Crazy Meme Games
          </h1>
          <p className="text-xl text-gray-600">
            A collection of silly web pranks and games to brighten your day! 🎮
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.path}
              className="transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredCard(game.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-90`} />
                
                <div className="relative p-6">
                  <div className="text-6xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    {game.emoji}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {game.title}
                  </h3>
                  
                  <p className="text-white/90 mb-4">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-100' : ''}
                      ${game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-100' : ''}
                      ${game.difficulty === 'Hard' ? 'bg-red-500/20 text-red-100' : ''}
                      ${game.difficulty === 'Evil' ? 'bg-purple-500/20 text-purple-100' : ''}
                    `}>
                      {game.difficulty}
                    </span>
                    
                    <div className="text-white/90 flex items-center">
                      <span className="mr-2">Play Now</span>
                      <svg 
                        className={`w-5 h-5 transform transition-transform duration-300 ${
                          hoveredCard === game.id ? 'translate-x-1' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            More games coming soon! 🚀
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
