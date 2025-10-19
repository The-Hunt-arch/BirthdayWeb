import { useEffect, useRef, useState, useCallback } from 'react';
import { Howl } from 'howler';

export function useAudioPlayer(src, { autoplay = false, loop = true } = {}) {
  const howlRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    howlRef.current = new Howl({
      src: [src],
      html5: true,
      loop,
      preload: true,
      onload: () => setDuration(howlRef.current.duration()),
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false)
    });
    
    if (autoplay) {
      // Autoplay restrictions: browsers need user interaction; handle outside.
      setTimeout(() => play(), 500);
    }
    
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const play = useCallback(async () => {
    if (!howlRef.current) return Promise.reject('No audio loaded');
    
    return new Promise((resolve, reject) => {
      try {
        const id = howlRef.current.play();
        if (id) {
          setIsPlaying(true);
          resolve(id);
        } else {
          reject('Failed to play');
        }
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const pause = useCallback(() => {
    if (!howlRef.current) return;
    howlRef.current.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, pause, play]);

  useEffect(() => {
    let rafId;
    function update() {
      if (howlRef.current && isPlaying) {
        const seek = howlRef.current.seek();
        setProgress(seek);
      }
      rafId = requestAnimationFrame(update);
    }
    update();
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const seekTo = useCallback((time) => {
    if (howlRef.current) {
      howlRef.current.seek(time);
      setProgress(time);
    }
  }, []);

  return { isPlaying, progress, duration, play, pause, toggle, seekTo };
}
