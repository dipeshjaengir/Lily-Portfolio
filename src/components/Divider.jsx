import React from 'react';

const Divider = ({ className = "" }) => {
  return (
    <hr className={`w-full h-[1px] border-none bg-theme-border opacity-100 transition-colors duration-500 ${className}`} />
  );
};

export default Divider;
