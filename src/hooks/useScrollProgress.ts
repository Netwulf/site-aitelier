import { useState, useEffect, useCallback } from 'react';

// Story 3.3: Scroll progress hook for progress bar
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progressValue = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    setProgress(Math.min(100, Math.max(0, progressValue)));
    setIsScrolling(true);
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      handleScroll();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  return { progress, isScrolling };
};

// Story 3.4: Custom hook for section-based scroll progress
export const useSectionProgress = (sectionRef: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate how much of the section has been scrolled through
      const scrolledIntoSection = windowHeight - rect.top;
      const totalScrollDistance = windowHeight + sectionHeight;
      const sectionProgress = Math.min(100, Math.max(0, (scrolledIntoSection / totalScrollDistance) * 100));

      setProgress(sectionProgress);
      setIsInView(rect.top < windowHeight && rect.bottom > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  return { progress, isInView };
};
