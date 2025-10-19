import React, { useState } from 'react';
import { wishes } from '../../data/wishes';
import { AnimatePresence, motion } from 'framer-motion';
import { swipeCarousel } from '../../motion/variants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function WishesCarousel() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % wishes.length);
  const prev = () => setIndex((index - 1 + wishes.length) % wishes.length);
  return (
    <Box component="section" sx={{ py: 10, px: 2, textAlign: 'center' }}>
      <Box component="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 4, fontWeight: 700, background: 'linear-gradient(90deg,#ff4d8d,#7f4dff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Heartfelt Wishes</Box>
      <Box sx={{ position: 'relative', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={index} variants={swipeCarousel} initial="enter" animate="center" exit="exit" transition={{ duration: 0.55 }} style={{ fontSize: '1.2rem', maxWidth: 720, lineHeight: 1.5, background: 'rgba(255,255,255,0.85)', padding: '1.4rem 1.8rem', borderRadius: 24, boxShadow: '0 10px 30px -10px rgba(127,77,255,0.25)' }}>
            {wishes[index]}
          </motion.div>
        </AnimatePresence>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="contained" onClick={prev} sx={{ width: 64, height: 64, borderRadius: '50%', fontSize: '1.4rem', background: 'linear-gradient(135deg,#ff4d8d,#ffb86c)' }}>&larr;</Button>
        <Button variant="contained" onClick={next} sx={{ width: 64, height: 64, borderRadius: '50%', fontSize: '1.4rem', background: 'linear-gradient(135deg,#7f4dff,#4dd4ff)' }}>&rarr;</Button>
      </Box>
    </Box>
  );
}
