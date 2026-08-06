import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Image Component with lazy loading, skeleton loaders, and smooth fade-in.
 */
const Image = ({ src, alt, className = "", objectFit = "cover", height = "h-full" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '200px' } // Load before it comes into view
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) observer.disconnect();
    };
  }, []);

  // Handle empty or missing source with an elegant empty museum frame
  if (!src) {
    return (
      <div 
        className={`relative overflow-hidden w-full ${height} bg-neutral-50 border border-black/5 flex flex-col justify-center items-center text-center p-6 ${className}`}
      >
        <span className="font-serif text-[10px] tracking-[0.25em] text-neutral-400 uppercase select-none">
          EXHIBIT PENDING
        </span>
        <span className="font-sans text-[8px] tracking-[0.25em] text-neutral-300 uppercase mt-1 select-none">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden w-full ${height} bg-neutral-100 dark:bg-neutral-900 ${className}`}
    >
      {/* Soft Shimmer Skeleton Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 animate-pulse" />
      )}

      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            scale: isLoaded ? 1 : 1.03
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full h-full object-${objectFit} transition-transform duration-700 ease-out`}
        />
      )}
    </div>
  );
};

export default Image;
