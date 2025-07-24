const safeIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  // Validate and sanitize threshold
  let threshold = options.threshold;
  
  if (threshold !== undefined) {
    if (Array.isArray(threshold)) {
      // Handle array of thresholds
      threshold = threshold.map(t => {
        const num = Number(t);
        if (isNaN(num)) return 0;
        return Math.max(0, Math.min(1, num));
      });
    } else {
      // Handle single threshold
      const num = Number(threshold);
      threshold = isNaN(num) ? 0.1 : Math.max(0, Math.min(1, num));
    }
  } else {
    threshold = 0.1; // default
  }

  console.log('Creating IntersectionObserver with threshold:', threshold);

  return new IntersectionObserver(callback, {
    ...options,
    threshold
  });
};

export default safeIntersectionObserver;