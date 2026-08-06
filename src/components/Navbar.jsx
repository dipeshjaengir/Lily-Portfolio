import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTheme } from '../utils/ThemeContext';
import { artistConfig } from '../data/config';
import Logo from './Logo';

/**
 * Editorial Top Navigation component.
 * Features hover underlines, responsive hamburger navigation, 
 * and transparent-to-solid transitions mapped to page themes.
 */
const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [isOverDarkSection, setIsOverDarkSection] = useState(false);

  const isHome = location.pathname === '/';
  const isDarkTheme = theme === 'dark';
  const isDarkHeader = isDarkTheme || isOverDarkSection;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Paintings', path: '/paintings' },
    { name: 'Photography', path: '/photography' },
    { name: 'Pen Art', path: '/pen-art' },
    { name: 'Archive', path: '/archive' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Section ownership state machine
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -90% 0px', // Target the top 10% header area
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If the element entering the top header area is marked as data-header-dark
          setIsOverDarkSection(entry.target.hasAttribute('data-header-dark'));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const observeSections = () => {
      // Observe all section elements and elements explicitly marked for header color toggle
      const targets = document.querySelectorAll('section, [data-header-dark], [data-header-light]');
      targets.forEach(t => observer.observe(t));
    };

    // Initial check
    observeSections();

    // DOM Mutation observer to handle transitions and dynamic renders
    const mutObserver = new MutationObserver(observeSections);
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObserver.disconnect();
    };
  }, [location.pathname]);

  // Scroll depth flag (solely for padding/opacity transition, not color state)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const headerClasses = scrolled
    ? isDarkHeader
      ? 'bg-gallery-dark/90 border-b border-white/5 backdrop-blur-sm'
      : 'bg-warm-white/95 border-b border-black/5 backdrop-blur-sm'
    : 'bg-transparent';

  const mobileDrawerClasses = mobileMenuOpen
    ? isDarkTheme 
      ? 'bg-gallery-dark text-white' 
      : 'bg-warm-white text-gallery-dark'
    : 'Closed';



  return (
    <header
      className={`fixed top-0 left-0 w-full z-[99] transition-all duration-500 ${headerClasses}`}
      style={{
        paddingTop: scrolled 
          ? 'calc(1rem + env(safe-area-inset-top, 0px))' 
          : 'calc(1.75rem + env(safe-area-inset-top, 0px))',
        paddingBottom: scrolled ? '1rem' : '1.75rem'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        {/* Brand Identity */}
        <Link
          to="/"
          className={`cursor-pointer transition-all duration-300 hover:opacity-75 flex items-center ${
            isDarkHeader ? 'text-warm-white' : 'text-gallery-dark dark:text-warm-white'
          }`}
        >
          <Logo animate={false} />
        </Link>

        {/* Nav & Action Controls */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Desktop Menu links */}
          <nav className="hidden lg:flex items-center gap-9 font-sans text-[10px] tracking-[0.22em] uppercase font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Magnetic key={link.path} range={40} strength={0.25}>
                  <Link
                    to={link.path}
                    className={`relative py-1 cursor-pointer transition-colors duration-300 font-medium ${
                      isActive 
                        ? 'text-accent-yellow-border' 
                        : isDarkHeader 
                          ? 'text-warm-white/75 hover:text-white' 
                          : 'text-gallery-dark/65 dark:text-warm-white/65 hover:text-gallery-dark dark:hover:text-warm-white'
                    }`}
                  >
                    {link.name}
                    {/* Subtle editorial underline reveal */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-yellow-border"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </Magnetic>
              );
            })}
          </nav>

          {/* Premium Theme Toggle button */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-full border transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center w-8 h-8 md:w-8.5 md:h-8.5 shadow-sm ${
              isDarkHeader 
                ? 'border-white/15 text-warm-white hover:bg-white/10' 
                : 'border-black/15 dark:border-white/15 text-gallery-dark dark:text-warm-white hover:bg-neutral-50 dark:hover:bg-neutral-900'
            }`}
            title={theme === 'light' ? "Switch to Dark Gallery" : "Switch to Light Gallery"}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
          </button>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-1.5 cursor-pointer hover:opacity-75 transition-all duration-300 ${
              isDarkHeader ? 'text-warm-white' : 'text-gallery-dark dark:text-warm-white'
            }`}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 h-[100dvh] w-full z-[9999] flex flex-col transition-colors duration-500 ${mobileDrawerClasses}`}
            style={{
              paddingTop: 'env(safe-area-inset-top, 0px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)'
            }}
          >
            {/* Drawer Header */}
            <div className="w-full flex justify-between items-center px-6 pt-6 pb-4 md:px-12">
              <span className={isDarkTheme ? 'text-white' : 'text-gallery-dark'}>
                <Logo animate={false} />
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-1.5 cursor-pointer hover:opacity-75 transition-all duration-300 ${
                  isDarkTheme ? 'text-white' : 'text-gallery-dark'
                }`}
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-grow flex flex-col justify-center items-center gap-8 pb-16">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`font-serif text-3xl font-light tracking-widest uppercase hover:opacity-75 transition-colors duration-300 ${
                        isActive 
                          ? 'text-accent-yellow-border' 
                          : 'text-neutral-800/60 dark:text-neutral-300/70 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Drawer Footer info */}
            <div className="text-center pb-8 pt-4 font-sans text-[8px] tracking-[0.3em] opacity-40 uppercase">
              {artistConfig.contact.email ? `${artistConfig.contact.email.toUpperCase()} • ` : ''}&copy; 2026 LILY MAY STINSON
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
