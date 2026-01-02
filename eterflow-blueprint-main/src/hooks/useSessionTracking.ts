import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSessionTracking = () => {
  const sessionIdRef = useRef<string>(getOrCreateSessionId());
  const visitorIdRef = useRef<string>(getOrCreateVisitorId());
  const entryTimeRef = useRef<Date>(new Date());
  const pageViewsRef = useRef<number>(0);

  useEffect(() => {
    // Create session on mount
    createSession();

    // Update session on page unload
    const handleBeforeUnload = () => {
      updateSessionOnExit();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      updateSessionOnExit();
    };
  }, []);

  const createSession = async () => {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .insert({
          session_id: sessionIdRef.current,
          visitor_id: visitorIdRef.current,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          landing_page: window.location.pathname,
          entry_time: entryTimeRef.current.toISOString()
        });

      if (error) {
        console.error('Error creating session:', error);
      }
    } catch (error) {
      console.error('Error in createSession:', error);
    }
  };

  const updateSessionOnExit = async () => {
    const exitTime = new Date();
    const durationSeconds = Math.floor((exitTime.getTime() - entryTimeRef.current.getTime()) / 1000);

    try {
      await supabase
        .from('user_sessions')
        .update({
          exit_time: exitTime.toISOString(),
          duration_seconds: durationSeconds,
          page_views: pageViewsRef.current
        })
        .eq('session_id', sessionIdRef.current);
    } catch (error) {
      console.error('Error updating session on exit:', error);
    }
  };

  const trackPageView = async (pagePath: string, pageTitle: string) => {
    pageViewsRef.current += 1;

    try {
      await supabase
        .from('page_views')
        .insert({
          session_id: sessionIdRef.current,
          page_path: pagePath,
          page_title: pageTitle
        });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  return {
    sessionId: sessionIdRef.current,
    visitorId: visitorIdRef.current,
    trackPageView
  };
};

// Helper functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getOrCreateSessionId(): string {
  const storageKey = 'aitelier_session_id';
  let sessionId = sessionStorage.getItem(storageKey);
  
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
}

function getOrCreateVisitorId(): string {
  const storageKey = 'aitelier_visitor_id';
  let visitorId = localStorage.getItem(storageKey);
  
  if (!visitorId) {
    visitorId = generateId();
    localStorage.setItem(storageKey, visitorId);
  }
  
  return visitorId;
}
