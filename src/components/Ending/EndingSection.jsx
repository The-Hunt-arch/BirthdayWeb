import { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Fireworks } from 'fireworks-js';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const EndingSection = () => {
  const containerRef = useRef(null);
  const fwRef = useRef(null);
  const rocketFallbackRef = useRef(null);

  useEffect(() => {
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (containerRef.current && !prefersReduce) {
      fwRef.current = new Fireworks(containerRef.current, {
        speed: window.innerWidth < 480 ? 1.1 : 1.5,
        gravity: 1.06,
        particles: window.innerWidth < 480 ? 22 : 40,
        explosion: window.innerWidth < 480 ? 4.2 : 5.2,
        autoresize: true
      });
      fwRef.current.start();
      const styleCanvas = () => {
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          canvas.style.position = 'absolute';
          canvas.style.inset = '0';
          canvas.style.zIndex = '1';
          canvas.style.mixBlendMode = 'screen';
          canvas.style.pointerEvents = 'none';
          canvas.style.background = 'transparent';
        }
      };
      styleCanvas();
      setTimeout(styleCanvas, 320);
      const verifyCanvas = (attempt) => {
        const canvas = containerRef.current.querySelector('canvas');
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
          if (fwRef.current) {
            fwRef.current.stop();
            fwRef.current.start();
            styleCanvas();
          }
        }
        if (attempt === 3) {
          const finalCanvas = containerRef.current.querySelector('canvas');
          if (!finalCanvas) {
            startRocketFallback();
          }
        }
      };
      [900, 1700, 3000].forEach((ms, idx) => setTimeout(() => verifyCanvas(idx + 1), ms));
    } else if (!prefersReduce) {
      startRocketFallback();
    }
    return () => {
      if (fwRef.current) fwRef.current.stop();
      if (rocketFallbackRef.current) clearInterval(rocketFallbackRef.current);
    };
  }, []);

  const startRocketFallback = () => {
    if (rocketFallbackRef.current) return;
    rocketFallbackRef.current = setInterval(() => {
      const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) return;
      const xBase = 0.2 + Math.random() * 0.6; // wider spread bottom
      confetti({
        particleCount: 16,
        angle: 85,
        startVelocity: 60,
        spread: 35,
        origin: { x: xBase, y: 0.92 },
        ticks: 150,
        gravity: 0.95,
        scalar: 0.9,
        colors: ['#ff4d8d','#ffd166','#7f4dff','#4dd4ff','#ffffff']
      });
    }, 1900);
  };

  const triggerBurst = () => {
    if (fwRef.current) {
      fwRef.current.stop();
      fwRef.current.start();
    } else {
      // Manual burst in fallback mode
      for (let i=0;i<3;i++) {
        setTimeout(() => {
          confetti({
            particleCount: 38,
            spread: 70,
            startVelocity: 55,
            origin: { x: 0.5, y: 0.85 },
            ticks: 120,
            gravity: 0.95,
            colors: ['#ff4d8d','#ffd166','#7f4dff','#4dd4ff','#ffffff']
          });
        }, i*180);
      }
    }
  };

  return (
    <Box component="section" sx={{
      position: 'relative',
      width: '100%',
      minHeight: { xs: 380, md: 480 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      mt: 10,
      mb: 6,
      px: 2
    }}>
      <Box ref={containerRef} sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0
      }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
      >
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, textShadow: '0 4px 14px rgba(0,0,0,0.4)' }}>
          Have the Best Day Ever!
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>
          You are cherished, celebrated, and loved. May this year bring even brighter adventures and unforgettable smiles.
        </Typography>
        <Button variant="contained" color="secondary" onClick={triggerBurst} sx={{ fontWeight: 600 }}>
          Celebrate Again 🎆
        </Button>
      </motion.div>
    </Box>
  );
};

export default EndingSection;
