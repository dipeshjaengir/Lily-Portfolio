import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

// Layout & Global Components
import MainLayout from './layouts/MainLayout';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './utils/ThemeContext';
import Logo from './components/Logo';

// Exhibition Rooms (Pages)
import Home from './pages/Home';
import Paintings from './pages/Paintings';
import Photography from './pages/Photography';
import PenArt from './pages/PenArt';
import Archive from './pages/Archive';
import About from './pages/About';
import Contact from './pages/Contact';
import Artwork from './pages/Artwork';
import NotFound from './pages/NotFound';

/**
 * Reset scroll context on page navigation.
 */
const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * Editorial Gallery Preloader.
 * Staggers characters, expands spacing, and cross-fades into the main exhibition.
 */
const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 h-[100dvh] w-full z-[10000] bg-gallery-dark text-warm-white flex flex-col justify-center items-center select-none"
    >
      <div className="flex flex-col items-center">
        {/* Letters Reveal via Unified Reusable Logo Component */}
        <Logo animate={true} />

        {/* Muted curator subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1.0 }}
          className="text-[8px] font-sans tracking-[0.35em] uppercase mt-2"
        >
          CURATING EXPOSITIONS &bull; LONDON
        </motion.div>
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  // Manage body cursor-active state once loaded
  useEffect(() => {
    if (!loading) {
      document.body.classList.add('custom-cursor-active');
    }
  }, [loading]);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          {/* Animated preloader overlay */}
          <AnimatePresence mode="wait">
            {loading && (
              <Preloader key="preloader" onComplete={() => setLoading(false)} />
            )}
          </AnimatePresence>

          {!loading && (
            <SmoothScroll>
              {/* Scroll Restorer */}
              <ScrollRestoration />

              {/* Application Routes */}
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/paintings" element={<Paintings />} />
                  <Route path="/photography" element={<Photography />} />
                  <Route path="/pen-art" element={<PenArt />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/artwork/:id" element={<Artwork />} />
                  {/* 404 handler inside main layout to preserve navbar & footer if desired */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </SmoothScroll>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
