import React from 'react';

const Frame = ({ children, className = "" }) => {
  return (
    <div className={`bg-theme-bg-card border border-theme-border shadow-premium p-4 md:p-5 relative transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
};

export default Frame;
