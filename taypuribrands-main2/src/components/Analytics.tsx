import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSessionTracking } from '@/hooks/useSessionTracking';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';

const Analytics = () => {
  const location = useLocation();
  const { sessionId, trackPageView } = useSessionTracking();
  useInteractionTracking(sessionId);

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname, document.title);
  }, [location, trackPageView]);

  return null; // This is a logic-only component
};

export default Analytics;
