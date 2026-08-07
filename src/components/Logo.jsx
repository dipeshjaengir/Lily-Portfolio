import React from 'react';
import { motion } from 'framer-motion';
import { artistConfig } from '../data/config';

/**
 * Reusable Unified Brand Logo component.
 * Ensures consistent typography hierarchy and zero character clipping across all screen sizes.
 */
const Logo = ({ animate = false }) => {
  const title = artistConfig.brandName || artistConfig.name || "LILY MAY STINSON";

  const logoStyle = {
    fontSize: "clamp(0.72rem, 4.2vw, 1.25rem)", 
    letterSpacing: "clamp(0.12em, 2vw, 0.25em)",
    whiteSpace: "nowrap"
  };

  const splashLogoStyle = {
    fontSize: "clamp(1.1rem, 6vw, 2.5rem)", 
    letterSpacing: "clamp(0.15em, 2.5vw, 0.3em)",
    whiteSpace: "nowrap"
  };

  if (!animate) {
    return (
      <span 
        className="font-light font-serif uppercase select-none transition-colors duration-500"
        style={logoStyle}
      >
        {title}
      </span>
    );
  }

  // Animated letters reveal version for loading Preloader
  return (
    <h1 
      className="overflow-hidden flex font-light font-serif uppercase select-none mb-4"
      style={splashLogoStyle}
    >
      {title.split("").map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: i * 0.08,
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </h1>
  );
};

export default Logo;
