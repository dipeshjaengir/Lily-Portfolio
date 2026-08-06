import React from 'react';

const PageHero = ({ label, title, subtitle, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto mb-20 md:mb-28 text-left ${className}`}>
      {label && (
        <span className="text-[10px] font-sans tracking-[0.35em] uppercase font-semibold text-theme-text-muted mb-3 block">
          {label}
        </span>
      )}
      {title && (
        <h1 
          className="font-serif font-light tracking-wide uppercase leading-[1.15] text-theme-text mb-4"
          style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-theme-text-muted max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHero;
