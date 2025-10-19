import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '../../data/photos';
import { wishes } from '../../data/wishes';
import Box from '@mui/material/Box';

// Combine first N photos with wishes (wrap around if needed)
const SLIDES = photos.slice(0, 8).map((p, i) => ({
  photo: p.src,
  caption: p.caption,
  wish: wishes[i % wishes.length]
}));

// Directional variants allow swipe-aware animations.
const variants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -80 : 80 })
};

export default function BlessingSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 forward, -1 backward
  const draggingRef = useRef(false);

  const next = useCallback(() => {
    setDirection(1);
    setIndex(i => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return; // skip when user hovers or dragging
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next, paused]);

  const onDragEnd = (_, info) => {
    draggingRef.current = false;
    const offsetX = info.offset.x;
    const threshold = 50; // minimum px swipe
    if (offsetX < -threshold) {
      next();
    } else if (offsetX > threshold) {
      prev();
    }
  };

  const onDragStart = () => {
    draggingRef.current = true;
    setPaused(true); // pause autoplay while user interacts
  };

  const onDragTransitionEnd = () => {
    if (!draggingRef.current) {
      // resume after short delay
      setTimeout(() => setPaused(false), 400);
    }
  };

  return (
  <Box component="section" sx={{ position: 'relative', width: '100%', py: { xs: 5, md: 8 }, overflow: 'hidden' }}>
  <Box component="h2" sx={{ textAlign: 'center', fontSize: { xs: '1.9rem', md: '3rem' }, mb: { xs: 3.5, md: 5 }, fontWeight: 700, background: 'linear-gradient(90deg,#ff4d8d,#7f4dff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Blessings</Box>
  <Box sx={{ position: 'relative', maxWidth: { xs: '100%', md: 1000 }, mx: 'auto', px: { xs: 1.5, md: 0 } }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onTransitionEnd={onDragTransitionEnd}
            style={{ position: 'relative', borderRadius: 24, minHeight: window.innerWidth < 480 ? 360 : 420, boxShadow: '0 14px 32px -12px rgba(127,77,255,0.35)', background: '#000', overflow: 'hidden', cursor: 'grab', touchAction: 'pan-y' }}
          >
            <motion.img src={SLIDES[index].photo} alt={SLIDES[index].caption} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
            <motion.div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)' }} />
            <motion.div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.2rem 2.4rem', color: 'white' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h3 style={{ margin: '0 0 .55rem', fontSize: window.innerWidth < 480 ? '1.35rem' : '1.6rem', fontWeight: 600 }}>{SLIDES[index].caption}</h3>
              <p style={{ margin: 0, fontSize: window.innerWidth < 480 ? '0.95rem' : '1.1rem', lineHeight: 1.5 }}>{SLIDES[index].wish}</p>
            </motion.div>
            <Box sx={{ position: 'absolute', top: 14, right: 18, display: 'flex', gap: 1 }}>
              {SLIDES.map((_, i) => (
                <span
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  style={{ width: 12, height: 12, borderRadius: '50%', cursor: 'pointer', background: i === index ? 'linear-gradient(90deg,#ff4d8d,#ffb86c)' : 'rgba(255,255,255,0.35)', transition: 'all .3s' }} />
              ))}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
