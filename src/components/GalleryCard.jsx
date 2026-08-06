import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import Frame from './Frame';

const GalleryCard = ({ 
  artwork, 
  resolvedImage, 
  onZoomClick, 
  linkTo,
  linkLabel = "SPEC SHEET",
  showStatus = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="group relative flex flex-col justify-between h-full"
    >
      <Frame className="p-4 md:p-5 flex flex-col justify-between h-full">
        {/* Image frame */}
        <div 
          onClick={onZoomClick}
          className="relative overflow-hidden w-full bg-theme-bg-surface border border-theme-border mb-5 flex items-center justify-center p-1 cursor-zoom-in transition-colors duration-500"
        >
          {showStatus && artwork.status === 'Sold' && (
            <div className="absolute top-3 left-3 z-10 bg-theme-text text-[8px] font-sans tracking-[0.25em] text-theme-bg uppercase py-1 px-2.5 select-none font-semibold">
              SOLD
            </div>
          )}
          {showStatus && artwork.status === 'Not For Sale' && (
            <div className="absolute top-3 left-3 z-10 bg-theme-bg-surface border border-theme-border text-[8px] font-sans tracking-[0.25em] text-theme-text-muted uppercase py-1 px-2.5 select-none">
              ARCHIVE
            </div>
          )}
          
          <img
            src={resolvedImage}
            alt={artwork.title || "Gallery Artwork"}
            className="w-full h-auto max-h-[350px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            loading="lazy"
          />

          {/* Hover zoom overlay */}
          <div className="absolute top-3 right-3 p-1.5 rounded-full bg-theme-bg-card text-theme-text shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-theme-border">
            <Maximize2 size={10} />
          </div>
        </div>

        {/* Metadata section */}
        <div className="flex flex-col text-left px-1 mt-auto">
          {artwork.title && (
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-serif text-base font-light tracking-wide text-theme-text truncate pr-2">
                {artwork.title}
              </h3>
              {artwork.year && (
                <span className="text-[9px] font-sans text-theme-text-muted opacity-60 tracking-widest uppercase">
                  {artwork.year}
                </span>
              )}
            </div>
          )}

          {artwork.medium && (
            <p className="text-[10px] font-sans text-theme-text-muted opacity-75 uppercase tracking-widest mb-3">
              {artwork.medium}
            </p>
          )}

          {/* Details border-t divider and status links */}
          <div className="pt-2.5 border-t border-theme-border flex justify-between items-center text-[9px] font-sans tracking-widest uppercase font-medium">
            {showStatus && artwork.status && (
              <span className={artwork.status === 'Available' ? 'text-theme-accent font-semibold' : 'text-theme-text-muted opacity-50'}>
                {artwork.status}
              </span>
            )}
            
            {linkTo && (
              <Link
                to={linkTo}
                className="text-theme-text hover:text-theme-accent transition-colors inline-flex items-center gap-1.5 ml-auto font-sans"
              >
                {linkLabel} <ArrowUpRight size={10} />
              </Link>
            )}
          </div>
        </div>
      </Frame>
    </motion.div>
  );
};

export default GalleryCard;
