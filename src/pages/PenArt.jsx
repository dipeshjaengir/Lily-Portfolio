import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { artworks } from '../data/artworks';
import { getArtworkImage } from '../utils/assets';
import Lightbox from '../components/Lightbox';
import Image from '../components/Image';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Pen Art & Printmaking Room (Light Theme).
 * Renders a notebook sketchbook layout (grid background, binding margins)
 * showing monochrome etchings, charcoal studies, and hand carvings.
 */
const PenArt = () => {
  const [activeArtwork, setActiveArtwork] = useState(null);

  // Filter artworks in 'pen-art' category
  const penArtworks = artworks.filter(art => art.category === 'pen-art');

  return (
    <div className="w-full min-h-screen bg-warm-white text-gallery-dark pt-32 pb-24 px-6 md:px-12 relative notebook-grid">
      <Helmet>
        <title>Pen Art & Printmaking | Lily May Stinson</title>
        <meta name="description" content="Explore Lily May Stinson's monochrome printmaking, woodcuts, copperplate drypoint engravings, and charcoal shading drawings." />
      </Helmet>

      {/* Left side binding line (Notebook metaphor) */}
      <div className="absolute left-[3%] top-0 bottom-0 w-[1.5px] bg-red-400/20 pointer-events-none z-0 hidden md:block" />

      {/* Content wrapper with notebook-safe margins */}
      <div className="max-w-7xl mx-auto md:pl-16 relative z-10 text-left">
        
        {/* Page Header */}
        <header className="mb-20 md:mb-28">
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-gallery-dark/40 mb-3 block">
            EXHIBITION ROOM 03
          </span>
          <h1 className="font-serif text-4xl md:text-7xl font-light tracking-wide uppercase leading-tight select-none">
            Pen Art & Prints
          </h1>
        </header>

        {/* Notebook-styled Asymmetrical Catalog - Staggered columns to preserve original aspect ratios */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {penArtworks.map((art, index) => {
            const resolvedImg = getArtworkImage(art.localPath, art.placeholderUrl);

            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className="break-inside-avoid bg-white/80 border border-black/5 p-4 md:p-6 shadow-sm hover:shadow-premium transition-all duration-500 relative group flex flex-col justify-between"
              >
                {/* Visual frame inner grid details */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-black/5 pointer-events-none" />

                {/* Image - Natural aspect ratio container */}
                <div 
                  onClick={() => setActiveArtwork(art)}
                  className="relative overflow-hidden bg-neutral-50/50 mb-4 border border-black/5 cursor-zoom-in flex items-center justify-center p-1"
                >
                  {art.status === 'Sold' && (
                    <div className="absolute top-4 left-4 z-10 bg-neutral-900/95 text-[8px] font-sans tracking-[0.25em] text-white uppercase py-1 px-2.5 backdrop-blur-xs select-none">
                      SOLD
                    </div>
                  )}
                  <Image
                    src={resolvedImg}
                    alt={art.title || "Sketchbook Study"}
                    objectFit="contain"
                    height="auto"
                    className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                  
                  {/* Floating Action Trigger on hover */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/95 text-gallery-dark shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Maximize2 size={11} />
                  </div>
                </div>

                {/* Details resembling sketchbook labels - Shown only if metadata exists */}
                {art.title && (
                  <div className="text-left font-sans text-xs pt-2">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-serif text-base font-light tracking-wide uppercase">
                        {art.title}
                      </h3>
                      {art.year && <span className="text-[9px] opacity-45">{art.year}</span>}
                    </div>

                    {art.medium && (
                      <p className="text-[9px] opacity-50 uppercase tracking-wider mb-4">
                        {art.medium}
                      </p>
                    )}

                    <div className="pt-3 border-t border-black/5 flex justify-between items-center text-[9px] tracking-widest uppercase">
                      {art.status && (
                        <span className={art.status === 'Available' ? 'text-black font-semibold' : 'text-neutral-400'}>
                          {art.status}
                        </span>
                      )}
                      <Link
                        to={`/artwork/${art.id}`}
                        className="hover:text-neutral-500 transition-colors inline-flex items-center gap-1.5 ml-auto"
                      >
                        SPEC SHEET <ArrowUpRight size={10} />
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox connected */}
      <Lightbox
        activeArtwork={activeArtwork}
        artworkList={penArtworks}
        onClose={() => setActiveArtwork(null)}
        onSelectArtwork={(art) => setActiveArtwork(art)}
      />
    </div>
  );
};

export default PenArt;
