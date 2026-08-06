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
 * Archive Room (Theme-Agnostic, driven by design tokens).
 * Displays early academic works, caricature studies, and miniature crafts.
 */
const Archive = () => {
  const [activeArtwork, setActiveArtwork] = useState(null);

  // Filter artworks in 'archive' category
  const archiveArtworks = artworks.filter(art => art.category === 'archive');

  return (
    <div className="w-full bg-theme-bg text-theme-text pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>Older Works Archive | Lily May Stinson</title>
        <meta name="description" content="View the early academic and experimental creations of Lily May Stinson, containing poster colour drapery, terracotta clay, and caricature drafts." />
      </Helmet>

      <SectionContainer>
        {/* Reusable Section Header */}
        <SectionHeader 
          label="EXHIBITION ROOM 04" 
          title="Older Works Archive" 
        />

        {archiveArtworks.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-theme-border">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-theme-text-muted">
              CURATION IN PROGRESS
            </span>
            <p className="text-xs text-theme-text-muted opacity-60 mt-3 max-w-sm mx-auto">
              The archive collection is currently undergoing curation. Please check back later.
            </p>
          </div>
        ) : (
          <GalleryGrid>
            {archiveArtworks.map((art) => {
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
        )}
      </SectionContainer>

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
