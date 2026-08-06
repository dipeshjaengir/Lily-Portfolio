import React from 'react';
import { useLocation } from 'react-router-dom';
import { artistConfig } from '../data/config';
import Magnetic from './Magnetic';

/**
 * Editorial Footer component.
 * Displays simple branding, visual artist credentials, and magnetic contact CTAs.
 */
const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer 
      className={`relative z-10 w-full mt-24 px-6 md:px-12 py-12 md:py-16 border-t ${
        isHome 
          ? 'border-white/5 bg-gallery-dark/40' 
          : 'border-black/5 bg-neutral-50'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Left Side: Branding */}
        <div className="text-center md:text-left">
          <h4 className="font-serif text-lg tracking-[0.25em] uppercase font-light">
            Lily May Stinson
          </h4>
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-55 mt-1.5">
            {artistConfig.subtitle}
          </p>
        </div>

        {/* Right Side: Contact Triggers */}
        <div className="flex flex-col md:items-end gap-3 font-sans text-[10px] tracking-[0.2em] uppercase font-medium">
          <div className="flex justify-center gap-6">
            {artistConfig.contact.email && (
              <Magnetic range={30} strength={0.3}>
                <a 
                  href={`mailto:${artistConfig.contact.email}`}
                  className="hover:opacity-75 transition-opacity"
                >
                  EMAIL
                </a>
              </Magnetic>
            )}
            <Magnetic range={30} strength={0.3}>
              <a 
                href={artistConfig.contact.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
              >
                INSTAGRAM
              </a>
            </Magnetic>
            <Magnetic range={30} strength={0.3}>
              <a 
                href={`https://wa.me/${artistConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
              >
                WHATSAPP
              </a>
            </Magnetic>
          </div>
          
          <span className="opacity-45 text-[8px] mt-1 tracking-[0.25em] text-center md:text-right">
            DIGITAL EXHIBITION ROOMS &bull; LONDON, UK
          </span>
        </div>

      </div>

      {/* Trademark Line */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-current opacity-[0.04] flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] tracking-[0.3em] uppercase">
        <span>&copy; 2026 LILY MAY STINSON. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED BY ANTIGRAVITY</span>
      </div>
    </footer>
  );
};

export default Footer;
