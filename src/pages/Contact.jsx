import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { artistConfig } from '../data/config';
import { Mail, MessageSquare, Send } from 'lucide-react';
import Magnetic from '../components/Magnetic';

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
 * Contact Room (Light Theme).
 * Renders a clean form styled as lines (minimalist layout)
 * with magnetic social indicators.
 */
const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "12092737246";
    const messageText = `Name: ${formState.name}
Email: ${formState.email}
Subject: ${formState.subject}
Message: ${formState.message}`;
    
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full text-gallery-dark dark:text-warm-white pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
      <Helmet>
        <title>Contact & Inquiries | Lily May Stinson</title>
        <meta name="description" content="Get in touch with visual artist Lily May Stinson for commissions, gallery curations, or print acquisitions." />
      </Helmet>

      {/* Page Layout Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* Left Column: CTA & Social details */}
        <div className="w-full lg:w-5/12 text-left">
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-gallery-dark/60 dark:text-warm-white/45 mb-3 block">
            GET IN TOUCH
          </span>
          <h1 
            className="font-serif font-light tracking-wide uppercase leading-[1.15] mb-8 text-gallery-dark dark:text-warm-white"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3.8rem)" }}
          >
            Let's Collaborate
          </h1>
          <p className="font-sans text-xs md:text-sm leading-relaxed opacity-60 tracking-wider mb-12">
            For representations, acquisitions, custom commissions, or simply a gallery conversation. Drop a message via the form or reach out directly on studio channels.
          </p>

          <div className="flex flex-col gap-8 font-sans text-xs tracking-wider">
            {/* Email */}
            {artistConfig.contact.email && (
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full transition-colors duration-500">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[8px] tracking-[0.25em] opacity-45 uppercase font-semibold">EMAIL</span>
                  <a href={`mailto:${artistConfig.contact.email}`} className="text-neutral-900 dark:text-warm-white font-medium hover:opacity-75 transition-opacity">
                    {artistConfig.contact.email}
                  </a>
                </div>
              </div>
            )}

            {/* Instagram */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full transition-colors duration-500">
                <InstagramIcon size={16} />
              </div>
              <div>
                <span className="block text-[8px] tracking-[0.25em] opacity-45 uppercase font-semibold">INSTAGRAM</span>
                <a href={artistConfig.contact.instagramLink} target="_blank" rel="noopener noreferrer" className="text-neutral-900 dark:text-warm-white font-medium hover:opacity-75 transition-opacity">
                  {artistConfig.contact.instagram}
                </a>
              </div>
            </div>

            {/* Whatsapp */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-full transition-colors duration-500">
                <MessageSquare size={16} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[8px] tracking-[0.25em] opacity-45 uppercase font-semibold">WHATSAPP</span>
                <a href={`https://wa.me/${artistConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-neutral-900 dark:text-warm-white font-medium hover:opacity-75 transition-opacity">
                  {artistConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Line-styled Form Panel */}
        <div className="w-full lg:w-7/12 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 p-6 sm:p-8 md:p-12 shadow-premium relative text-left transition-all duration-500">
          {/* Decorative frame corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-black/10 dark:border-white/10" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-black/10 dark:border-white/10" />

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <h3 className="font-serif text-2xl font-light uppercase tracking-widest text-neutral-800 mb-2">
                Thank You
              </h3>
              <p className="font-sans text-xs opacity-60 tracking-wider">
                Your message has been logged in our guest book. We will reach back shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 font-sans text-xs">
              {/* Name */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[9px] tracking-[0.2em] opacity-50 uppercase font-semibold">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  placeholder=""
                  className="py-2.5 bg-transparent border-b border-black/15 dark:border-white/15 focus:border-neutral-900 dark:focus:border-warm-white outline-none transition-colors text-neutral-900 dark:text-warm-white font-medium placeholder-neutral-300 dark:placeholder-neutral-700"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[9px] tracking-[0.2em] opacity-50 uppercase font-semibold">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  placeholder=""
                  className="py-2.5 bg-transparent border-b border-black/15 dark:border-white/15 focus:border-neutral-900 dark:focus:border-warm-white outline-none transition-colors text-neutral-900 dark:text-warm-white font-medium placeholder-neutral-300 dark:placeholder-neutral-700"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[9px] tracking-[0.2em] opacity-50 uppercase font-semibold">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  required
                  placeholder=""
                  className="py-2.5 bg-transparent border-b border-black/15 dark:border-white/15 focus:border-neutral-900 dark:focus:border-warm-white outline-none transition-colors text-neutral-900 dark:text-warm-white font-medium placeholder-neutral-300 dark:placeholder-neutral-700"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[9px] tracking-[0.2em] opacity-50 uppercase font-semibold">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  placeholder=""
                  className="py-2.5 bg-transparent border-b border-black/15 dark:border-white/15 focus:border-neutral-900 dark:focus:border-warm-white outline-none transition-colors text-neutral-900 dark:text-warm-white font-medium resize-none placeholder-neutral-300 dark:placeholder-neutral-700"
                />
              </div>

              {/* Magnetic Submit button */}
              <div className="mt-4">
                <Magnetic range={50} strength={0.2}>
                  <button
                    type="submit"
                    className="bg-gallery-dark dark:bg-warm-white hover:bg-neutral-900 dark:hover:bg-neutral-100 text-white dark:text-gallery-dark font-sans text-[10px] tracking-[0.3em] uppercase py-3.5 px-10 transition-all font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    SEND INQUIRY <Send size={10} />
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
