import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MultiplyingButton } from './MultiplyingButton';

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    years: string;
    description: string;
  }[];
  funFacts: string[];
}

export const ProfilePage: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isNormal, setIsNormal] = useState(true);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const profileData: ProfileData = {
    name: "John Developer",
    title: "Senior Software Engineer",
    bio: "Passionate about creating seamless user experiences and writing clean, maintainable code. Always eager to learn new technologies and solve complex problems.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Git", "GraphQL"],
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Developer",
        years: "2020 - Present",
        description: "Leading development of scalable web applications"
      },
      {
        company: "Start Up Inc",
        position: "Full Stack Developer",
        years: "2018 - 2020",
        description: "Built innovative solutions for emerging markets"
      }
    ],
    funFacts: [
      "I once debugged code in my sleep",
      "My cat writes better code than me",
      "I think CSS is actually easy",
      "I use tabs AND spaces",
      "I debug with console.log"
    ]
  };

  useEffect(() => {
    if (clickCount > 5) {
      setIsNormal(false);
    }
    
    const interval = setInterval(() => {
      if (!isNormal) {
        setCurrentFact((prev) => (prev + 1) % profileData.funFacts.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [clickCount, isNormal]);

  const handleImageClick = () => {
    setClickCount(prev => prev + 1);
    setRotationDegree(prev => prev + (Math.random() * 360));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isNormal) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4"
      onMouseMove={handleMouseMove}
    >
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

      <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
        !isNormal ? 'transform hover:skew-x-3 hover:scale-[1.02]' : ''
      }`}>
        <div className={`p-8 ${!isNormal ? 'animate-rainbow' : ''}`}>
          <div className="relative text-center mb-8">
            <div 
              className={`w-40 h-40 mx-auto rounded-full overflow-hidden cursor-pointer transition-all duration-500 ${
                !isNormal ? 'hover:scale-110' : ''
              }`}
              onClick={handleImageClick}
              style={{ 
                transform: `rotate(${rotationDegree}deg)`,
              }}
            >
              <img 
                src="https://api.dicebear.com/6.x/avataaars/svg?seed=Felix" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className={`mt-6 text-4xl font-bold text-gray-800 ${
              !isNormal ? 'animate-bounce' : ''
            }`}>
              {profileData.name}
            </h1>
            <h2 className={`text-xl text-gray-600 mt-2 ${
              !isNormal ? 'animate-pulse' : ''
            }`}>
              {profileData.title}
            </h2>
            {!isNormal && (
              <div className="absolute top-0 right-0 bg-purple-100 rounded-lg p-3 transform rotate-12">
                <p className="text-purple-600 text-sm font-medium">
                  Fun Fact: {profileData.funFacts[currentFact]}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">About Me</h3>
              <p className={`text-gray-600 ${
                !isNormal ? 'animate-marquee whitespace-nowrap' : ''
              }`}>
                {profileData.bio}
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {profileData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={`px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-medium transition-all duration-300 ${
                      !isNormal ? 'hover:scale-110 transform' : ''
                    }`}
                    style={{ 
                      transform: !isNormal 
                        ? `translateY(${Math.sin((Date.now() / 1000) + index) * 10}px)` 
                        : 'none',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Experience</h3>
              {profileData.experience.map((exp, index) => (
                <div 
                  key={index}
                  className={`mb-6 p-6 bg-gray-50 rounded-xl transition-all duration-300 ${
                    !isNormal ? 'hover:bg-blue-50 transform hover:-translate-y-1' : ''
                  }`}
                >
                  <h4 className="text-xl font-medium text-gray-800">{exp.company}</h4>
                  <p className="text-gray-600 mt-1">{exp.position}</p>
                  <p className="text-gray-500 text-sm mt-1">{exp.years}</p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </section>

            <div className="pt-4">
              <MultiplyingButton 
                text="Download Resume"
                className={`bg-blue-600 text-white hover:bg-blue-700 ${
                  !isNormal ? 'shadow-lg' : ''
                }`}
                isEvil={!isNormal}
              />
            </div>
          </div>
        </div>
      </div>

      {!isNormal && (
        <div 
          className="fixed w-8 h-8 pointer-events-none transition-all duration-200 z-50"
          style={{
            left: `${mousePosition.x - 16}px`,
            top: `${mousePosition.y - 16}px`,
          }}
        >
          <span className="text-2xl animate-spin">🤪</span>
        </div>
      )}
    </div>
  );
};
