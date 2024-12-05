import { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UncatchableButtonProps {
  text: string;
  className?: string;
  containerClassName?: string;
  onCatch?: () => void;
  evasionDistance?: number;
  triggerDistance?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const UncatchableButton: React.FC<UncatchableButtonProps> = ({
  text,
  className = '',
  containerClassName = '',
  onCatch,
  evasionDistance = 100,
  triggerDistance = 200,
  difficulty = 'medium',
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState<Position>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [lastTouchPosition, setLastTouchPosition] = useState<Position | null>(null);
  const [gestureState, setGestureState] = useState<'none' | 'swipe' | 'tap'>('none');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const isMobile = useRef(window.innerWidth < 768);

  // Difficulty settings
  const difficultySettings = {
    easy: {
      evasionMultiplier: 0.5,
      velocityDecay: 0.98,
      randomness: 0.2,
      predictionStrength: 0.3,
      maxSpeed: 15,
      teleportChance: 0,
      fakeoutChance: 0,
      zigzagStrength: 0
    },
    medium: {
      evasionMultiplier: 1.2,
      velocityDecay: 0.95,
      randomness: 0.6,
      predictionStrength: 1,
      maxSpeed: 25,
      teleportChance: 0.001,
      fakeoutChance: 0.02,
      zigzagStrength: 0.5
    },
    hard: {
      evasionMultiplier: 3.5,
      velocityDecay: 0.95,
      randomness: 2.5,
      predictionStrength: 3,
      maxSpeed: 35,
      teleportChance: 0.02,
      fakeoutChance: 0.1,
      zigzagStrength: 2
    }
  };

  const settings = difficultySettings[difficulty];

  // Add special movement patterns
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < settings.teleportChance && containerRef.current && buttonRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const button = buttonRef.current.getBoundingClientRect();
        setPosition({
          x: Math.random() * (container.width - button.width),
          y: Math.random() * (container.height - button.height)
        });
      }

      if (Math.random() < settings.fakeoutChance) {
        // Sudden direction change
        setVelocity(prev => ({
          x: -prev.x * 1.5,
          y: -prev.y * 1.5
        }));
      }

      // Add zigzag movement
      if (settings.zigzagStrength > 0) {
        setVelocity(prev => ({
          x: prev.x + Math.sin(Date.now() / 200) * settings.zigzagStrength,
          y: prev.y + Math.cos(Date.now() / 200) * settings.zigzagStrength
        }));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [settings]);

  const moveButton = (pointerX: number, pointerY: number, isTouch = false) => {
    if (!buttonRef.current || !containerRef.current) return;

    // const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();

    // Calculate button center
    const buttonCenterX = position.x + button.width / 2;
    const buttonCenterY = position.y + button.height / 2;

    // Calculate distance and angle to pointer
    const dx = pointerX - buttonCenterX;
    const dy = pointerY - buttonCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate pointer velocity
    const pointerDX = pointerX - lastMousePos.current.x;
    const pointerDY = pointerY - lastMousePos.current.y;
    const pointerSpeed = Math.sqrt(pointerDX * pointerDX + pointerDY * pointerDY);

    // Update last pointer position
    lastMousePos.current = { x: pointerX, y: pointerY };

    // Adjust trigger distance for touch
    const effectiveTriggerDistance = isTouch ? triggerDistance * 1.5 : triggerDistance;

    // Only move if pointer is within trigger distance
    if (distance < effectiveTriggerDistance) {
      setIsHovered(true);
      
      // Calculate evasion force (stronger when pointer is closer)
      const force = (1 - distance / effectiveTriggerDistance) * evasionDistance * settings.evasionMultiplier;
      
      // Add some randomness to the movement
      const randomAngle = Math.random() * Math.PI * 2;
      const randomForce = Math.random() * force * settings.randomness;
      
      // Calculate new velocity (including pointer speed factor)
      const speedFactor = Math.min(pointerSpeed * settings.predictionStrength, settings.maxSpeed);
      
      // Add gesture-based evasion for touch
      let gestureMultiplier = 1;
      if (isTouch && gestureState === 'swipe') {
        gestureMultiplier = 1.5; // Stronger evasion for swipes
      }

      // Calculate predicted pointer position
      const predictedX = pointerX + pointerDX * settings.predictionStrength;
      const predictedY = pointerY + pointerDY * settings.predictionStrength;
      const predictedDX = predictedX - buttonCenterX;
      const predictedDY = predictedY - buttonCenterY;
      const predictedDistance = Math.sqrt(predictedDX * predictedDX + predictedDY * predictedDY);

      // Add evasion based on predicted position
      const predictedForce = predictedDistance < effectiveTriggerDistance ? 
        (1 - predictedDistance / effectiveTriggerDistance) * force * 0.5 : 0;

      setVelocity(prev => {
        const newVelX = prev.x * settings.velocityDecay - 
          (dx / distance) * force * gestureMultiplier - 
          Math.cos(randomAngle) * randomForce + 
          pointerDX * speedFactor -
          (predictedDX / predictedDistance) * predictedForce;
        
        const newVelY = prev.y * settings.velocityDecay - 
          (dy / distance) * force * gestureMultiplier - 
          Math.sin(randomAngle) * randomForce + 
          pointerDY * speedFactor -
          (predictedDY / predictedDistance) * predictedForce;

        // Limit maximum speed
        const currentSpeed = Math.sqrt(newVelX * newVelX + newVelY * newVelY);
        if (currentSpeed > settings.maxSpeed) {
          const scale = settings.maxSpeed / currentSpeed;
          return {
            x: newVelX * scale,
            y: newVelY * scale
          };
        }

        return { x: newVelX, y: newVelY };
      });
    } else {
      setIsHovered(false);
    }
  };

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartTime(Date.now());
    setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
    setGestureState('none');
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !lastTouchPosition) return;

    const dx = touch.clientX - lastTouchPosition.x;
    const dy = touch.clientY - lastTouchPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Detect swipe gesture
    if (distance > 10) {
      setGestureState('swipe');
    }

    moveButton(touch.clientX - rect.left, touch.clientY - rect.top, true);
    setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartTime;
    
    // Detect tap gesture
    if (touchDuration < 200 && gestureState === 'none') {
      setGestureState('tap');
    }

    setLastTouchPosition(null);
  };

  // Physics animation loop
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current || !buttonRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const button = buttonRef.current.getBoundingClientRect();

      // Update position based on velocity
      let newX = position.x + velocity.x;
      let newY = position.y + velocity.y;

      // Bounce off container walls with different elasticity based on difficulty
      const elasticity = difficulty === 'hard' ? 0.9 : 0.8;
      if (newX < 0 || newX > container.width - button.width) {
        setVelocity(prev => ({ ...prev, x: -prev.x * elasticity }));
        newX = Math.max(0, Math.min(newX, container.width - button.width));
      }
      if (newY < 0 || newY > container.height - button.height) {
        setVelocity(prev => ({ ...prev, y: -prev.y * elasticity }));
        newY = Math.max(0, Math.min(newY, container.height - button.height));
      }

      // Apply friction based on difficulty
      setVelocity(prev => ({
        x: prev.x * settings.velocityDecay,
        y: prev.y * settings.velocityDecay
      }));

      setPosition({ x: newX, y: newY });
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [position, velocity, settings.velocityDecay, difficulty]);

  useEffect(() => {
    if (containerRef.current && buttonRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: (container.width - button.width) / 2,
        y: (container.height - button.height) / 2,
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[200px] bg-transparent rounded-lg overflow-hidden ${containerClassName}`}
      onMouseMove={(e) => {
        if (!isMobile.current) {
          const rect = e.currentTarget.getBoundingClientRect();
          moveButton(e.clientX - rect.left, e.clientY - rect.top, false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        ref={buttonRef}
        onClick={onCatch}
        className={`absolute px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className} ${
          isHovered ? 'scale-95' : ''
        } ${gestureState === 'swipe' ? 'rotate-12' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) ${
            isHovered ? 'scale(0.95)' : 'scale(1)'
          } ${gestureState === 'swipe' ? 'rotate(12deg)' : 'rotate(0deg)'}`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {text}
      </button>
    </div>
  );
};
