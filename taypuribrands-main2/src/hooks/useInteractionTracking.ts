import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useInteractionTracking = (sessionId: string) => {
  const trackInteraction = useCallback(async (
    type: 'click' | 'scroll' | 'hover' | 'focus',
    element: HTMLElement | null,
    x?: number,
    y?: number
  ) => {
    try {
      await supabase
        .from('user_interactions')
        .insert({
          session_id: sessionId,
          interaction_type: type,
          element_id: element?.id || null,
          element_class: element?.className || null,
          element_text: element?.textContent?.substring(0, 100) || null,
          page_path: window.location.pathname,
          x_position: x || null,
          y_position: y || null
        });
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    // Track clicks
    const handleClick = (e: MouseEvent) => {
      trackInteraction('click', e.target as HTMLElement, e.clientX, e.clientY);
      
      // Update heatmap data
      updateHeatmapData(e.clientX, e.clientY);
    };

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        trackInteraction('scroll', null, 0, scrollDepth);
      }
    };

    // Track important hovers (buttons, links, CTAs)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Only track hover on interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cta')
      ) {
        trackInteraction('hover', target, e.clientX, e.clientY);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [trackInteraction]);

  return { trackInteraction };
};

// Update heatmap data aggregation
const updateHeatmapData = async (x: number, y: number) => {
  try {
    await supabase
      .from('heatmap_data')
      .insert({
        page_path: window.location.pathname,
        x_position: Math.round(x),
        y_position: Math.round(y)
      });
  } catch (error) {
    console.error('Error updating heatmap:', error);
  }
};
