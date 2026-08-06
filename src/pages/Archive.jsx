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
 * Archive Room (Light Theme).
 * Displays early academic works, live caricature studies, and miniature crafts
 * in a clean museum archive index.
 */
const Archive = () => {
  const [activeArtwork, setActiveArtwork] = useState(null);

  // Filter artworks in 'archive' category
  const archiveArtworks = artworks.filter(art => art.category === 'archive');

  return (
    <div className="w-full min-h-screen bg-warm-white dark:bg-gallery-dark text-gallery-dark dark:text-warm-white pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>Older Works Archive | Lily May Stinson</title>
        <meta name="description" content="View the early academic and experimental creations of Lily May Stinson, containing poster colour drapery, terracotta clay, and caricature drafts." />
      </Helmet>

      {/* Page Header */}
      <header className="max-w-7xl mx-auto mb-20 md:mb-28 text-left">
        <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-gallery-dark/40 dark:text-warm-white/40 mb-3 block">
          EXHIBITION ROOM 04
        </span>
        <h1 
          className="font-serif font-light tracking-wide uppercase leading-[1.15]"
          style={{ fontSize: "clamp(1.8rem, 7vw, 4.5rem)" }}
        >
          Older Works Archive
        </h1>
      </header>

      {/* Clean Grid Presentation - Staggered columns to preserve original aspect ratios */}
      <section className="max-w-7xl mx-auto">
        {archiveArtworks.length === 0 ? (
          <div className="py-24 text-center border-t border-black/5 dark:border-white/5 font-sans">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-neutral-400">
              Information Coming Soon
            </span>
            <p className="text-xs opacity-60 mt-3 max-w-sm mx-auto">
              The archive collection is currently undergoing curation. Please check back later.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {archiveArtworks.map((art, index) => {
              const resolvedImg = getArtworkImage(art.localPath, art.placeholderUrl);

              return (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="break-inside-avoid bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 p-4 flex flex-col justify-between hover:shadow-premium transition-all duration-500 group relative"
                >
                  {/* Image */}
                  <div 
                    onClick={() => setActiveArtwork(art)}
                    className="relative overflow-hidden bg-neutral-50 dark:bg-gallery-dark mb-4 border border-black/5 dark:border-white/5 cursor-zoom-in flex items-center justify-center p-1 transition-colors duration-500"
                  >
                    {art.status === 'Sold' && (
                      <div className="absolute top-3 left-3 z-10 bg-neutral-900/95 dark:bg-white/95 text-[8px] font-sans tracking-[0.25em] text-white dark:text-gallery-dark uppercase py-1 px-2.5 backdrop-blur-xs select-none">
                        SOLD
                      </div>
                    )}
                    {art.status === 'Not For Sale' && (
                      <div className="absolute top-3 left-3 z-10 bg-neutral-100 dark:bg-neutral-800/85 text-[8px] font-sans tracking-[0.25em] text-gallery-dark dark:text-warm-white border border-black/5 dark:border-white/5 uppercase py-1 px-2.5 backdrop-blur-xs select-none">
                        ARCHIVE
                      </div>
                    )}
                    <Image
                      src={resolvedImg}
                      alt={art.title || "Archive Work"}
                      objectFit="contain"
                      height="auto"
                      className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                    />
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-gallery-dark/95 text-gallery-dark dark:text-warm-white shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border dark:border-white/10">
                      <Maximize2 size={10} />
                    </div>
                  </div>

                  {/* Details underneath - Show only if metadata is present */}
                  <div className="text-left font-sans text-xs pt-1">
                    {art.title && (
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-serif text-base font-light tracking-wide text-gallery-dark dark:text-warm-white truncate pr-2">
                          {art.title}
                        </h3>
                        {art.year && <span className="text-[9px] opacity-45">{art.year}</span>}
                      </div>
                    )}

                    {art.medium && (
                      <p className="text-[9px] opacity-50 uppercase tracking-wider mb-3">
                        {art.medium}
                      </p>
                    )}

                    <div className="pt-2.5 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[9px] tracking-widest uppercase">
                      {art.status && (
                        <span className="opacity-50 font-medium">
                          {art.status}
                        </span>
                      )}
                      <Link
                        to={`/artwork/${art.id}`}
                        className="hover:text-neutral-500 dark:hover:text-warm-white transition-colors inline-flex items-center gap-1.5 ml-auto"
                      >
                        SPEC SHEET <ArrowUpRight size={10} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox connected */}
      <Lightbox
        activeArtwork={activeArtwork}
        artworkList={archiveArtworks}
        onClose={() => setActiveArtwork(null)}
        onSelectArtwork={(art) => setActiveArtwork(art)}
      />
    </div>
  );
};

export default Archive;
