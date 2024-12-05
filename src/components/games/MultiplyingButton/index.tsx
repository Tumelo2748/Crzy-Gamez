import React, { useState, useRef, useEffect } from 'react';
import { ButtonPosition, MultiplyingButtonProps } from './types';

export const MultiplyingButton: React.FC<MultiplyingButtonProps> = ({
  text,
  className = '',
  isEvil = false,
}) => {
  const [buttons, setButtons] = useState<ButtonPosition[]>([{ x: 0, y: 0, rotation: 0 }]);
  const [isMultiplying, setIsMultiplying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const createNewButton = (x: number, y: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const maxButtons = 50; // Limit the number of buttons to prevent performance issues
    
    if (buttons.length >= maxButtons) {
      // Start removing old buttons when we reach the limit
      setButtons(prev => [...prev.slice(Math.floor(maxButtons / 2))]);
    }

    // Create 3 new buttons in a triangle formation
    const newButtons: ButtonPosition[] = [];
    const spacing = 60; // Distance between buttons
    const angles = [0, 120, 240]; // Angles for triangle formation

    angles.forEach(angle => {
      const radian = (angle * Math.PI) / 180;
      const newX = x + Math.cos(radian) * spacing;
      const newY = y + Math.sin(radian) * spacing;

      // Keep buttons within container bounds
      const boundedX = Math.max(0, Math.min(newX, container.width - 100));
      const boundedY = Math.max(0, Math.min(newY, container.height - 40));

      newButtons.push({
        x: boundedX,
        y: boundedY,
        rotation: Math.random() * 360,
      });
    });

    setButtons(prev => [...prev, ...newButtons]);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, button: ButtonPosition) => {
    e.stopPropagation();
    if (isEvil) {
      setIsMultiplying(true);
      createNewButton(button.x, button.y);
    } else {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }
  };

  useEffect(() => {
    if (isMultiplying) {
      const interval = setInterval(() => {
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        createNewButton(randomButton.x, randomButton.y);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isMultiplying, buttons]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[200px] overflow-hidden bg-transparent rounded-lg"
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={(e) => handleButtonClick(e, button)}
          className={`absolute px-4 py-2 rounded transition-all duration-300 transform 
            ${className}
            ${isEvil ? 'hover:scale-110' : ''}
            ${isMultiplying ? 'animate-pulse' : ''}
          `}
          style={{
            left: `${button.x}px`,
            top: `${button.y}px`,
            transform: `rotate(${button.rotation}deg)`,
          }}
        >
          {text}
        </button>
      ))}

      {isMultiplying && buttons.length >= 20 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold text-red-500 animate-bounce bg-white/80 px-4 py-2 rounded-lg">
            Chaos unleashed! 😈
          </p>
        </div>
      )}
    </div>
  );
};
