/**
 * React Hook for tracking analytics data with SiteCatalyst.
 * @returns {[]} An array with 2 values - siteCatContext and trackEvent.
 */
const useSiteCat = () => {
  // * Check if s object is present
  if (!window.s) {
    throw new Error(
      'No SiteCat object is present on the window object. Please initiate the SiteCat object.',
    );
  }

  const siteCatContext = window.s;

  /**
   * Tracks object of values
   * @param {object} values
   */
  const trackEvent = (values) => {
    Object.keys(values).forEach((key) => {
      // eslint-disable-next-line no-console
      console.log(`TRACKING - Setting ${key} to ${values[key]}`);
      siteCatContext[key] = values[key];
    });

    // * Determine if event is a PageLoad or a LinkTrack
    // * LinkTrack by default
    let trackingFunc = siteCatContext.tl;

    // * If pageName has changed, this is a PageLoad
    if (
      siteCatContext.pageName &&
      values.pageName &&
      siteCatContext.pageName !== values.pageName
    ) {
      trackingFunc = siteCatContext.t;
    }

    // * Call trackingFunc to send data to SiteCat
    // eslint-disable-next-line no-console
    console.log('TRACKING - Calling SiteCat');
    trackingFunc();
  };

  return [siteCatContext, trackEvent];
};

export default useSiteCat;
