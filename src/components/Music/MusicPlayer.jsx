import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import LinearProgress from '@mui/material/LinearProgress';
import './MusicPlayer.css';

// Using a demo audio URL for now. Replace with local file in public/ folder
const AUDIO_SRC = 'src/assets/music/birthday.mp3';

export default function MusicPlayer() {
  const { isPlaying, progress, duration, toggle, seekTo, play } = useAudioPlayer(AUDIO_SRC, { loop: true, autoplay: true });
  const [autoPlayFailed, setAutoPlayFailed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Auto attempt play after a small delay
    const timer = setTimeout(async () => {
      try {
        await play();
        setHasInteracted(true);
      } catch (e) {
        setAutoPlayFailed(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [play]);

  // Check if audio is actually playing after user interaction
  useEffect(() => {
    if (hasInteracted && !isPlaying) {
      const checkTimer = setTimeout(() => {
        if (!isPlaying) setAutoPlayFailed(true);
      }, 1000);
      return () => clearTimeout(checkTimer);
    }
  }, [hasInteracted, isPlaying]);

  const handleToggle = () => {
    setHasInteracted(true);
    setAutoPlayFailed(false);
    toggle();
  };
  const pct = duration ? (progress / duration) * 100 : 0;
  return (
    <motion.div className="music-floating" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
      <Paper elevation={3} className="music-box">
        <div className="music-row">
          <IconButton color="primary" onClick={handleToggle} size="large">
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <div className="music-meta">
            <strong>Prachi's Vibe Track</strong>
            <small style={{ opacity: 0.7 }}>Looping ambient birthday tune</small>
          </div>
        </div>
        {autoPlayFailed && !isPlaying && (
          <div style={{ fontSize: '.75rem', marginTop: 4, opacity: .7 }}>
            Tap play to enable sound (browser blocked autoplay)
          </div>
        )}
        <LinearProgress variant="determinate" value={pct} className="music-progress" />
        <div className="music-bar" onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const ratio = x / rect.width;
          seekTo(ratio * duration);
        }}>
          <motion.div className="music-bar-active" style={{ width: pct + '%' }} />
        </div>
      </Paper>
    </motion.div>
  );
}
