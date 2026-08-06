import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

/**
 * Premium 404 Error page (Dark theme matching museum theme).
 * Styled like an empty gallery wall with an elegant recovery link.
 */
const NotFound = () => {
  return (
    <div className="w-full text-warm-white flex flex-col justify-center items-center px-6 py-24 relative overflow-hidden bg-gallery-dark">
      <Helmet>
        <title>Room Not Found | Lily May Stinson Gallery</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Decorative empty frame border on the wall */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[450px] aspect-[4/5] border border-dashed border-white/60 pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center max-w-lg text-center">
        <span className="text-[10px] font-sans tracking-[0.35em] text-accent-yellow-border uppercase font-semibold mb-4 block">
          EXHIBITION EMPTY
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-widest uppercase mb-6 leading-none select-none">
          ROOM 404
        </h1>
        
        <p className="font-sans text-xs md:text-sm leading-relaxed opacity-65 tracking-wider mb-10 max-w-sm">
          The exhibit or directory you are looking for is currently uncurated or has been relocated to another gallery wing.
        </p>

        <Link
          to="/"
          className="border border-accent-yellow-border bg-accent-yellow-border hover:bg-transparent text-gallery-dark hover:text-white font-sans text-[10px] tracking-[0.25em] uppercase py-3.5 px-9 transition-all duration-300 font-semibold cursor-pointer select-none"
        >
          Return to Entrance
        </Link>
      </div>

      {/* Ambient decorative lighting */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-accent-yellow-border/5 blur-[120px] pointer-events-none z-0" />
    </div>
  );
};

export default NotFound;
