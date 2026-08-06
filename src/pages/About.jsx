import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { artistConfig } from '../data/config';
import { getProfileImage } from '../utils/assets';
import { Trophy, Compass, Star, Eye } from 'lucide-react';

/**
 * About Room (Light Theme).
 * Showcases the portrait image inside a museum-like hanging frame.
 * Narrates Lily's artistic philosophy and the resilience story of her mother's vision loss.
 */
const About = () => {
  const profileImg = getProfileImage(artistConfig.about.profileImage);

  return (
    <div className="w-full min-h-screen bg-warm-white dark:bg-gallery-dark text-gallery-dark dark:text-warm-white pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>About Lily May Stinson | Artist Philosophy & Story</title>
        <meta name="description" content="Discover the artistic identity and biography of Lily May Stinson, exploring her specialized printmaking and sensory inspiration." />
      </Helmet>

      {/* Page Layout Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <header className="mb-16 md:mb-24 text-left">
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-gallery-dark/40 mb-3 block">
            THE ARTIST BEHIND THE EXCHANGES
          </span>
          <h1 
            className="font-serif font-light tracking-wide uppercase leading-[1.15]"
            style={{ fontSize: "clamp(1.8rem, 7vw, 4.5rem)" }}
          >
            Biography & Philosophy
          </h1>
        </header>

        {/* Top Portrait & Bio Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24 md:mb-36">
          
          {/* Left Column: Profile Picture styled as hung art */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] aspect-[4/5] bg-white dark:bg-neutral-900 p-5 border border-black/5 dark:border-white/5 shadow-premium transition-colors duration-500"
            >
              {/* Inner frame margins */}
              <div className="absolute inset-3 border border-black/5 dark:border-white/5 pointer-events-none transition-colors duration-500" />
              <div className="absolute inset-4.5 border border-black/[0.02] dark:border-white/[0.02] pointer-events-none transition-colors duration-500" />
              
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={profileImg}
                  alt={artistConfig.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 15%' }} // Centers portrait composition nicely
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Details */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center lg:pt-4">
            {artistConfig.about.bio && (
              <>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wider mb-6 text-neutral-800 dark:text-warm-white"
                >
                  {artistConfig.about.title}
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="font-sans text-xs md:text-sm leading-relaxed opacity-60 tracking-wider mb-6"
                >
                  {artistConfig.about.bio}
                </motion.p>
              </>
            )}

            {/* Philosophy quote board */}
            {artistConfig.philosophy && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-y border-black/5 dark:border-white/5 py-8 my-6 relative pl-8 font-serif text-lg md:text-2xl font-light italic tracking-wide opacity-80"
              >
                <div className="absolute left-0 top-6 text-4xl text-black/20 dark:text-white/20 select-none">“</div>
                "{artistConfig.philosophy.quote}"
                <span className="block font-sans text-[10px] tracking-[0.25em] uppercase font-semibold text-neutral-500 mt-3 not-italic">
                  &mdash; {artistConfig.philosophy.author}
                </span>
              </motion.div>
            )}
          </div>

        </section>

        {/* Narrative Story (Mother's resilience & Gratitude) */}
        <section className="bg-neutral-50 dark:bg-gallery-black/40 border-y border-black/[0.03] dark:border-white/[0.03] py-24 md:py-32 px-6 md:px-12 mb-24 md:mb-36 text-left transition-colors duration-500">
          <div className="max-w-4xl mx-auto">
            <span className="text-[9px] font-sans tracking-[0.3em] text-neutral-400 uppercase font-semibold block mb-4">
              ARTISTIC RESILIENCE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light uppercase tracking-widest text-neutral-800 dark:text-warm-white mb-10">
              {artistConfig.about.story.title}
            </h2>

            <div className="flex flex-col gap-8 font-sans text-xs md:text-sm leading-relaxed opacity-60 tracking-wider">
              {artistConfig.about.story.paragraphs.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline & Stats Grid */}
        {(artistConfig.timeline?.length > 0 || artistConfig.statistics?.length > 0) && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-12">
            
            {/* Left Column: Academic Exhibits Timeline */}
            {artistConfig.timeline?.length > 0 && (
              <div className="lg:col-span-7 text-left">
                <h2 className="font-serif text-2xl uppercase tracking-wider mb-10 text-neutral-800 dark:text-warm-white">
                  Exhibitions & Timeline
                </h2>

                <div className="flex flex-col gap-8 relative border-l border-black/5 dark:border-white/5 pl-6 ml-2 font-sans text-xs">
                  {artistConfig.timeline.map((event, idx) => (
                    <div key={idx} className="relative py-1">
                      {/* Timeline dot */}
                      <div className="absolute left-[-29px] top-2.5 w-2 h-2 rounded-full bg-gallery-dark dark:bg-warm-white border border-warm-white dark:border-gallery-dark" />
                      
                      <span className="text-[10px] font-semibold tracking-wider text-neutral-500 block mb-1">
                        {event.year}
                      </span>
                      <h4 className="font-serif text-base uppercase font-light text-neutral-900 dark:text-warm-white mb-1.5">
                        {event.title}
                      </h4>
                      <p className="opacity-60 leading-relaxed tracking-wider">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right Column: Statistics Cards */}
            {artistConfig.statistics?.length > 0 && (
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {artistConfig.statistics.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 p-6 md:p-8 flex flex-col justify-center text-left shadow-sm relative group hover:shadow-md transition-all duration-300"
                  >
                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-black/10 dark:border-white/10" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-black/10 dark:border-white/10" />

                    <span className="font-serif text-3xl md:text-4xl font-light tracking-wide text-neutral-800 dark:text-warm-white mb-2">
                      {stat.value}
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.2em] opacity-50 uppercase font-semibold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </section>
        )}

      </div>
    </div>
  );
};

export default About;
