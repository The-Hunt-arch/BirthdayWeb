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
const AUDIO_SRC = '/music/birthday.mp3';

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
    <motion.div className="music-floating" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
      <Paper elevation={6} className="music-box">
        <div className="music-row" style={{ justifyContent: 'space-between' }}>
          <IconButton color="primary" onClick={handleToggle} size="large" aria-label={isPlaying ? 'Pause music' : 'Play music'}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <div className="music-meta">
            <strong style={{ fontSize: '.9rem' }}>Prachi's Vibe Track</strong>
            <small style={{ opacity: 0.7 }}>Birthday loop</small>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.65rem', opacity: .65 }}>
            <span>{Math.floor(progress/60)}:{('0'+Math.floor(progress%60)).slice(-2)}</span>
            <span>/</span>
            <span>{Math.floor(duration/60)}:{('0'+Math.floor(duration%60)).slice(-2)}</span>
          </div>
        </div>
        {autoPlayFailed && !isPlaying && (
          <div style={{ fontSize: '.7rem', marginTop: 4, opacity: .7 }}>
            Tap play (autoplay blocked)
          </div>
        )}
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
