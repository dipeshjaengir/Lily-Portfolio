import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPhotographyAssets } from '../utils/assets';
import { SHOW_TEMPORARY_PLACEHOLDERS } from '../data/photographyPlaceholders';
import Lightbox from '../components/Lightbox';
import { AlertCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SectionContainer from '../components/SectionContainer';
import GalleryGrid from '../components/GalleryGrid';
import GalleryCard from '../components/GalleryCard';

/**
 * Photography Room (Theme-Agnostic, driven by design tokens).
 * Renders a dynamic catalog of dynamic assets using Design System primitives.
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
    <div className="w-full bg-theme-bg text-theme-text pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>Photography Journal | Lily May Stinson</title>
        <meta name="description" content="A curated photography journal by Lily May Stinson, capturing quiet moments, lighting textures, and botanical structures." />
      </Helmet>

      <SectionContainer>
        {/* Reusable Section Header */}
        <SectionHeader 
          label="EXHIBITION ROOM 02" 
          title="Photography Journal" 
        />

        {/* Development Mode Status (Discreetly isolated info box) */}
        {SHOW_TEMPORARY_PLACEHOLDERS && photoList.some(p => !p.isLocal) && (
          <div className="mb-12 p-4 bg-theme-bg-surface border border-theme-border max-w-2xl text-[10px] font-sans tracking-widest uppercase opacity-75 flex items-center gap-3">
            <AlertCircle size={14} className="text-theme-text-muted" />
            <span>DEVELOPMENT MODE: SHOWING PLACEHOLDERS. PLACE IMAGES IN `/src/assets/artworks/photography/` TO UPDATE</span>
          </div>
        )}

        {photoList.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-theme-border">
            <p className="font-serif text-lg italic opacity-50">This photography room is currently empty.</p>
            <p className="font-sans text-[10px] opacity-40 uppercase tracking-widest mt-2">
              Waiting for client uploads to /src/assets/artworks/photography/
            </p>
          </div>
        ) : (
          <GalleryGrid>
            {photoList.map((photo) => (
              <GalleryCard
                key={photo.id}
                artwork={{
                  ...photo,
                  medium: "Photography",
                  status: "" // Photography doesn't show sold status usually
                }}
                resolvedImage={photo.url}
                onZoomClick={() => setActivePhoto(photo)}
                showStatus={false}
              />
            ))}
          </GalleryGrid>
        )}
      </SectionContainer>

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
          const selected = photoList.find(p => p.id === art.id);
          setActivePhoto(selected);
        }}
      />
    </div>
  );
};

export default Photography;
