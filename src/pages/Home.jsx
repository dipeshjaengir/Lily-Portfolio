import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { artistConfig } from '../data/config';
import { artworks } from '../data/artworks';
import { getArtworkImage } from '../utils/assets';
import Image from '../components/Image';
import Magnetic from '../components/Magnetic';
import { useTheme } from '../utils/ThemeContext';
import heroBgImage from '../assets/hero_bg.jpg';

/**
 * Home Room component (Immersive Dark Theme).
 * Renders the fullscreen hero artwork, horizontal Featured scroll,
 * and large Gateway links leading to subpages.
 */
const Home = () => {
  const containerRef = useRef(null);
  const featuredScrollRef = useRef(null);
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  // Extract featured items for Home showcase (excluding raw pen-art doodles to declutter scroll)
  const featuredArtworks = artworks.filter(art => art.featured && art.category !== 'pen-art');

  // Scroll animations for parallax effects
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroBgScale = useTransform(scrollY, [0, 800], [1.02, 1.15]);
  const initialOpacity = isDarkTheme ? 0.35 : 0.75;
  const heroBgOpacity = useTransform(scrollY, [0, 800], [initialOpacity, 0.1]);

  const scrollToFeatured = () => {
    const target = document.getElementById('featured-exhibition');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full overflow-hidden">
      <Helmet>
        <title>Lily May Stinson | Curated Visual Exhibition & Portfolio</title>
        <meta name="description" content="Immersive digital art exhibition of USA-based visual artist Lily May Stinson. Discover relief prints, modern painting, and charcoal studies." />
        <meta property="og:title" content="Lily May Stinson | Digital Art Exhibition" />
        <meta property="og:description" content="Step into a curated gallery space exploring paintings, woodcuts, and printmaking." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1501472312651-726afd116ff1?auto=format&fit=crop&q=80&w=1200" />
      </Helmet>

      {/* Cinematic Fullscreen Hero Section */}
      <section 
        data-header-dark
        className="relative min-h-[100dvh] h-[100dvh] w-full flex items-center justify-center bg-warm-white dark:bg-gallery-black overflow-hidden transition-colors duration-500"
      >
        {/* Full-bleed Background Artwork with Dark Overlay */}
        <motion.div 
          style={{ scale: heroBgScale }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <motion.div 
            style={{ opacity: heroBgOpacity }}
            className="w-full h-full"
          >
            <Image 
              src={heroBgImage} 
              alt="Lily May Stinson - Hero Artwork" 
              height="h-full"
              objectFit="cover"
              objectPosition="72% 35%"
            />
          </motion.div>
          {/* Original Heavy Vignette Overlays representing the original premium cinematic look */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-white/15 via-transparent to-transparent dark:from-gallery-dark dark:via-gallery-dark/60 dark:to-transparent transition-colors duration-500" />
          <div className="absolute inset-0 bg-transparent dark:bg-black/40 transition-colors duration-500" />
        </motion.div>

        {/* Hero Text Content */}
        <motion.div 
          style={{ y: heroTextY }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center justify-center mt-8"
        >
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-accent-yellow-border font-sans text-xs md:text-sm tracking-[0.4em] uppercase font-semibold mb-4"
          >
            {artistConfig.subtitle}
          </motion.span>
          
          <h1 
            className="font-serif font-light tracking-widest uppercase leading-[1.1] text-gallery-dark dark:text-warm-white max-w-4xl select-none transition-colors duration-500"
            style={{ fontSize: "clamp(1.75rem, 7.5vw, 5.5rem)" }}
          >
            {artistConfig.name.split(" ").map((name, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + (i * 0.15), duration: 1.2 }}
                className="inline-block mx-3"
              >
                {name}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6, duration: 1.0 }}
            className="font-sans text-xs md:text-sm leading-relaxed max-w-lg mt-8 mb-12 tracking-widest text-gallery-dark dark:text-warm-white uppercase transition-colors duration-500"
          >
            {artistConfig.tagline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <button
              onClick={scrollToFeatured}
              className="border border-gallery-dark dark:border-accent-yellow-border bg-gallery-dark dark:bg-transparent hover:bg-transparent dark:hover:bg-accent-yellow-border text-white dark:text-accent-yellow-border hover:text-gallery-dark dark:hover:text-gallery-dark font-sans text-[10px] tracking-[0.25em] uppercase py-3.5 px-9 transition-all duration-300 font-semibold cursor-pointer select-none"
            >
              Explore Exhibition
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom Smooth Scroll Indicator */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToFeatured}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 text-gallery-dark dark:text-white hover:opacity-100 transition-all duration-500"
        >
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase">SCROLL</span>
          <ArrowDown size={12} className="animate-bounce" />
        </motion.button>
      </section>

      {/* Horizontal Scrolling Featured Exhibition Room */}
      <section 
        id="featured-exhibition" 
        className="py-24 md:py-36 bg-soft-white dark:bg-gallery-dark border-t border-black/5 dark:border-white/5 transition-colors duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div>
            <span className="text-accent-yellow-border font-sans text-[10px] tracking-[0.35em] uppercase font-semibold block mb-2">
              CURATED SELECTION
            </span>
            <h2 
              className="font-serif font-light tracking-wide text-gallery-dark dark:text-warm-white uppercase leading-[1.2] transition-colors duration-500"
              style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)" }}
            >
              Featured Creations
            </h2>
          </div>
          <Link
            to="/paintings"
            className="text-[10px] font-sans tracking-widest text-accent-yellow-border uppercase font-semibold inline-flex items-center gap-2 group hover:opacity-75 transition-opacity"
          >
            EXPLORE FULL GALLERY <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal scroll slider container */}
        <div 
          ref={featuredScrollRef}
          className="w-full overflow-x-auto flex gap-8 px-6 md:px-12 pb-8 scrollbar-thin hide-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {featuredArtworks.map((art, index) => {
            const resolvedImg = getArtworkImage(art.localPath, art.placeholderUrl);
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="min-w-[280px] sm:min-w-[340px] md:min-w-[420px] aspect-[3/4] bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 p-4 flex flex-col justify-between group snap-start relative overflow-hidden transition-all duration-500"
              >
                {/* Visual frame inner outline */}
                <div className="absolute inset-2 border border-black/5 dark:border-white/5 pointer-events-none group-hover:border-accent-yellow-border/20 transition-colors duration-500" />
                
                {/* Image panel with hover perspective scale */}
                <div className="relative overflow-hidden w-full aspect-[4/5] bg-soft-white dark:bg-gallery-dark mb-4 transition-colors duration-500">
                  <Image
                    src={resolvedImg}
                    alt={art.title}
                    objectFit="cover"
                    height="h-full"
                    className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-start text-left text-gallery-dark dark:text-white px-1 transition-colors duration-500">
                  <div>
                    <h3 className="font-serif text-base font-light tracking-wide group-hover:text-accent-yellow-border transition-colors">
                      {art.title}
                    </h3>
                    <span className="text-[9px] font-sans opacity-50 uppercase tracking-widest">
                      {art.medium}
                    </span>
                  </div>
                  <Link
                    to={`/artwork/${art.id}`}
                    className="p-1 rounded-full border border-black/10 dark:border-white/10 hover:border-black/40 dark:hover:border-white/40 hover:text-accent-yellow-border text-gallery-dark dark:text-white transition-all cursor-pointer"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Gateway Exhibition Rooms Selector */}
      <section className="py-24 md:py-36 bg-warm-white dark:bg-gallery-black border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <span className="text-accent-yellow-border font-sans text-[10px] tracking-[0.35em] uppercase font-semibold block mb-8">
            EXHIBITION ROOMS
          </span>

          <div className="flex flex-col gap-4 md:gap-6 font-serif text-xl sm:text-3xl md:text-4xl font-light uppercase tracking-widest text-gallery-dark dark:text-white transition-colors duration-500">
            
            <motion.div 
              whileHover={{ x: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border-b border-black/10 dark:border-white/10 pb-4 md:pb-5 flex justify-between items-center group cursor-pointer transition-colors duration-500"
            >
              <Link to="/paintings" className="hover:text-accent-yellow-border transition-colors">
                PAINTINGS ROOM
              </Link>
              <ArrowRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-accent-yellow-border transition-all" />
            </motion.div>

            <motion.div 
              whileHover={{ x: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border-b border-black/10 dark:border-white/10 pb-4 md:pb-5 flex justify-between items-center group cursor-pointer transition-colors duration-500"
            >
              <Link to="/photography" className="hover:text-accent-yellow-border transition-colors">
                PHOTOGRAPHY JOURNAL
              </Link>
              <ArrowRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-accent-yellow-border transition-all" />
            </motion.div>

            <motion.div 
              whileHover={{ x: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border-b border-black/10 dark:border-white/10 pb-4 md:pb-5 flex justify-between items-center group cursor-pointer transition-colors duration-500"
            >
              <Link to="/pen-art" className="hover:text-accent-yellow-border transition-colors">
                PEN ART NOTEBOOK
              </Link>
              <ArrowRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-accent-yellow-border transition-all" />
            </motion.div>

            <motion.div 
              whileHover={{ x: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="pb-4 flex justify-between items-center group cursor-pointer transition-colors duration-500"
            >
              <Link to="/about" className="hover:text-accent-yellow-border transition-colors">
                ABOUT & STORY
              </Link>
              <ArrowRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-accent-yellow-border transition-all" />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
