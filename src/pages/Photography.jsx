import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getPhotographyAssets } from '../utils/assets';
import { SHOW_TEMPORARY_PLACEHOLDERS } from '../data/photographyPlaceholders';
import Lightbox from '../components/Lightbox';
import { Maximize2, AlertCircle } from 'lucide-react';

/**
 * Photography Room (Light Theme).
 * Renders an editorial photography journal layout (large vertical spans, side notes)
 * and scans the local assets directory dynamically for client uploads.
 */
const Photography = () => {
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoList, setPhotoList] = useState([]);

  // Fetch photography assets dynamically
  useEffect(() => {
    const assets = getPhotographyAssets();
    setPhotoList(assets);
  }, []);

  return (
    <div className="w-full text-gallery-dark dark:text-warm-white pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>Photography Journal | Lily May Stinson</title>
        <meta name="description" content="A curated photography journal by Lily May Stinson, capturing quiet moments, lighting textures, and botanical structures." />
      </Helmet>

      {/* Page Header */}
      <header className="max-w-7xl mx-auto mb-20 md:mb-28 text-left">
        <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-gallery-dark/40 dark:text-warm-white/40 mb-3 block">
          EXHIBITION ROOM 02
        </span>
        <h1 
          className="font-serif font-light tracking-wide uppercase leading-[1.15]"
          style={{ fontSize: "clamp(1.8rem, 7vw, 4.5rem)" }}
        >
          Photography Journal
        </h1>

        {/* Development Mode Status (Discreetly isolated info box) */}
        {SHOW_TEMPORARY_PLACEHOLDERS && photoList.some(p => !p.isLocal) && (
          <div className="mt-8 p-4 bg-accent-yellow border border-accent-yellow-border/20 max-w-2xl text-[10px] font-sans tracking-widest uppercase opacity-75 flex items-center gap-3">
            <AlertCircle size={14} className="text-gallery-dark/60" />
            <span>DEVELOPMENT MODE: SHOWING ISOLATED PLACEHOLDERS. TO REMOVE, PLACE ARTWORKS IN `/src/assets/artworks/photography/` AND SET FLAG IN `photographyPlaceholders.js`</span>
          </div>
        )}
      </header>

      {/* Editorial Journal Layout */}
      <section className="max-w-7xl mx-auto">
        {photoList.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-black/10 dark:border-white/10">
            <p className="font-serif text-lg italic opacity-50">This photography room is currently empty.</p>
            <p className="font-sans text-[10px] opacity-40 uppercase tracking-widest mt-2">
              Waiting for client uploads to /src/assets/artworks/photography/
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-12 space-y-12">
            {photoList.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                className="break-inside-avoid bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 p-2 flex flex-col justify-between hover:shadow-premium transition-all duration-500 group relative cursor-zoom-in"
                onClick={() => setActivePhoto(photo)}
              >
                {/* Photo Element */}
                <div className="relative overflow-hidden bg-neutral-50 dark:bg-gallery-dark flex items-center justify-center p-0.5 transition-colors duration-500">
                  <img
                    src={photo.url}
                    alt={photo.title || "Curated photograph"}
                    className="w-full h-auto object-contain transition-transform duration-[1.2s] ease-out group-hover:scale-[1.015]"
                  />
                  
                  {/* Subtle minimalist overlay hover animation */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500 flex items-center justify-center">
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gallery-dark/95 text-gallery-dark dark:text-warm-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <Maximize2 size={12} />
                    </div>
                  </div>
                </div>

                {/* Minimal UI: Render metadata ONLY if present */}
                {(photo.title || photo.description || photo.year) && (
                  <div className="text-left font-sans text-[10px] tracking-wider uppercase opacity-60 mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex flex-col gap-1">
                    {photo.title && (
                      <h3 className="font-serif text-sm font-light tracking-wide text-neutral-900 dark:text-warm-white normal-case">
                        {photo.title}
                      </h3>
                    )}
                    {photo.description && (
                      <p className="text-[9px] opacity-75 normal-case font-light leading-relaxed">
                        {photo.description}
                      </p>
                    )}
                    {photo.year && (
                      <span className="text-[8px] opacity-50">
                        {photo.year}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox component */}
      <Lightbox
        activeArtwork={activePhoto}
        artworkList={photoList.map(p => ({
          ...p,
          placeholderUrl: p.url, // Adapting photo fields to lightbox expectation
          medium: "Photography"
        }))}
        onClose={() => setActivePhoto(null)}
        onSelectArtwork={(art) => {
          // Map back to photo schema
          const selected = photoList.find(p => p.id === art.id);
          setActivePhoto(selected);
        }}
      />
    </div>
  );
};

export default Photography;
