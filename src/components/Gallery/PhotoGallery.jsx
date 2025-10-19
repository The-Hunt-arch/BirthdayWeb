import React, { useState } from 'react';
import { photos } from '../../data/photos';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './PhotoGallery.css';
import { photoItem, staggerContainer } from '../../motion/variants';

export default function PhotoGallery() {
  const [active, setActive] = useState(null);
  return (
    <Box component="section" id="gallery" className="gallery-root">
      <motion.h2
        className="gallery-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >Memories Gallery</motion.h2>
      <motion.div
        className="grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {photos.map((p, i) => (
          <motion.figure
            key={p.id}
            className="photo-card"
            variants={photoItem}
            custom={i}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActive(p)}
          >
            <motion.img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </motion.figure>
        ))}
      </motion.div>
      <AnimatePresence>
        {active && (
          <Dialog open onClose={() => setActive(null)} fullWidth maxWidth="md">
            <Box position="absolute" top={8} right={8}>
              <IconButton onClick={() => setActive(null)}><CloseIcon /></IconButton>
            </Box>
            <motion.img
              key={active.id}
              src={active.src}
              alt={active.caption}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ width: '100%', borderRadius: 12 }}
            />
            <Box p={2}>
              <h3 style={{ margin: 0 }}>{active.caption}</h3>
            </Box>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  );
}
