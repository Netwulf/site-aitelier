import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  once?: boolean;
}

// Singleton Intersection Observer
class IntersectionObserverManager {
  private static instance: IntersectionObserverManager;
  private observer: IntersectionObserver | null = null;
  private callbacks: Map<Element, (isInView: boolean) => void> = new Map();

  private constructor() {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = this.callbacks.get(entry.target);
            if (callback) {
              callback(entry.isIntersecting);
            }
          });
        },
        { threshold: 0.1 }
      );
    }
  }

  static getInstance(): IntersectionObserverManager {
    if (!IntersectionObserverManager.instance) {
      IntersectionObserverManager.instance = new IntersectionObserverManager();
    }
    return IntersectionObserverManager.instance;
  }

  observe(element: Element, callback: (isInView: boolean) => void): void {
    if (this.observer) {
      this.callbacks.set(element, callback);
      this.observer.observe(element);
    }
  }

  unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
      this.callbacks.delete(element);
    }
  }
}

export const useInViewOptimized = (options: UseInViewOptions = {}) => {
  const { once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const manager = IntersectionObserverManager.getInstance();
    
    const handleIntersection = (inView: boolean) => {
      if (inView && (!once || !hasTriggered.current)) {
        setIsInView(true);
        hasTriggered.current = true;
        if (once) {
          manager.unobserve(element);
        }
      } else if (!once) {
        setIsInView(inView);
      }
    };

    manager.observe(element, handleIntersection);

    return () => {
      manager.unobserve(element);
    };
  }, [once]);

  return { ref, isInView };
};
