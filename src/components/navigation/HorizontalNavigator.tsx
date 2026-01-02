import React, { useRef, forwardRef, useImperativeHandle } from 'react';

export interface HorizontalNavigatorRef {
  container: HTMLDivElement | null;
  scrollToFrame: (index: number) => void;
}

interface HorizontalNavigatorProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalNavigator = forwardRef<HorizontalNavigatorRef, HorizontalNavigatorProps>(
  ({ children, className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToFrame = (index: number) => {
      if (containerRef.current) {
        const frameWidth = containerRef.current.clientWidth;
        containerRef.current.scrollTo({
          left: frameWidth * index,
          behavior: 'smooth'
        });
      }
    };

    useImperativeHandle(ref, () => ({
      container: containerRef.current,
      scrollToFrame
    }));

    return (
      <div
        ref={containerRef}
        className={`horizontal-navigator ${className}`}
      >
        {children}
      </div>
    );
  }
);

HorizontalNavigator.displayName = 'HorizontalNavigator';

export default HorizontalNavigator;
