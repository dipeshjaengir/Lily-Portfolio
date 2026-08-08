import React from 'react';

const SectionHeader = ({ label, title, className = "", titleClassName = "" }) => {
  return (
    <header className={`max-w-7xl mx-auto mb-16 md:mb-24 text-left ${className}`}>
      {label && (
        <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-theme-text-muted mb-3 block">
          {label}
        </span>
      )}
      {title && (
        <h1 
          className={`font-serif font-light tracking-wide uppercase leading-[1.15] text-theme-text ${titleClassName}`}
          style={titleClassName ? {} : { fontSize: "clamp(1.8rem, 7vw, 4.5rem)" }}
        >
          {title}
        </h1>
      )}
    </header>
  );
};

export default SectionHeader;
