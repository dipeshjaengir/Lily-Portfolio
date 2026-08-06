import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  href, 
  type = "button", 
  variant = "primary", // primary, secondary, outline, text
  className = "", 
  target, 
  rel,
  ...props 
}) => {
  const baseClasses = "font-sans text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 transform active:scale-95 cursor-pointer select-none inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-theme-text text-theme-bg border border-theme-text py-3 px-8 hover:bg-transparent hover:text-theme-text",
    secondary: "bg-theme-bg-surface text-theme-text border border-theme-border-medium py-3 px-8 hover:border-theme-text",
    outline: "bg-transparent text-theme-text border border-theme-border-medium py-3 px-8 hover:border-theme-text",
    text: "bg-transparent text-theme-text hover:text-theme-accent p-2"
  };

  const finalClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={finalClasses} 
        target={target} 
        rel={rel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={finalClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
