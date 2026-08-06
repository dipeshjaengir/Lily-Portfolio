import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { artworks } from '../data/artworks';
import { artistConfig } from '../data/config';
import { getArtworkImage } from '../utils/assets';
import Frame from '../components/Frame';
import Button from '../components/Button';
import Divider from '../components/Divider';

/**
 * Artwork detail page (Theme-Agnostic, driven by design tokens).
 * Renders large full-scale presentation, specs cards, WhatsApp CTAs,
 * previous/next slide walking, and related items.
 */
const Artwork = () => {
  const { id } = useParams();
  const artwork = artworks.find(art => art.id === id);

  if (!artwork) {
    return (
      <div className="min-h-[70vh] bg-theme-bg text-theme-text flex flex-col justify-center items-center text-center px-6">
        <h2 className="font-serif text-3xl font-light mb-4">Artwork Not Found</h2>
        <p className="font-sans text-xs text-theme-text-muted mb-6">The requested piece could not be located in our records.</p>
        <Link to="/" className="text-theme-text uppercase tracking-widest text-[10px] font-semibold hover:text-theme-accent transition-colors">
          Back to Entrance
        </Link>
      </div>
    );
  }

  // Resolve current category list for previous/next walks
  const categoryArtworks = artworks.filter(art => art.category === artwork.category);
  const currentIndex = categoryArtworks.findIndex(art => art.id === artwork.id);

  const prevArtwork = categoryArtworks[(currentIndex - 1 + categoryArtworks.length) % categoryArtworks.length];
  const nextArtwork = categoryArtworks[(currentIndex + 1) % categoryArtworks.length];

  // Resolve related works (up to 3 other items in same category, excluding active one)
  const relatedArtworks = categoryArtworks.filter(art => art.id !== artwork.id).slice(0, 3);

  const resolvedImg = getArtworkImage(artwork.localPath, artwork.placeholderUrl);

  return (
    <div className="w-full bg-theme-bg text-theme-text pt-32 pb-24 px-6 md:px-12 text-left transition-colors duration-500">
      <Helmet>
        <title>{artwork.title ? `${artwork.title} | Lily May Stinson` : 'Artwork Exhibit | Lily May Stinson'}</title>
        <meta name="description" content={artwork.title ? `${artwork.title} - ${artwork.medium || ''} (${artwork.year || ''}) by Lily May Stinson. ${artwork.description || ''}` : "Portfolio item by visual artist Lily May Stinson."} />
      </Helmet>

      {/* Back Navigation link */}
      <div className="max-w-7xl mx-auto mb-12">
        <Link
          to={`/${artwork.category === 'paintings' ? 'paintings' : artwork.category === 'pen-art' ? 'pen-art' : artwork.category === 'custom' ? 'commissions' : 'archive'}`}
          className="inline-flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase font-semibold text-theme-text-muted hover:text-theme-text transition-colors"
        >
          <ArrowLeft size={12} /> BACK TO COLLECTION ROOM
        </Link>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
        
        {/* Left Column: Image viewer wrapped in Frame */}
        <div className="lg:col-span-7">
          <Frame className="p-4 md:p-6 relative flex items-center justify-center">
            {/* Inner crop lines */}
            <div className="absolute inset-3.5 border border-theme-border opacity-60 pointer-events-none" />
            
            <div className="w-full flex items-center justify-center p-1.5 bg-theme-bg-surface border border-theme-border transition-colors duration-500">
              <img
                src={resolvedImg}
                alt={artwork.title || "Artwork composition"}
                className="max-w-full max-h-[65vh] w-auto h-auto object-contain transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>
          </Frame>
        </div>

        {/* Right Column: Spec metadata */}
        <div className="lg:col-span-5 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-theme-border pt-12 lg:pt-0 lg:pl-16">
          {artwork.status === 'Sold' && (
            <div className="inline-block bg-theme-text text-theme-bg font-sans text-[9px] tracking-[0.25em] uppercase py-1.5 px-4 mb-5 select-none font-semibold w-max">
              SOLD
            </div>
          )}

          {artwork.medium && (
            <span className="text-[10px] font-sans tracking-[0.35em] text-theme-accent uppercase font-semibold block mb-2">
              {artwork.medium}
            </span>
          )}

          {artwork.title && (
            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase leading-tight text-theme-text mb-6">
              {artwork.title}
            </h1>
          )}
          
          {artwork.description && (
            <p className="font-sans text-xs md:text-sm leading-relaxed text-theme-text-muted tracking-wider mb-8">
              {artwork.description}
            </p>
          )}

          {/* Details list card */}
          <div className="border-y border-theme-border py-6 my-6 flex flex-col gap-4 font-sans text-[11px] tracking-wider uppercase">
            {artwork.year && (
              <div className="flex justify-between items-center">
                <span className="text-theme-text-muted font-medium">Year Created</span>
                <span className="text-theme-text font-semibold">{artwork.year}</span>
              </div>
            )}
            {artwork.dimensions && (
              <div className="flex justify-between items-center">
                <span className="text-theme-text-muted font-medium">Dimensions</span>
                <span className="text-theme-text font-semibold">{artwork.dimensions}</span>
              </div>
            )}
            {artwork.status && (
              <div className="flex justify-between items-center">
                <span className="text-theme-text-muted font-medium">Availability Status</span>
                <span className={`font-semibold ${
                  artwork.status === 'Available' || artwork.status === 'For Sale' ? 'text-theme-accent' : 'text-theme-text-muted opacity-60'
                }`}>{artwork.status}</span>
              </div>
            )}
          </div>

          {/* WhatsApp acquisition trigger */}
          {(artwork.status === 'Available' || artwork.status === 'For Sale') && (
            <div className="mt-4">
              <Button
                href={`https://wa.me/${artistConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20Lily,%20I'm%20interested%20in%20acquiring%20your%20artwork%20"${encodeURIComponent(artwork.title || 'Untitled Project')}"%20(${artwork.id})`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full gap-2.5"
              >
                INQUIRE ABOUT ACQUISITION <MessageCircle size={14} />
              </Button>
            </div>
          )}
        </div>

      </div>

      {/* Previous / Next exhibit navigation */}
      {categoryArtworks.length > 1 && (
        <section className="max-w-7xl mx-auto border-t border-theme-border py-10 flex justify-between items-center font-sans text-[10px] tracking-widest uppercase font-semibold text-theme-text-muted">
          <Link 
            to={`/artwork/${prevArtwork.id}`}
            className="hover:text-theme-text transition-colors inline-flex items-center gap-1.5"
          >
            &larr; PREVIOUS EXHIBIT
          </Link>
          <span className="hidden sm:inline opacity-30">|</span>
          <Link 
            to={`/artwork/${nextArtwork.id}`}
            className="hover:text-theme-text transition-colors inline-flex items-center gap-1.5"
          >
            NEXT EXHIBIT &rarr;
          </Link>
        </section>
      )}

      {/* Related Artworks Panel */}
      {relatedArtworks.length > 0 && (
        <section className="max-w-7xl mx-auto border-t border-theme-border pt-16">
          <h3 className="font-serif text-xl uppercase tracking-wider text-theme-text mb-8">
            Related Expositions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedArtworks.map(art => {
              const relatedImg = getArtworkImage(art.localPath, art.placeholderUrl);
              return (
                <div key={art.id} className="flex flex-col group text-left">
                  <Link to={`/artwork/${art.id}`} className="block relative mb-4">
                    <Frame className="p-3">
                      <div className="relative overflow-hidden aspect-[4/5] bg-theme-bg-surface border border-theme-border flex items-center justify-center p-1">
                        <img
                          src={relatedImg}
                          alt={art.title}
                          className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                        />
                      </div>
                    </Frame>
                  </Link>
                  <h4 className="font-serif text-sm font-light uppercase tracking-wide text-theme-text mt-2">
                    {art.title}
                  </h4>
                  <span className="text-[9px] font-sans text-theme-text-muted uppercase tracking-widest mt-1">
                    {art.medium}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};

export default Artwork;
