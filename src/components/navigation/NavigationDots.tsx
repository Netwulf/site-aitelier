import React from 'react';

interface NavigationDotsProps {
  totalFrames: number;
  currentFrame: number;
  labels?: string[];
  onDotClick: (index: number) => void;
  showLabels?: boolean;
  className?: string;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({
  totalFrames,
  currentFrame,
  labels = [],
  onDotClick,
  showLabels = false,
  className = ''
}) => {
  return (
    <div className={`navigation-dots ${className}`}>
      {Array.from({ length: totalFrames }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`navigation-dot ${currentFrame === index ? 'active' : ''}`}
          aria-label={labels[index] || `Go to frame ${index + 1}`}
          aria-current={currentFrame === index ? 'true' : 'false'}
        >
          {showLabels && labels[index] && (
            <span className="navigation-dot-label">{labels[index]}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default NavigationDots;
