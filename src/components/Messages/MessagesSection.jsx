import { messages } from '../../data/messages';
import { motion } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.35 }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

const MessagesSection = () => {
  const theme = useTheme();
  return (
    <Box component="section" sx={{
      maxWidth: 960,
      mx: 'auto',
      mt: 6,
      mb: 8,
      px: { xs: 2, md: 4 }
    }}>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 3, fontWeight: 700 }}>
        Heartfelt Messages
      </Typography>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ display: 'grid', gap: '18px' }}
      >
        {messages.map((m, i) => (
          <motion.div key={i} variants={item}>
            <Box sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}25)`,
              backdropFilter: 'blur(6px)',
              border: `1px solid ${theme.palette.primary.main}33`
            }}>
              <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, fontWeight: 500 }}>
                {m}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default MessagesSection;
