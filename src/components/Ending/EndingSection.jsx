import { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Fireworks } from 'fireworks-js';
import { motion } from 'framer-motion';

const EndingSection = () => {
  const containerRef = useRef(null);
  const fwRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      fwRef.current = new Fireworks(containerRef.current, {
        speed: 2,
        gravity: 1.1,
        particles: 50,
        explosion: 6,
        autoresize: true
      });
      fwRef.current.start();
    }
    return () => {
      if (fwRef.current) fwRef.current.stop();
    };
  }, []);

  const triggerBurst = () => {
    if (fwRef.current) {
      fwRef.current.stop();
      fwRef.current.start();
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
