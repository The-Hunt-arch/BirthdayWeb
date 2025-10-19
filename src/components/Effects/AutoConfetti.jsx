import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// Enhanced confetti system with automatic celebrations
const colors = ['#ff4d8d', '#ffb86c', '#7f4dff', '#4dd4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];

export const shootConfetti = (options = {}) => {
  const defaults = {
    particleCount: 20,
    spread: 70,
    startVelocity: 45,
    ticks: 90,
    colors,
    origin: { y: 0.6 }
  };
  
  confetti({ ...defaults, ...options });
};

export const celebrationBurst = (duration = 800) => {
  const end = Date.now() + duration;
  
  const frame = () => {
    shootConfetti({
      particleCount: Math.random() * 20 + 15,
      spread: Math.random() * 50 + 60,
      origin: { 
        x: Math.random() * 0.6 + 0.2,
        y: Math.random() * 0.4 + 0.5 
      }
    });
    
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  
  frame();
};

export const fireworksBurst = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

// Auto confetti component that triggers celebrations at key moments
const AutoConfetti = () => {
  const hasTriggeredRef = useRef({ initial: false, ending: false });

  useEffect(() => {
    // Multiple hero-focused celebration bursts after load
    if (!hasTriggeredRef.current.initial) {
      const sequenceDelays = [800, 1500, 2300, 3200]; // 4 bursts
      const timers = sequenceDelays.map((delay, idx) => setTimeout(() => {
        // Focus origin higher toward hero section
        for (let i = 0; i < 2; i++) {
          shootConfetti({
            particleCount: 24 + Math.random() * 20,
            spread: 75 + Math.random() * 25,
            startVelocity: 55,
            origin: {
              x: 0.2 + Math.random() * 0.6,
              y: 0.35 + Math.random() * 0.1
            },
            ticks: 100
          });
        }
        // Final burst uses celebration animation
        if (idx === sequenceDelays.length - 1) {
          celebrationBurst(900);
        }
      }, delay));
      hasTriggeredRef.current.initial = true;
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, []);

  useEffect(() => {
    // Ending celebration when scrolled to bottom area
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 85 && !hasTriggeredRef.current.ending) {
        fireworksBurst();
        hasTriggeredRef.current.ending = true;
        
        // Reset after some time so it can trigger again
        setTimeout(() => {
          hasTriggeredRef.current.ending = false;
        }, 10000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null; // This component doesn't render anything visible
};

export default AutoConfetti;