import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Lightweight, non-interactive drifting birthday emojis.
// Only uses transforms & opacity for good mobile performance.

const EMOJIS = ['🎈','🎉','🎂','💖','✨','🎊','🧁','🥳','🍰','🎀','🎁','🌟'];

const genItem = (id) => ({
  id,
  emoji: EMOJIS[Math.floor(Math.random()*EMOJIS.length)],
  x: Math.random()*100, // vw
  size: 26 + Math.random()*18,
  duration: 18 + Math.random()*14,
  delay: Math.random()*10,
  driftX: (Math.random()*20 - 10),
  rotate: (Math.random()*40 - 20)
});

const EmojiDrift = () => {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const mobile = window.innerWidth < 640;
    const count = mobile ? 16 : 30;
    setItems(Array.from({ length: count }).map((_,i)=> genItem(i)));
  },[]);

  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:2 }}>
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ y: '110vh', x: item.x+'vw', opacity:0 }}
          animate={{
            y: ['110vh','-15vh'],
            x: [item.x+'vw', `calc(${item.x}vw + ${item.driftX}vw)`],
            opacity: [0,1,1,0],
            rotate: [0,item.rotate,-item.rotate*0.6]
          }}
          transition={{ duration: item.duration, delay: item.delay, ease:'linear', repeat: Infinity }}
          style={{
            position:'absolute',
            fontSize: item.size,
            willChange:'transform'
          }}
        >{item.emoji}</motion.div>
      ))}
    </div>
  );
};

export default EmojiDrift;