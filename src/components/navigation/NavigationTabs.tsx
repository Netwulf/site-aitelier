import React from 'react';

interface NavigationTabsProps {
  labels: string[];
  currentFrame: number;
  onTabClick: (index: number) => void;
  className?: string;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  labels,
  currentFrame,
  onTabClick,
  className = ''
}) => {
  return (
    <nav className={`navigation-tabs ${className}`} aria-label="Section navigation">
      {labels.map((label, index) => (
        <button
          key={index}
          onClick={() => onTabClick(index)}
          className={`navigation-tab ${currentFrame === index ? 'active' : ''}`}
          aria-current={currentFrame === index ? 'page' : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default NavigationTabs;
