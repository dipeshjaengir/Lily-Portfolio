import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import Image from './Image';
import { getArtworkImage } from '../utils/assets';

/**
 * Handcrafted Premium Lightbox Component.
 * Supports zoom controls, slideshow next/prev navigation, keyboard shortcuts, and descriptive metadata drawer.
 */
const Lightbox = ({ 
  activeArtwork, 
  artworkList = [], 
  onClose, 
  onSelectArtwork 
}) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [showDetails, setShowDetails] = useState(true);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Lock body scroll

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Release body scroll
    };
  }, [activeArtwork, artworkList]);

  if (!activeArtwork) return null;

  const resolvedImg = activeArtwork.localPath 
    ? getArtworkImage(activeArtwork.localPath) 
    : (activeArtwork.placeholderUrl || activeArtwork.url);

  const currentIndex = artworkList.findIndex(art => art.id === activeArtwork.id);

  const handlePrev = () => {
    if (artworkList.length <= 1) return;
    const prevIndex = (currentIndex - 1 + artworkList.length) % artworkList.length;
    onSelectArtwork(artworkList[prevIndex]);
    setZoomScale(1); // Reset zoom
  };

  const handleNext = () => {
    if (artworkList.length <= 1) return;
    const nextIndex = (currentIndex + 1) % artworkList.length;
    onSelectArtwork(artworkList[nextIndex]);
    setZoomScale(1); // Reset zoom
  };

  const toggleZoom = () => {
    setZoomScale(prev => (prev === 1 ? 1.8 : 1));
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[1000] bg-black/95 flex flex-col justify-between select-none"
        aria-label="Exhibition Viewer"
        role="dialog"
      >
        {/* Top bar controls */}
        <div className="w-full flex justify-between items-center px-6 py-4 z-50 text-white font-sans text-xs tracking-widest bg-gradient-to-b from-black/60 to-transparent">
          <div>
            <span className="opacity-60 uppercase">ROOM VIEW &bull; </span>
            <span className="uppercase text-accent-yellow-border">
              {currentIndex + 1} / {artworkList.length}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleZoom}
              className="hover:text-accent-yellow-border transition-colors p-2 cursor-pointer"
              title="Toggle Zoom"
            >
              {zoomScale === 1 ? <ZoomIn size={18} /> : <ZoomOut size={18} />}
            </button>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="hover:text-accent-yellow-border transition-colors text-[10px] tracking-widest uppercase cursor-pointer py-1 px-3 border border-white/20 hover:border-white transition-all hidden sm:block"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            <button 
              onClick={onClose}
              className="hover:text-accent-yellow-border transition-colors p-2 cursor-pointer"
              title="Close Exhibition View"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Center Artwork Viewport */}
        <div className="relative flex-grow flex items-center justify-center overflow-hidden px-4 md:px-12">
          {/* Navigation Arrows */}
          {artworkList.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-6 z-50 text-white/50 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/5 cursor-pointer hidden md:block"
                aria-label="Previous exhibit"
              >
                <ChevronLeft size={36} strokeWidth={1} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-6 z-50 text-white/50 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/5 cursor-pointer hidden md:block"
                aria-label="Next exhibit"
              >
                <ChevronRight size={36} strokeWidth={1} />
              </button>
            </>
          )}

          {/* Draggable/Zoomable Image container */}
          <motion.div 
            key={activeArtwork.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: zoomScale,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={toggleZoom}
            className="max-h-[70vh] max-w-[85vw] md:max-h-[80vh] md:max-w-[70vw] relative z-10 flex items-center justify-center cursor-zoom-in"
          >
            {resolvedImg ? (
              <img
                src={resolvedImg}
                alt={activeArtwork.title}
                className="max-h-[70vh] max-w-[85vw] md:max-h-[80vh] md:max-w-[70vw] object-contain shadow-2xl pointer-events-none"
              />
            ) : (
              <div className="w-[300px] h-[400px] bg-neutral-900 border border-white/10 flex flex-col justify-center items-center text-center p-6 rounded-sm select-none">
                <span className="font-serif text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                  EXHIBIT PENDING
                </span>
                <span className="font-sans text-[8px] tracking-[0.25em] text-neutral-600 uppercase mt-1">
                  {activeArtwork.title}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Details Drawer */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-gradient-to-t from-black via-black/85 to-transparent text-white px-6 md:px-12 py-8 relative z-50 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
              <div className="max-w-2xl text-left">
                {activeArtwork.medium && (
                  <span className="text-[10px] tracking-[0.25em] text-accent-yellow-border uppercase font-semibold">
                    {activeArtwork.medium}
                  </span>
                )}
                {activeArtwork.title && (
                  <h3 className="font-serif text-2xl md:text-3xl font-light mt-1.5 tracking-wide text-warm-white">
                    {activeArtwork.title}
                  </h3>
                )}
                {activeArtwork.description && (
                  <p className="text-xs opacity-75 mt-3 font-sans leading-relaxed">
                    {activeArtwork.description}
                  </p>
                )}
              </div>

              {(activeArtwork.dimensions || activeArtwork.year || activeArtwork.status) && (
                <div className="flex flex-row md:flex-col items-start gap-4 md:gap-1 text-left min-w-[200px] border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 text-xs font-sans">
                  {activeArtwork.dimensions && (
                    <div className="flex justify-between w-full gap-8 py-0.5">
                      <span className="opacity-50">Dimensions</span>
                      <span className="font-medium">{activeArtwork.dimensions}</span>
                    </div>
                  )}
                  {activeArtwork.year && (
                    <div className="flex justify-between w-full gap-8 py-0.5">
                      <span className="opacity-50">Created</span>
                      <span className="font-medium">{activeArtwork.year}</span>
                    </div>
                  )}
                  {activeArtwork.status && (
                    <div className="flex justify-between w-full gap-8 py-0.5">
                      <span className="opacity-50">Status</span>
                      <span className={`font-semibold ${
                        activeArtwork.status === 'Available' || activeArtwork.status === 'For Sale' ? 'text-green-400' : 'text-neutral-400'
                      }`}>{activeArtwork.status}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default Lightbox;
