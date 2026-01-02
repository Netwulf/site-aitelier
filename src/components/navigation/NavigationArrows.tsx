import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className = ''
}) => {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`navigation-arrow navigation-arrow-left ${className}`}
        aria-label="Previous frame"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={!canNext}
        className={`navigation-arrow navigation-arrow-right ${className}`}
        aria-label="Next frame"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </>
  );
};

export default NavigationArrows;
