import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

/**
 * Reusable Unified Brand Logo component.
 * Renders the client's circular logo image as-is, preserving proportions.
 */
const Logo = ({ animate = false }) => {
  if (!animate) {
    return (
      <img 
        src={logoImg} 
        alt="LOVEISLILY Logo" 
        className="h-10 md:h-12 w-auto object-contain select-none transition-opacity duration-300 hover:opacity-90"
      />
    );
  }

  // Animated version for loading Preloader
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center justify-center"
    >
      <img 
        src={logoImg} 
        alt="LOVEISLILY Logo" 
        className="w-24 h-24 sm:w-32 sm:h-32 object-contain select-none"
      />
    </motion.div>
  );
};

export default Logo;
