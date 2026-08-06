import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTheme } from '../utils/ThemeContext';
import { artistConfig } from '../data/config';

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

  const isHome = location.pathname === '/';
  const isDarkPage = theme === 'dark';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Paintings', path: '/paintings' },
    { name: 'Photography', path: '/photography' },
    { name: 'Pen Art', path: '/pen-art' },
    { name: 'Archive', path: '/archive' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[99] transition-all duration-500 ${
        scrolled
          ? isDarkPage
            ? 'bg-gallery-dark/90 border-b border-white/5 py-4 backdrop-blur-sm'
            : 'bg-warm-white/95 border-b border-black/5 py-4 backdrop-blur-sm'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        {/* Brand Identity */}
        <Link
          to="/"
          className="font-light font-serif uppercase cursor-pointer transition-all duration-300 hover:opacity-75 select-none"
          style={{ 
            color: isDarkPage ? '#FAF9F6' : 'var(--color-gallery-dark)', 
            fontSize: "clamp(0.72rem, 4.2vw, 1.25rem)", 
            letterSpacing: "clamp(0.12em, 2vw, 0.25em)",
            whiteSpace: "nowrap"
          }}
        >
          Lily May Stinson
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
                    className="relative py-1 cursor-pointer transition-colors duration-300 hover:text-opacity-80"
                    style={{
                      color: isDarkPage 
                        ? isActive ? 'var(--color-accent-yellow-border)' : '#FAF9F6' 
                        : isActive ? 'var(--color-gallery-dark)' : 'rgba(12, 12, 12, 0.65)'
                    }}
                  >
                    {link.name}
                    {/* Subtle editorial underline reveal */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute bottom-0 left-0 w-full h-[1px]"
                        style={{
                          backgroundColor: isDarkPage ? 'var(--color-accent-yellow-border)' : 'var(--color-gallery-dark)'
                        }}
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
            className="p-1.5 rounded-full border transition-all duration-300 transform active:scale-90 cursor-pointer flex items-center justify-center w-8 h-8 md:w-8.5 md:h-8.5 shadow-sm"
            style={{ 
              borderColor: isDarkPage ? 'rgba(250, 249, 246, 0.15)' : 'rgba(12, 12, 12, 0.15)',
              color: isDarkPage ? '#FAF9F6' : 'var(--color-gallery-dark)'
            }}
            title={theme === 'light' ? "Switch to Dark Gallery" : "Switch to Light Gallery"}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
          </button>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 cursor-pointer"
            style={{ color: isDarkPage ? '#FAF9F6' : 'var(--color-gallery-dark)' }}
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
            className={`fixed inset-0 z-[9999] flex flex-col ${
              isDarkPage ? 'bg-gallery-dark text-white' : 'bg-warm-white text-gallery-dark'
            }`}
          >
            {/* Drawer Header */}
            <div className="w-full flex justify-between items-center px-6 py-6 md:px-12">
              <span className="text-sm xs:text-base sm:text-lg font-serif tracking-[0.15em] sm:tracking-[0.25em] uppercase font-light truncate max-w-[60vw]">
                Lily May Stinson
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 cursor-pointer"
                style={{ color: isDarkPage ? '#FAF9F6' : 'var(--color-gallery-dark)' }}
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
                      className="font-serif text-3xl font-light tracking-widest uppercase hover:opacity-75 transition-opacity"
                      style={{
                        color: isActive 
                          ? isDarkPage ? 'var(--color-accent-yellow-border)' : 'var(--color-gallery-dark)'
                          : isDarkPage ? '#FAF9F6' : 'rgba(12, 12, 12, 0.6)'
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Drawer Footer info */}
            <div className="text-center pb-8 font-sans text-[8px] tracking-[0.3em] opacity-40 uppercase">
              {artistConfig.contact.email ? `${artistConfig.contact.email.toUpperCase()} • ` : ''}&copy; 2026 LILY MAY STINSON
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
