# 🎉 Prachi's Animated Birthday Site

An eye‑catching, celebratory, fully animated birthday website built with React + Vite, Framer Motion, and MUI. Designed for a joyful, immersive experience with photos, blessings, music, and sparkling effects.

## 🧩 Stack
- React 18 / Vite
- Framer Motion (entrances, sliders, fades, scale, float)
- MUI + Emotion (theme + responsive typography)
- Howler (looped audio playback)
- Canvas Confetti + custom particle field

## ✨ Core Features
- Fully responsive and motion‑rich

```

## 🛠 Customization Guide
1. Photos: Edit `src/data/photos.js` – replace placeholder Unsplash links with local files (place images in `public/` and reference as `/yourImage.jpg`) or your own hosted URLs.
2. Wishes: Update text in `src/data/wishes.js` for both carousel and blessing overlays.
3. Hero: Personalize heading / DOB line in `src/components/Hero/Hero.jsx`.
4. Music: In `src/hooks/useAudioPlayer.js`, change the audio source (file in `public/` e.g. `/song.mp3`). Ensure correct MIME type.
5. Theme: Adjust colors & gradient in `src/theme/index.jsx` (see `customGradients.brand`). Typography scales automatically.

## 🎵 Autoplay Behavior
Modern browsers may block autoplay with sound. We attempt one autoplay on mount. If blocked, a subtle message appears and the user can click Play. Audio loops once playing.

## 🌈 Adding More Photos
- Large images: Prefer optimized (≤ 2500px width) and compressed (WebP/JPEG) to keep bundle light.
- For many images, consider lazy loading / intersection observer enhancement (future improvement below).

## 🚀 Deployment Options
### Vercel (Recommended)
1. Push the repo to GitHub.
2. Import into Vercel → Framework preset: Vite.
3. Build command: `npm run build`; Output directory: `dist`.
4. Deploy. (Automatic on pushes to main.)

### GitHub Pages
1. Run `npm run build` (creates `dist`).
2. Serve `dist` via Pages (Action or manual). If using a project subpath, set `base: '/your-repo-name/'` in `vite.config.js`.

## 🔧 Suggested Next Enhancements
- Memory detail modals (expand timeline items)
- Low‑res → high‑res progressive image loading (blur-up)
- Guest message board (serverless or local JSON) / wishes form
- Share card generator (canvas export / OG image build step)
- Social share buttons with prefilled message
- Optional dark mode toggle
- Accessibility pass (ARIA focus trapping on dialogs, alt text audit)

## 📁 Key File Map
- `src/App.jsx` – Page composition and section order
- `src/components/Slideshow/PhotoSlideshow.jsx` – Crossfade slideshow component
- `src/components/Blessings/BlessingSlider.jsx` – Auto slider logic & transitions
- `src/components/Effects/FloatingDecor.jsx` – GSAP floating hearts/balloons
- `src/components/Messages/MessagesSection.jsx` – Fading staggered messages
- `src/components/Ending/EndingSection.jsx` – Fireworks + final message
- `src/hooks/useAudioPlayer.js` – Audio playback state (Howler wrapper)
- `src/motion/variants.js` – Central animation variants
- `src/theme/index.jsx` – MUI theme + gradient reference
- `src/data/photos.js` / `src/data/wishes.js` / `src/data/messages.js` – Content sources

## ⚠️ Notes
- Remove unused libraries if not needed (e.g. `gsap` if never used).
- Browser autoplay policies differ; test on mobile Safari + Chrome.
- Keep image alt text meaningful for accessibility.

## 📄 License
Personal / Private celebratory use. Not for commercial redistribution.

Enjoy the celebration! 🎂
