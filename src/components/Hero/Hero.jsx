import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { fadeInUp, staggerContainer, float } from '../../motion/variants';
import ConfettiTrigger from '../Effects/ConfettiTrigger';
import { shootConfetti, celebrationBurst } from '../Effects/AutoConfetti';
import './Hero.css';

const Hero = ({ onScrollGallery }) => {
  const didRunRef = useRef(false);

  const runHeroSequence = useCallback(() => {
    const width = window.innerWidth;
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = width < 640;
    const base = mobile ? 18 : 36;
    const particleCount = prefersReduce ? Math.round(base * 0.4) : base;
    const burstTimes = prefersReduce ? [400, 1400] : [300, 1000, 1700, 2500];
    burstTimes.forEach((t, idx) => {
      setTimeout(() => {
        // Side sprays
        shootConfetti({
          particleCount,
          spread: 65 + Math.random() * 20,
          startVelocity: 52,
          origin: { x: 0.28, y: 0.42 },
          ticks: 100
        });
        shootConfetti({
          particleCount,
          spread: 65 + Math.random() * 20,
          startVelocity: 52,
          origin: { x: 0.72, y: 0.42 },
          ticks: 100
        });
        // Center accent
        shootConfetti({
          particleCount: Math.round(particleCount * 0.6),
          spread: 55,
          startVelocity: 60,
          origin: { x: 0.5, y: 0.45 },
          ticks: 95
        });
        if (idx === burstTimes.length - 1 && !prefersReduce) {
          celebrationBurst(800);
        }
      }, t);
    });
  }, []);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;
    runHeroSequence();
  }, [runHeroSequence]);

  return (
    <Box component="section" className="hero-root">
      <motion.div
        className="hero-inner"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Removed subtitle per request */}
        <motion.div variants={fadeInUp}>
          <Typography variant="h1" className="hero-title" gutterBottom>
            <span className="hero-glow">Happy Birthday</span>{' '}
            <span className="hero-glow accent">Prachi Tehlan</span> <span className="hero-emoji">🎉</span>
          </Typography>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <div className="hero-underline" />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Typography variant="h5" className="hero-tagline" gutterBottom>
            Born 8 Nov 2002 — celebrating your sparkle, kindness & unstoppable energy.
          </Typography>
        </motion.div>
        <motion.div variants={fadeInUp} className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onClick={onScrollGallery} variant="contained">Open Memories</Button>
          <ConfettiTrigger label="Confetti" />
          <Button variant="outlined" onClick={runHeroSequence}>Replay Celebration ✨</Button>
        </motion.div>
        <motion.div className="floating-emoji" variants={float} animate="animate">✨</motion.div>
        <motion.div className="floating-emoji second" variants={float} animate="animate">💖</motion.div>
      </motion.div>
      <div className="hero-gradient-bg" />
    </Box>
  );
};

export default Hero;
