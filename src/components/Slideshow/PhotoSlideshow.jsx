import { useEffect, useState, useRef, useCallback } from 'react';
import { photos } from '../../data/photos';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, useTheme, Paper } from '@mui/material';

// Simple crossfade slideshow using photos data.
// Each slide shows the photo + caption/emojis.

const intervalMs = 4000;

const PhotoSlideshow = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 forward, -1 backward
  const draggingRef = useRef(false);
  const theme = useTheme();

  const next = useCallback(() => {
    setDirection(1);
    setIndex(prev => (prev + 1) % photos.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [next, paused]);

  const onDragStart = () => {
    draggingRef.current = true;
    setPaused(true);
  };
  const onDragEnd = (_, info) => {
    draggingRef.current = false;
    const offsetX = info.offset.x;
    const threshold = 50;
    if (offsetX < -threshold) next();
    else if (offsetX > threshold) prev();
    setTimeout(() => setPaused(false), 400);
  };

  const current = photos[index];

  return (
    <Box component="section" sx={{
      position: 'relative',
      width: '100%',
      minHeight: { xs: 360, md: 480 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      mt: 6,
      mb: 4,
      px: { xs: 2, md: 4 }
    }}>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={current.id + '-' + direction + '-' + index}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 70 : -70, scale: 1 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction > 0 ? -70 : 70, scale: 0.98 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            touchAction: 'pan-y'
          }}
        >
          <Paper elevation={10} sx={{
            position: 'relative',
            width: { xs: '90%', md: '60%' },
            height: { xs: 320, md: 420 },
            borderRadius: 4,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
            backdropFilter: 'blur(4px)',
          }}>
            <Box component="img"
              src={current.src}
              alt={current.caption}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.9) saturate(1.05)'
              }}
            />
            <Typography variant="h5" sx={{
              position: 'absolute',
              bottom: 16,
              left: 20,
              pr: 3,
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.45)',
              fontWeight: 600
            }}>
              {current.caption} {current.mood === 'happy' && '🥳'}{current.mood === 'sweet' && '🍰'}{current.mood === 'decor' && '🎈'}{current.mood === 'soft' && '🌸'}
            </Typography>
          </Paper>
        </motion.div>
      </AnimatePresence>
      {/* Indicators */}
      <Box sx={{ position: 'absolute', bottom: 10, display: 'flex', gap: 1 }}>
        {photos.map((p, i) => (
          <Box key={p.id} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            cursor: 'pointer',
            background: i === index ? theme.palette.primary.main : theme.palette.primary.main + '55',
            transition: 'background 0.4s'
          }} />
        ))}
      </Box>
    </Box>
  );
};

export default PhotoSlideshow;
