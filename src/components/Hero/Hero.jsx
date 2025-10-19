import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { fadeInUp, staggerContainer, float } from '../../motion/variants';
import ConfettiTrigger from '../Effects/ConfettiTrigger';
import { shootConfetti, celebrationBurst } from '../Effects/AutoConfetti';
import { Fireworks } from 'fireworks-js';
import confetti from 'canvas-confetti';
import './Hero.css';

const Hero = ({ onScrollGallery }) => {
  const didRunRef = useRef(false);
  const fireworksContainerRef = useRef(null);
  const fwRef = useRef(null);
  const rocketIntervalRef = useRef(null);
  const heroRocketIntervalRef = useRef(null);

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
    // Start gentle ongoing fireworks (rockets) behind heading
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduce && fireworksContainerRef.current) {
      fwRef.current = new Fireworks(fireworksContainerRef.current, {
        speed: window.innerWidth < 480 ? 1.05 : 1.35,
        gravity: 1.02,
        particles: window.innerWidth < 480 ? 18 : 30,
        explosion: 5.1,
        autoresize: true
      });
      console.log('[HeroFireworks] init start');
      fwRef.current.start();
      // try to style canvas for visibility and blend
      const styleCanvas = () => {
        const canvas = fireworksContainerRef.current.querySelector('canvas');
        if (canvas) {
          canvas.style.position = 'absolute';
          canvas.style.inset = '0';
          canvas.style.zIndex = '1';
          canvas.style.mixBlendMode = 'lighter';
          canvas.style.pointerEvents = 'none';
          canvas.style.background = 'transparent';
          canvas.style.opacity = '0.95';
          console.log('[HeroFireworks] canvas styled');
        }
      };
      // attempt styling immediately & after a short delay
      styleCanvas();
      setTimeout(styleCanvas, 300);
      // Multi-pass reliability checks: restart if canvas missing or zero-sized
      const verifyCanvas = (attempt) => {
        const canvas = fireworksContainerRef.current.querySelector('canvas');
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
          if (fwRef.current) {
            fwRef.current.stop();
            fwRef.current.start();
            styleCanvas();
            console.log('[HeroFireworks] restart attempt', attempt);
          }
        }
        // If after late attempts still no canvas, fallback rockets
        if (attempt === 3) {
          const finalCanvas = fireworksContainerRef.current.querySelector('canvas');
          if (!finalCanvas) {
            console.warn('[HeroFireworks] no canvas after retries, starting fallback rockets');
            startRocketFallback();
          }
        }
      };
      [800, 1600, 2800].forEach((ms, idx) => setTimeout(() => verifyCanvas(idx + 1), ms));
      // Start guaranteed rocket show overlay
      startHeroRocketShow();
    }
  }, [runHeroSequence]);

  useEffect(() => {
    return () => {
      if (fwRef.current) fwRef.current.stop();
      if (rocketIntervalRef.current) clearInterval(rocketIntervalRef.current);
      if (heroRocketIntervalRef.current) clearInterval(heroRocketIntervalRef.current);
    };
  }, []);

  // Two-phase rocket + explosion fallback (used if fireworks-js fails entirely)
  const startRocketFallback = () => {
    if (rocketIntervalRef.current) return;
    rocketIntervalRef.current = setInterval(() => {
      const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) return;
      const mobile = window.innerWidth < 480;
      const xBase = 0.2 + Math.random() * 0.6;
      confetti({
        particleCount: mobile ? 8 : 14,
        angle: 90,
        startVelocity: mobile ? 60 : 68,
        spread: 10,
        origin: { x: xBase, y: 0.92 },
        ticks: 180,
        gravity: 0.85,
        scalar: mobile ? 0.7 : 0.8,
        colors: ['#ffffff','#ffd166','#ff4d8d']
      });
      setTimeout(() => {
        const explosionY = 0.25 + Math.random() * 0.18;
        confetti({
          particleCount: mobile ? 28 : 42,
          angle: 75,
          startVelocity: 55,
          spread: 70,
          origin: { x: xBase, y: explosionY },
          ticks: 120,
          gravity: 0.9,
          scalar: mobile ? 0.75 : 0.85,
          colors: ['#ff4d8d','#ffd166','#7f4dff','#4dd4ff','#ffffff']
        });
        setTimeout(() => {
          confetti({
            particleCount: mobile ? 18 : 26,
            angle: 105,
            startVelocity: 52,
            spread: 80,
            origin: { x: xBase, y: explosionY + 0.03 },
            ticks: 110,
            gravity: 0.92,
            scalar: mobile ? 0.7 : 0.78,
            colors: ['#ffffff','#ffd166','#ff4d8d','#4dd4ff']
          });
        }, 160);
      }, mobile ? 620 : 720);
    }, 2300);
  };

  // Independent guaranteed rocket show (runs even if fireworks-js works)
  const startHeroRocketShow = () => {
    if (heroRocketIntervalRef.current) return;
    heroRocketIntervalRef.current = setInterval(() => {
      const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) return;
      const mobile = window.innerWidth < 480;
      const x = 0.25 + Math.random() * 0.5;
      confetti({
        particleCount: mobile ? 6 : 10,
        angle: 90,
        startVelocity: 70,
        spread: 6,
        origin: { x, y: 0.95 },
        ticks: 190,
        gravity: 0.82,
        scalar: mobile ? 0.65 : 0.72,
        colors: ['#ffffff','#ffd166']
      });
      setTimeout(() => {
        const y = 0.3 + Math.random() * 0.16;
        confetti({
          particleCount: mobile ? 24 : 36,
          angle: 85,
          startVelocity: 58,
          spread: 75,
          origin: { x, y },
          ticks: 125,
          gravity: 0.88,
          scalar: mobile ? 0.76 : 0.84,
          colors: ['#ff4d8d','#ffd166','#7f4dff','#4dd4ff','#ffffff']
        });
        setTimeout(() => {
          confetti({
            particleCount: mobile ? 18 : 28,
            angle: 95,
            startVelocity: 55,
            spread: 95,
            origin: { x, y: y + 0.025 },
            ticks: 120,
            gravity: 0.9,
            scalar: mobile ? 0.72 : 0.8,
            colors: ['#ff2f7d','#8a5bff','#4dd4ff','#ffd166']
          });
        }, 170);
      }, mobile ? 540 : 640);
    }, 2700);
  };

  return (
    <Box component="section" className="hero-root">
      <div ref={fireworksContainerRef} className="hero-fireworks-layer" />
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
