import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Mobile‑friendly floating, clickable balloons that burst into confetti + message
// Design goals:
//  - Light on CPU (use transform + will-change)
//  - Randomized drift + slight rotation
//  - Tap/click to burst -> confetti + ephemeral text 'Happy Birthday Prachi'
//  - Auto re-spawn to keep ambience

const COLORS = ['#ff4d8d', '#ff8fb1', '#ffc658', '#7f4dff', '#4dd4ff', '#ff6b6b'];
// Reduced density for performance / visual calm
const BALLOON_COUNT_DESKTOP = 10; // was 18
const BALLOON_COUNT_MOBILE = 6;   // was 10
// Optional ultra-low density for very narrow devices
const BALLOON_COUNT_NARROW = 4;   // <360px width

const makeBalloon = (id) => ({
  id,
  xStart: Math.random() * 100, // vw
  delay: Math.random() * 6,
  duration: 18 + Math.random() * 14,
  size: 42 + Math.random() * 26,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  floatOffset: 40 + Math.random() * 60,
});

const InteractiveBalloons = () => {
  const [balloons, setBalloons] = useState([]);
  const [pops, setPops] = useState([]); // ephemeral messages
  const idRef = useRef(0);

  useEffect(() => {
    const w = window.innerWidth;
    const mobile = w < 640;
    const narrow = w < 360;
    const count = narrow ? BALLOON_COUNT_NARROW : (mobile ? BALLOON_COUNT_MOBILE : BALLOON_COUNT_DESKTOP);
    const initial = Array.from({ length: count }).map(() => makeBalloon(idRef.current++));
    setBalloons(initial);
  }, []);

  const popBalloon = useCallback((b, evt) => {
    if (!evt || !evt.currentTarget) return;
    const rect = evt.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Emit confetti at the exact burst position
    confetti({
      particleCount: 30,
      spread: 55,
      origin: {
        x: centerX / window.innerWidth,
        y: centerY / window.innerHeight
      },
      ticks: 90,
      colors: ['#ff4d8d', '#ffd166', '#7f4dff', '#4dd4ff']
    });

    // Store precise pixel position for pop message
    setPops(prev => [
      ...prev,
      { id: 'p' + b.id, xPx: centerX, yPx: centerY, created: Date.now() }
    ]);

    // Remove balloon & respawn only if below density target (avoid perpetual high spawn)
    setBalloons(prev => {
      const filtered = prev.filter(x => x.id !== b.id);
      // Determine current target based on width (dynamic on each pop)
      const w = window.innerWidth;
      const mobile = w < 640;
      const narrow = w < 360;
      const target = narrow ? BALLOON_COUNT_NARROW : (mobile ? BALLOON_COUNT_MOBILE : BALLOON_COUNT_DESKTOP);
      if (filtered.length < target) {
        setTimeout(() => {
          setBalloons(curr => {
            if (curr.length >= target) return curr; // re-check before spawn
            return [...curr, makeBalloon(idRef.current++)];
          });
        }, 1400); // slightly longer pause for calmer feel
      }
      return filtered;
    });
  }, []);

  // Cleanup old pops
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPops(prev => prev.filter(p => now - p.created < 1600));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      <AnimatePresence>
        {balloons.map(b => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', x: b.xStart+'vw', opacity: 0 }}
            animate={{
              y: ['110vh', '-15vh'],
              opacity: [0, 1, 1, 0],
              rotate: [0, 6, -6, 4],
            }}
            transition={{
              duration: b.duration * 1.25, // slower rise for fewer balloons
              ease: 'linear',
              repeat: Infinity,
              delay: b.delay
            }}
            style={{
              position: 'absolute',
              width: b.size,
              height: b.size * 1.3,
              pointerEvents: 'auto',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))'
            }}
            onClick={(e) => popBalloon(b, e)}
          >
            <div style={{
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle at 30% 30%, #fff8, ${b.color})`,
              borderRadius: '45% 45% 50% 50% / 55% 55% 45% 45%',
              position: 'relative',
              border: '2px solid #ffffff40'
            }}>
              <div style={{
                position: 'absolute',
                bottom: -10,
                left: '50%',
                width: 2,
                height: b.size * 0.9,
                background: '#ffffff90',
                transform: 'translateX(-50%)',
                borderRadius: 2,
                opacity: 0.8
              }} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {pops.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0, scale: 0.85 }}
            animate={{ opacity: 1, y: -60, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: p.yPx + 'px',
              left: p.xPx + 'px',
              transform: 'translate(-50%, -50%)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '.5px',
              whiteSpace: 'nowrap',
              background: 'linear-gradient(90deg,#ff4d8d,#ffb86c,#ffd166,#7f4dff,#4dd4ff,#ff4d8d)',
              backgroundSize: '400% 100%',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'shineText 3s linear infinite',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
              pointerEvents: 'none'
            }}
          >
            Happy Birthday Prachi ✨
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBalloons;