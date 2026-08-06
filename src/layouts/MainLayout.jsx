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

  const { theme, setHeaderStyle } = useTheme();
  const isDarkPage = theme === 'dark';

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

  // Setup global IntersectionObserver to detect when header overlays data-header-dark sections
  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-header-dark]');
    
    if (darkSections.length === 0) {
      setHeaderStyle('solid');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -95% 0px', // Target the very top of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      let isOverDark = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isOverDark = true;
        }
      });
      setHeaderStyle(isOverDark ? 'transparent-overlay' : 'solid');
    }, observerOptions);

    darkSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, setHeaderStyle]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`relative min-h-screen flex flex-col justify-between overflow-x-hidden transition-colors duration-700 bg-theme-bg text-theme-text ${
        isDarkPage ? 'dark-theme-scroll' : ''
      }`}
    >
      {/* Scroll Progress Indicator Bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] z-[9999] bg-gallery-dark dark:bg-accent-yellow-border transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
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

      {/* Floating Quick Action Group with Safe Area margin */}
      <div 
        className="fixed right-4 sm:right-8 z-[90] flex flex-col gap-2.5 sm:gap-3 items-center"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      >
        {artistConfig.contact.email && (
          <a
            href={`mailto:${artistConfig.contact.email}`}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-gallery-dark dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center"
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
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-gallery-dark dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center"
          title="Instagram"
          aria-label="Instagram profile"
        >
          <InstagramIcon size={15} />
        </a>

        <a
          href={`https://wa.me/${artistConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-gallery-dark dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center"
          title="WhatsApp Chat"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle size={15} />
        </a>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 text-gallery-dark dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:translate-y-[-2px] flex items-center justify-center"
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
