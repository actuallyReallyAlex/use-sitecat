/**
 * React Hook for tracking analytics data with SiteCatalyst.
 * @returns {[]} An array with 2 values. The 1st is siteCatContext - an object to view all SiteCat data. The 2nd is a function to track data objects.
 */
const useSiteCat = () => {
  // * Check if s object is present
  if (!window.s) {
    throw new Error(
      "No SiteCat object is present on the window object. Please initiate the SiteCat object."
    );
  }

  const siteCatContext = window.s;

  /**
   * Tracks object of values
   * @param {object} values
   */
  const trackEvent = values => {
    Object.keys(values).forEach(key => {
      console.log(`TRACKING - Setting ${key} to ${values[key]}`);
      window.s[key] = values[key];
    });
  };

  return [siteCatContext, trackEvent];
};

export default useSiteCat;
