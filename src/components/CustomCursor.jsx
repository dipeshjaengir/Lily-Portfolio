import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';

/**
 * Custom dual-element cursor (inner dot + trailing ring) for premium editorial feel.
 * Route-aware styling automatically switches cursor color (light/dark) depending on page theme.
 */
const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { inverted } = useTheme();
  const isDarkPage = (location.pathname === '/') ? !inverted : inverted;

  useEffect(() => {
    // Hide native cursor only if screen supports hover
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    document.body.classList.add('custom-cursor-active');

    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    
    const ringSpeed = 0.15; // Smooth trailing delay

    const onMouseMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (!isVisible) setIsVisible(true);
      
      // Instantly position the center dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
    };

    const updateRingPosition = () => {
      // Interpolated drag follow
      ringX += (dotX - ringX) * ringSpeed;
      ringY += (dotY - ringY) * ringSpeed;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(updateRingPosition);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    const animationFrameId = requestAnimationFrame(updateRingPosition);

    // Watch for interactions (hover expand states)
    const handleMouseEnterInteractive = () => setIsHovered(true);
    const handleMouseLeaveInteractive = () => setIsHovered(false);

    const attachListeners = (elements) => {
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    // Scrape initial elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, .interactive-hover'
    );
    attachListeners(interactiveElements);

    // MutationObserver to capture elements injected dynamically (e.g., page navigation)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const interactiveItems = node.querySelectorAll(
                'a, button, [role="button"], input, select, textarea, .interactive-hover'
              );
              attachListeners(interactiveItems);
              if (
                node.matches &&
                node.matches('a, button, [role="button"], input, select, textarea, .interactive-hover')
              ) {
                node.addEventListener('mouseenter', handleMouseEnterInteractive);
                node.addEventListener('mouseleave', handleMouseLeaveInteractive);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [isVisible]);

  return (
    <div 
      className={`hidden md:block pointer-events-none fixed inset-0 z-[9999] ${
        isDarkPage ? 'cursor-dark' : 'cursor-light'
      }`}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      <div 
        ref={cursorRingRef} 
        className={`cursor-ring ${isHovered ? 'hovered' : ''}`}
      />
      <div 
        ref={cursorDotRef} 
        className="cursor-dot"
      />
    </div>
  );
};

export default CustomCursor;
