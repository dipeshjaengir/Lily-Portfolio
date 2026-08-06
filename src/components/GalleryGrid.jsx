import React from 'react';

const GalleryGrid = ({ children, className = "" }) => {
  return (
    <div className={`columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 ${className}`}>
      {children}
    </div>
  );
};

export default GalleryGrid;
