import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';
import { artistConfig } from '../data/config';

// Custom inline SVG for Instagram to avoid dependency export mismatches
const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/**
 * Main Layout component.
 * Dynamic theme wrapper that locks the Home page to dark and subpages to light.
 * Renders the global layout grid, custom cursor trail, scroll progress tracker, and back-to-top actions.
 */
const MainLayout = () => {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isHome = location.pathname === '/';
  const { inverted } = useTheme();
  const isDarkPage = isHome ? !inverted : inverted;

  // Monitor scroll for progress and top trigger
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Trigger back-to-top visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`relative min-h-screen flex flex-col justify-between transition-colors duration-700 ${
        isDarkPage 
          ? 'bg-gallery-dark text-warm-white dark-theme-scroll theme-dark' 
          : 'bg-warm-white text-gallery-dark theme-light'
      }`}
    >
      {/* Scroll Progress Indicator Bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] z-[9999] transition-all duration-100 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          backgroundColor: isDarkPage ? 'var(--color-accent-yellow-border)' : 'var(--color-gallery-dark)'
        }}
        aria-hidden="true"
      />

      {/* Dynamic Cursor Trail */}
      <CustomCursor />

      {/* Premium Navigation Header */}
      <Navbar />

      {/* Main Exhibition Area */}
      <main className="relative z-10 w-full flex-grow">
        <Outlet />
      </main>

      {/* Luxury Minimal Footer */}
      <Footer />

      {/* Floating Quick Action Group */}
      <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-3 items-center">
        {artistConfig.contact.email && (
          <a
            href={`mailto:${artistConfig.contact.email}`}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center ${
              isDarkPage
                ? 'bg-gallery-dark border-white/10 hover:border-white text-white hover:bg-neutral-900'
                : 'bg-warm-white border-black/10 hover:border-black text-gallery-dark hover:bg-neutral-50'
            }`}
            title="Email Lily"
            aria-label="Send email"
          >
            <Mail size={15} />
          </a>
        )}

        <a
          href={artistConfig.contact.instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center ${
            isDarkPage
              ? 'bg-gallery-dark border-white/10 hover:border-white text-white hover:bg-neutral-900'
              : 'bg-warm-white border-black/10 hover:border-black text-gallery-dark hover:bg-neutral-50'
          }`}
          title="Instagram"
          aria-label="Instagram profile"
        >
          <InstagramIcon size={15} />
        </a>

        <a
          href={`https://wa.me/${artistConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center ${
            isDarkPage
              ? 'bg-gallery-dark border-white/10 hover:border-white text-white hover:bg-neutral-900'
              : 'bg-warm-white border-black/10 hover:border-black text-gallery-dark hover:bg-neutral-50'
          }`}
          title="WhatsApp Chat"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle size={15} />
        </a>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center ${
              isDarkPage
                ? 'bg-gallery-dark border-white/10 hover:border-white text-white hover:bg-neutral-900'
                : 'bg-warm-white border-black/10 hover:border-black text-gallery-dark hover:bg-neutral-50'
            }`}
            title="Scroll to Top"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
