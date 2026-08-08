import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { artworks } from '../data/artworks';
import { getArtworkImage } from '../utils/assets';
import Lightbox from '../components/Lightbox';
import SectionHeader from '../components/SectionHeader';
import SectionContainer from '../components/SectionContainer';
import GalleryGrid from '../components/GalleryGrid';
import GalleryCard from '../components/GalleryCard';

/**
 * Pen Art & Printmaking Room (Theme-Agnostic, driven by design tokens).
 * Renders a notebook sketchbook layout utilizing Design System primitives.
 */
const PenArt = () => {
  const [activeArtwork, setActiveArtwork] = useState(null);

  // Filter artworks in 'pen-art' category
  const penArtworks = artworks.filter(art => art.category === 'pen-art');

  return (
    <div className="w-full bg-theme-bg text-theme-text pt-32 pb-24 px-6 md:px-12 relative notebook-grid transition-colors duration-500">
      <Helmet>
        <title>Pen Art & Printmaking | Lily May Stinson</title>
        <meta name="description" content="Explore Lily May Stinson's monochrome printmaking, woodcuts, copperplate drypoint engravings, and charcoal shading drawings." />
      </Helmet>

      {/* Left side binding line (Notebook metaphor) */}
      <div className="absolute left-[3%] top-0 bottom-0 w-[1.5px] bg-red-400/20 pointer-events-none z-0 hidden md:block" />

      {/* Content wrapper with notebook-safe margins */}
      <div className="md:pl-16 relative z-10 text-left">
        <SectionContainer>
          {/* Reusable Section Header */}
          <SectionHeader 
            label="EXHIBITION ROOM 03" 
            title="Pen Art & Prints" 
          />

          {/* Standardized Gallery Grid and Cards */}
          <GalleryGrid>
            {penArtworks.map((art) => {
              const resolvedImg = getArtworkImage(art.localPath, art.placeholderUrl);

              return (
                <GalleryCard
                  key={art.id}
                  artwork={art}
                  resolvedImage={resolvedImg}
                  onZoomClick={() => setActiveArtwork(art)}
                />
              );
            })}
          </GalleryGrid>
        </SectionContainer>
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
