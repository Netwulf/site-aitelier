import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseHorizontalNavigationOptions {
  totalFrames: number;
  onFrameChange?: (index: number) => void;
}

interface UseHorizontalNavigationReturn {
  currentFrame: number;
  totalFrames: number;
  goToFrame: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function useHorizontalNavigation(
  containerRef: RefObject<HTMLDivElement | null>,
  options: UseHorizontalNavigationOptions
): UseHorizontalNavigationReturn {
  const { totalFrames, onFrameChange } = options;
  const [currentFrame, setCurrentFrame] = useState(0);

  const goToFrame = useCallback((index: number) => {
    if (index < 0 || index >= totalFrames) return;

    if (containerRef.current) {
      const frameWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: frameWidth * index,
        behavior: 'smooth'
      });
    }
    setCurrentFrame(index);
    onFrameChange?.(index);
  }, [containerRef, totalFrames, onFrameChange]);

  const goNext = useCallback(() => {
    if (currentFrame < totalFrames - 1) {
      goToFrame(currentFrame + 1);
    }
  }, [currentFrame, totalFrames, goToFrame]);

  const goPrev = useCallback(() => {
    if (currentFrame > 0) {
      goToFrame(currentFrame - 1);
    }
  }, [currentFrame, goToFrame]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Sync with manual scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const frameWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const newFrame = Math.round(scrollLeft / frameWidth);

      if (newFrame !== currentFrame && newFrame >= 0 && newFrame < totalFrames) {
        setCurrentFrame(newFrame);
        onFrameChange?.(newFrame);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, currentFrame, totalFrames, onFrameChange]);

  return {
    currentFrame,
    totalFrames,
    goToFrame,
    goNext,
    goPrev,
    canGoNext: currentFrame < totalFrames - 1,
    canGoPrev: currentFrame > 0
  };
}
