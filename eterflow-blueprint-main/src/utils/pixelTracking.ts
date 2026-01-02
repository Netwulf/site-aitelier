
// TypeScript declarations for Facebook Pixel
declare global {
  interface Window {
    fbq?: (command: string, event: string, params?: any) => void;
  }
}

/**
 * Tracks a Lead event in Facebook Pixel
 * Called when a form submission is successful
 */
export const trackLead = (): void => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('📊 Tracking Lead event in Facebook Pixel');
      window.fbq('track', 'Lead');
    } else {
      console.log('⚠️ Facebook Pixel not available, skipping Lead tracking');
    }
  } catch (error) {
    console.error('❌ Error tracking Lead event:', error);
  }
};

/**
 * Generic function to track custom events
 * Can be used for future tracking needs
 */
export const trackEvent = (eventName: string, params?: any): void => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log(`📊 Tracking ${eventName} event in Facebook Pixel`, params);
      window.fbq('track', eventName, params);
    } else {
      console.log(`⚠️ Facebook Pixel not available, skipping ${eventName} tracking`);
    }
  } catch (error) {
    console.error(`❌ Error tracking ${eventName} event:`, error);
  }
};
