import React from 'react';
import PatienceTester from '../../components/games/PatienceTester';

const PatienceTesterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Patience Tester 3000</h1>
          <p className="text-xl text-white opacity-90">
            How long can you wait? Probably not long enough...
          </p>
        </div>
        
        <PatienceTester />
      </div>
    </div>
  );
};

export default PatienceTesterPage;
