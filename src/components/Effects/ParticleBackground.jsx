import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './ParticleBackground.css';

// Simple floating particle dots
export default function ParticleBackground() {
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 10
  })), []);
  return (
    <div className="particle-bg" aria-hidden>
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="particle"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}
