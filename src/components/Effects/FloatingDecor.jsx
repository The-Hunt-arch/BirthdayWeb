import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { gsap } from 'gsap';

// Floating hearts / balloons using GSAP for gentle vertical + horizontal drift.

const ITEMS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  char: ['💖','🎈','⭐','🌸','🎉','💫','❤️','🎀','🦋','✨','🎊','🌟'][i % 12]
}));

const FloatingDecor = () => {
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el, idx) => {
      const delay = Math.random() * 5;
      const duration = 18 + Math.random() * 12;
      gsap.to(el, {
        y: -window.innerHeight * (0.6 + Math.random() * 0.4),
        x: '+=' + (Math.random() * 160 - 80),
        scale: 0.7 + Math.random() * 0.6,
        opacity: 0.2 + Math.random() * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration,
        delay
      });
    });
  }, []);

  return (
    <Box sx={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 2,
      overflow: 'hidden'
    }}>
      {ITEMS.map((item, i) => (
        <Box
          key={item.id}
          ref={el => refs.current[i] = el}
          sx={{
            position: 'absolute',
            bottom: -40,
            left: `${(i / ITEMS.length) * 100}%`,
            fontSize: { xs: 26, md: 36 },
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
          }}
        >
          {item.char}
        </Box>
      ))}
    </Box>
  );
};

export default FloatingDecor;
