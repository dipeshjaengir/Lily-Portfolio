import React from 'react';

const SectionContainer = ({ children, className = "" }) => {
  return (
    <section className={`max-w-7xl mx-auto px-6 md:px-12 w-full transition-all ${className}`}>
      {children}
    </section>
  );
};

export default SectionContainer;
