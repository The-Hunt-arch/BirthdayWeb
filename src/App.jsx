import React, { useRef } from 'react';
import Hero from './components/Hero/Hero';
import PhotoSlideshow from './components/Slideshow/PhotoSlideshow';
import BlessingSlider from './components/Blessings/BlessingSlider';
import PhotoGallery from './components/Gallery/PhotoGallery';
import MessagesSection from './components/Messages/MessagesSection';
import EndingSection from './components/Ending/EndingSection';
import WishesCarousel from './components/Wishes/WishesCarousel';
import MusicPlayer from './components/Music/MusicPlayer';
import ParticleBackground from './components/Effects/ParticleBackground';
// import FloatingDecor from './components/Effects/FloatingDecor';
import InteractiveBalloons from './components/Effects/InteractiveBalloons';
import EmojiDrift from './components/Effects/EmojiDrift';
import AutoConfetti from './components/Effects/AutoConfetti';
import './App.css';

function App() {
  const galleryRef = useRef(null);
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
    <ParticleBackground />
    <EmojiDrift />
    <InteractiveBalloons />
    <AutoConfetti />
    <Hero onScrollGallery={scrollToGallery} />
    <PhotoSlideshow />
    <BlessingSlider />
    <div ref={galleryRef} />
    <PhotoGallery />
    <MessagesSection />
  <WishesCarousel />
    <EndingSection />
    <MusicPlayer />
      <footer style={{ textAlign: 'center', padding: '4rem 1rem', opacity: .75 }}>
        Made with love for Prachi &mdash; {new Date().getFullYear()}
      </footer>
    </>
  );
}

export default App;
