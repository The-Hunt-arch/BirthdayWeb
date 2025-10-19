import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { timelineItem, staggerContainer } from '../../motion/variants';

const events = [
  { year: 2002, title: 'Born ✨', detail: 'Prachi enters the world full of charm.' },
  { year: 2010, title: 'School Adventures', detail: 'Curious mind & new friendships.' },
  { year: 2016, title: 'Creative Growth', detail: 'Exploring passions & talents.' },
  { year: 2020, title: 'Resilience Era', detail: 'Stayed strong & uplifting others.' },
  { year: 2025, title: 'Celebrated Today', detail: 'Surrounded by love & memories.' }
];

export default function Timeline() {
  return (
    <Box component="section" sx={{ py: 10, px: 2 }} id="timeline">
      <Box component="h2" sx={{ textAlign: 'center', fontSize: { xs: '2rem', md: '3rem' }, mb: 6, fontWeight: 700, background: 'linear-gradient(90deg,#ff4d8d,#7f4dff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Journey</Box>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ maxWidth: 900, margin: '0 auto' }}>
        {events.map((e, i) => (
          <motion.div key={e.year} variants={timelineItem} custom={i} style={{ display: 'flex', gap: '1.2rem', marginBottom: '2.2rem', alignItems: 'flex-start' }}>
            <Chip label={e.year} color="primary" sx={{ fontWeight: 600 }} />
            <div style={{ background: 'rgba(255,255,255,0.85)', padding: '1rem 1.4rem', borderRadius: 18, flex: 1, boxShadow: '0 8px 24px -10px rgba(127,77,255,0.25)' }}>
              <h3 style={{ margin: '0 0 .4rem', fontWeight: 600 }}>{e.title}</h3>
              <p style={{ margin: 0, opacity: .8 }}>{e.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
}
