import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { artworks } from '../data/artworks';
import { getArtworkImage } from '../utils/assets';
import Lightbox from '../components/Lightbox';
import SectionHeader from '../components/SectionHeader';
import SectionContainer from '../components/SectionContainer';
import GalleryGrid from '../components/GalleryGrid';
import GalleryCard from '../components/GalleryCard';

/**
 * Paintings Room (Theme-Agnostic, driven by design tokens).
 * Renders an asymmetrical museum-catalog layout utilizing Design System primitives.
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
    <div className="w-full bg-theme-bg text-theme-text pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>Paintings Gallery Room | Lily May Stinson</title>
        <meta name="description" content="Explore Lily May Stinson's paintings, featuring layered gesso textures, heavy body acrylic, and plaster relief canvases." />
      </Helmet>

      <SectionContainer>
        {/* Reusable Section Header */}
        <SectionHeader 
          label="EXHIBITION ROOM 01" 
          title="Paintings Gallery" 
        />

        {/* Filter Navigation */}
        <div className="flex gap-6 mb-12 border-b border-theme-border pb-4 text-[10px] font-sans tracking-[0.2em] uppercase font-medium">
          {subMediums.map(med => (
            <button
              key={med}
              onClick={() => setFilterMedium(med)}
              className={`pb-1 transition-all relative cursor-pointer ${
                filterMedium === med ? 'text-theme-text' : 'text-theme-text-muted hover:text-theme-text'
              }`}
            >
              {med}
              {filterMedium === med && (
                <motion.div 
                  layoutId="activePaintFilter"
                  className="absolute bottom-[-5px] left-0 w-full h-[1.5px] bg-theme-text"
                />
              )}
            </button>
          ))}
        </div>

        {/* Standardized Gallery Grid and Cards */}
        <GalleryGrid>
          {filteredPaintings.map((art) => {
            const resolvedImg = getArtworkImage(art.localPath, art.placeholderUrl);

            return (
              <GalleryCard
                key={art.id}
                artwork={art}
                resolvedImage={resolvedImg}
                onZoomClick={() => setActiveArtwork(art)}
                linkTo={`/artwork/${art.id}`}
              />
            );
          })}
        </GalleryGrid>
      </SectionContainer>

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
