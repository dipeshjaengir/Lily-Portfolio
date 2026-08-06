import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth scrolling wrapper using official Lenis Core.
 * Manages requestAnimationFrame updates and smooth scrolling physics.
 */
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with refined premium parameters
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false, // Preserve native scroll physics for touch devices
      wheelMultiplier: 1.05,
    });

    lenisRef.current = lenis;

    // Bind scroll raf loop
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Clean up instances
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
