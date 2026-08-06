import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { artworks } from '../data/artworks';
import { getArtworkImage } from '../utils/assets';
import Lightbox from '../components/Lightbox';
import Image from '../components/Image';
import { Maximize2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Paintings Room (Light Theme).
 * Renders an asymmetrical museum-catalog layout with offset alignments,
 * status details, and connects to the fullscreen Lightroom.
 */
const Paintings = () => {
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [filterMedium, setFilterMedium] = useState('All');

  // Filter artworks that belong to 'paintings' category
  const paintings = artworks.filter(art => art.category === 'paintings');

  const subMediums = ['All', 'Acrylic'];

  const filteredPaintings = filterMedium === 'All'
    ? paintings
    : paintings.filter(art => art.medium.toLowerCase().includes(filterMedium.toLowerCase()));

  return (
    <div className="w-full min-h-screen bg-warm-white dark:bg-gallery-dark text-gallery-dark dark:text-warm-white pt-32 pb-24 px-6 md:px-12 relative transition-colors duration-500">
      <Helmet>
        <title>Paintings Gallery Room | Lily May Stinson</title>
        <meta name="description" content="Explore Lily May Stinson's paintings, featuring layered gesso textures, heavy body acrylic, and plaster relief canvases." />
      </Helmet>

      {/* Page Header */}
      <header className="max-w-7xl mx-auto mb-16 md:mb-24 text-left">
        <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-gallery-dark/40 dark:text-warm-white/40 mb-3 block">
          EXHIBITION ROOM 01
        </span>
        <h1 
          className="font-serif font-light tracking-wide uppercase leading-[1.15]"
          style={{ fontSize: "clamp(1.8rem, 7vw, 4.5rem)" }}
        >
          Paintings Gallery
        </h1>

        {/* Filter Navigation */}
        <div className="flex gap-6 mt-12 border-b border-black/5 dark:border-white/5 pb-4 text-[10px] font-sans tracking-[0.2em] uppercase font-medium">
          {subMediums.map(med => (
            <button
              key={med}
              onClick={() => setFilterMedium(med)}
              className={`pb-1 transition-all relative cursor-pointer ${
                filterMedium === med ? 'text-gallery-dark dark:text-warm-white' : 'text-gallery-dark/40 dark:text-warm-white/40 hover:text-gallery-dark/70 dark:hover:text-warm-white/70'
              }`}
            >
              {med}
              {filterMedium === med && (
                <motion.div 
                  layoutId="activePaintFilter"
                  className="absolute bottom-[-5px] left-0 w-full h-[1.5px] bg-gallery-dark dark:bg-warm-white"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Redesigned Staggered Masonry Layout */}
      <section className="max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredPaintings.map((art, index) => {
            const resolvedImg = getArtworkImage(art.localPath, art.placeholderUrl);

            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className="break-inside-avoid bg-white/80 dark:bg-neutral-900/80 border border-black/5 dark:border-white/5 p-4 md:p-5 shadow-sm hover:shadow-premium transition-all duration-500 group flex flex-col relative"
              >
                {/* Image frame */}
                <div 
                  onClick={() => setActiveArtwork(art)}
                  className="relative overflow-hidden w-full bg-soft-white dark:bg-gallery-dark border border-black/[0.04] dark:border-white/[0.04] mb-5 flex items-center justify-center p-1 cursor-zoom-in transition-colors duration-500"
                >
                  {/* Floating Action Trigger on hover */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveArtwork(art);
                      }}
                      className="p-2 rounded-full bg-warm-white dark:bg-gallery-dark text-gallery-dark dark:text-warm-white shadow hover:bg-neutral-50 dark:hover:bg-neutral-900 border dark:border-white/10 cursor-pointer pointer-events-auto"
                      title="Exhibition Fullscreen"
                    >
                      <Maximize2 size={11} />
                    </button>
                    <Link
                      to={`/artwork/${art.id}`}
                      className="p-2 rounded-full bg-warm-white dark:bg-gallery-dark text-gallery-dark dark:text-warm-white shadow hover:bg-neutral-50 dark:hover:bg-neutral-900 border dark:border-white/10 cursor-pointer pointer-events-auto"
                      title="View Spec Sheet"
                    >
                      <FileText size={11} />
                    </Link>
                  </div>

                  <div className="relative w-full h-full flex items-center justify-center">
                    {art.status === 'Sold' && (
                      <div className="absolute top-3 left-3 z-10 bg-neutral-900/95 dark:bg-white/95 text-[8px] font-sans tracking-[0.25em] text-white dark:text-gallery-dark uppercase py-1 px-2.5 backdrop-blur-xs select-none">
                        SOLD
                      </div>
                    )}
                    <Image
                      src={resolvedImg}
                      alt={art.title}
                      objectFit="contain"
                      height="auto"
                      className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                </div>

                {/* Metadata Details underneath (Clean typo alignment) */}
                <div className="flex flex-col text-left px-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-serif text-base font-light tracking-wide text-gallery-dark dark:text-warm-white truncate pr-2">
                      {art.title}
                    </h3>
                    {art.year && (
                      <span className="text-[9px] font-sans opacity-45 tracking-widest uppercase">
                        {art.year}
                      </span>
                    )}
                  </div>

                  {art.medium && (
                    <p className="text-[10px] font-sans opacity-55 uppercase tracking-widest mb-3">
                      {art.medium}
                    </p>
                  )}

                  <div className="flex justify-between items-center pt-2.5 border-t border-black/5 dark:border-white/5 text-[9px] font-sans tracking-widest uppercase font-medium">
                    {art.status && (
                      <span className={`flex items-center gap-1.5 ${
                        art.status === 'Available' || art.status === 'For Sale' ? 'text-neutral-900 dark:text-warm-white font-semibold' : 'text-neutral-400 dark:text-neutral-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          art.status === 'Available' || art.status === 'For Sale' ? 'bg-neutral-900 dark:bg-warm-white' : 'bg-neutral-300 dark:bg-neutral-700'
                        }`} />
                        {art.status}
                      </span>
                    )}
                    
                    <Link
                      to={`/artwork/${art.id}`}
                      className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-warm-white transition-colors ml-auto"
                    >
                      DETAILS &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Slideshow Connection */}
      <Lightbox
        activeArtwork={activeArtwork}
        artworkList={paintings}
        onClose={() => setActiveArtwork(null)}
        onSelectArtwork={(art) => setActiveArtwork(art)}
      />
    </div>
  );
};

export default Paintings;
