import { useEffect, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

// Story 3.1: Enhanced smooth scroll with better easing
export const useSmoothScroll = () => {
  useEffect(() => {
    // Premium easing function - smoother and more natural
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const lenis = new Lenis({
      duration: 1.2,
      easing: easeOutExpo,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
      // Story 3.1: Improved lerp for smoother interpolation
      lerp: 0.1,
    });

    // Expose lenis to window for external access (e.g., from navigation links)
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Story 3.1: Handle anchor links smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -80, // Account for fixed header
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);
};

// Story 3.1: Hook to programmatically scroll to element
export const useScrollTo = () => {
  const scrollTo = useCallback((target: string | HTMLElement, options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
  }) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: options?.offset ?? -80,
        duration: options?.duration ?? 1.5,
        immediate: options?.immediate ?? false,
      });
    }
  }, []);

  return scrollTo;
};
