import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { artistConfig } from '../data/config';
import { getProfileImage } from '../utils/assets';
import Frame from '../components/Frame';
import SectionHeader from '../components/SectionHeader';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';
import Divider from '../components/Divider';

/**
 * About Room (Theme-Agnostic, driven by design tokens).
 * Showcases the portrait image inside a museum-like hanging frame,
 * followed by her real creative story, and an elegant inquiry CTA.
 */
const About = () => {
  const profileImg = getProfileImage(artistConfig.about.profileImage);
  const story = artistConfig.about.story;

  return (
    <div className="w-full bg-theme-bg text-theme-text pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>About Lily May Stinson | Artist Philosophy & Story</title>
        <meta name="description" content="Discover the artistic identity and biography of Lily May Stinson, exploring her specialized printmaking and sensory inspiration." />
      </Helmet>

      {/* Standardized Section Container */}
      <SectionContainer>
        
        {/* Reusable Section Header */}
        <SectionHeader 
          label="THE ARTIST BEHIND THE EXCHANGES" 
          title="Biography & Philosophy" 
        />

        {/* 1. Artist Image & Biography Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Column: Portrait Image in Museum Casing */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[380px] lg:max-w-full"
            >
              {/* Reusable Frame Primitives */}
              <Frame className="p-3 md:p-4">
                <div className="relative overflow-hidden w-full aspect-[4/5] bg-theme-bg-surface border border-theme-border flex items-center justify-center p-1">
                  {profileImg ? (
                    <img 
                      src={profileImg} 
                      alt="Lily May Stinson Portrait" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-theme-bg flex items-center justify-center text-[10px] tracking-widest text-theme-text-muted">
                      PORTRAIT PENDING
                    </div>
                  )}
                </div>
              </Frame>
            </motion.div>
          </div>

          {/* Right Column: Editorial Biography / Creative Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Biography text is null, so we omit biography and proceed directly to Creative Philosophy Story */}
            {story && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-left"
              >
                <span className="text-[9px] font-sans tracking-[0.25em] text-theme-accent uppercase font-semibold block mb-4">
                  {story.title || "CREATIVE STATEMENT"}
                </span>

                <div className="font-serif text-lg md:text-xl font-light text-theme-text-muted leading-relaxed space-y-6 md:space-y-8 italic">
                  {story.paragraphs && story.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* 2. Divider Line separating sections */}
        <Divider className="my-20" />

        {/* 3. Contact & Inquiry CTA Block */}
        <div className="w-full flex flex-col items-center text-center max-w-2xl mx-auto py-8">
          <span className="text-[10px] font-sans tracking-[0.3em] text-theme-text-muted uppercase font-semibold block mb-4">
            ACQUIRE & INQUIRE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-theme-text mb-6 uppercase">
            Curate Into Your Space
          </h2>
          <p className="font-sans text-[11px] tracking-wider text-theme-text-muted max-w-md leading-relaxed mb-8 uppercase">
            Direct sales and private commissions are available by contacting the artist.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {artistConfig.contact.whatsapp && (
              <Button 
                href={`https://wa.me/${artistConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                WHATSAPP CHAT
              </Button>
            )}
            <Button 
              href="/contact"
              variant="outline"
            >
              CONTACT ROOM
            </Button>
          </div>
        </div>

      </SectionContainer>
    </div>
  );
};

export default About;
