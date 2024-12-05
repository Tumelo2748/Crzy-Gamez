import React from 'react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to, className = '' }) => {
  return (
    <Link 
      to={to} 
      className={`inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors ${className}`}
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
  );
};
