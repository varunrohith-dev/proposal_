import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Sparkles, 
  Smile, 
  Gem, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Gift,
  Crop
} from 'lucide-react';
import { CATEGORIES } from '../data/defaultPhotos';
import { romanticAudio } from '../utils/audioSynthesizer';

export default function PhotoStory({
  photos,
  currentIndex,
  setCurrentIndex,
  onFinishStory
}) {
  const [isHeartBurst, setIsHeartBurst] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [fitMode, setFitMode] = useState('contain'); // 'contain' | 'cover'
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentPhoto = photos[currentIndex] || photos[0];
  const total = photos.length;

  // Slideshow Auto-Play timer
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < total - 1) {
          romanticAudio.playPageTurn();
          return prev + 1;
        } else {
          setIsAutoPlay(false);
          onFinishStory();
          return prev;
        }
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    romanticAudio.playPageTurn();
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinishStory();
    }
  };

  const handlePrev = () => {
    romanticAudio.playPageTurn();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const triggerHeartReaction = () => {
    romanticAudio.playHeartChime();
    setIsHeartBurst(true);
    setTimeout(() => setIsHeartBurst(false), 900);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const categoryInfo = CATEGORIES.find(c => c.id === currentPhoto?.category) || CATEGORIES[0];

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case "Solo Photo": return <Sparkles className="w-3.5 h-3.5" />;
      case "Couple Photo": return <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />;
      case "Funny Photo": return <Smile className="w-3.5 h-3.5 text-amber-400" />;
      case "Special Memory": return <Gem className="w-3.5 h-3.5 text-violet-300" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  if (!currentPhoto) return null;

  return (
    <div className="min-h-[88vh] flex flex-col justify-between max-w-6xl mx-auto px-4 py-4 md:py-6 relative z-10">
      
      {/* Top Header Bar: Progress Indicator & Controls */}
      <div className="flex items-center justify-between gap-3 mb-4">
        
        {/* Frame Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-400/30 text-purple-200 text-xs font-mono font-semibold tracking-wider shadow-purple-glow">
            FRAME <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span> / {total}
          </div>
        </div>

        {/* Right tools: Auto-play, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isAutoPlay 
                ? 'bg-fuchsia-600/30 border-fuchsia-400 text-fuchsia-200 shadow-purple-glow' 
                : 'glass-panel border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-300'
            }`}
            title="Auto-advance memories every 6 seconds"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-fuchsia-300 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoPlay ? "Pause Story" : "Auto-Play"}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-full glass-panel border border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-300 transition-all hidden sm:flex"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Cinematic Frame Showcase */}
      <div className="relative my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id + currentIndex}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-glow rounded-3xl overflow-hidden border border-purple-400/40 shadow-purple-glow-intense grid grid-cols-1 lg:grid-cols-12 min-h-[500px]"
          >
            {/* Left: Original Photo Frame (Preserved appearance, never cropped or modified) */}
            <div className="lg:col-span-7 bg-[#05010a] relative flex items-center justify-center p-3 md:p-6 overflow-hidden min-h-[340px] md:min-h-[460px]">
              
              {/* Subtle glowing halo behind photo */}
              <div 
                className="absolute inset-0 opacity-30 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${categoryInfo.glowColor} 0%, transparent 70%)`
                }}
              />

              {/* Photo Container - Guaranteed original aspect ratio & full face visibility */}
              <div className="relative max-h-[72vh] w-full flex items-center justify-center">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  className={`max-h-[68vh] max-w-full w-auto rounded-2xl shadow-2xl border border-purple-400/20 transition-all duration-500 ${
                    fitMode === 'contain' ? 'object-contain' : 'object-cover w-full h-[68vh]'
                  }`}
                />

                {/* Heart Burst Animation */}
                {isHeartBurst && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-7xl md:text-8xl animate-ping">💜</span>
                  </div>
                )}
              </div>

              {/* In-Frame Quick Floating Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                {/* Heart Reaction button */}
                <button
                  onClick={triggerHeartReaction}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-purple-400/40 text-purple-200 text-xs hover:scale-110 hover:border-purple-300 transition-all shadow-md group"
                >
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400 group-hover:scale-125 transition-transform" />
                  <span>Send Love</span>
                </button>

                <div className="flex items-center gap-2">
                  {/* Fit mode toggle */}
                  <button
                    onClick={() => setFitMode(fitMode === 'contain' ? 'cover' : 'contain')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-purple-400/30 text-purple-200 text-[11px] hover:border-purple-300 transition-all shadow-md"
                    title={fitMode === 'contain' ? 'Switch to Full Fill' : 'Switch to Full Contain (No Crop)'}
                  >
                    <Crop className="w-3 h-3 text-purple-300" />
                    <span className="hidden sm:inline">{fitMode === 'contain' ? 'Fit' : 'Fill'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Romantic Story */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-[#130526]/90 to-[#0a0215]/95 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-purple-500/20">
              
              <div className="space-y-4 my-auto">
                {/* Chapter Title Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/60 border border-purple-400/40 text-purple-200">
                    {currentPhoto.title || `Chapter ${String(currentIndex + 1).padStart(2, '0')}`}
                  </span>
                  <span className="text-xs font-mono text-purple-400/70 tracking-wider">
                    ✦ Memory {currentIndex + 1} of {total}
                  </span>
                </div>

                {/* Custom Text Box */}
                <div className="relative pl-4 border-l-2 border-purple-400/60 py-2">
                  <p className="text-sm md:text-base text-purple-100/95 leading-relaxed tracking-wide whitespace-pre-line font-sans">
                    {currentPhoto.text || currentPhoto.caption}
                  </p>
                </div>

                {/* Gentle reminder */}
                <div className="pt-2 flex items-center gap-2 text-[11px] text-purple-300/50">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Memory dedicated to Joma with all my heart</span>
                </div>
              </div>

              {/* Navigation Arrows Row */}
              <div className="pt-6 border-t border-purple-500/20 flex items-center justify-between gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-panel border border-purple-500/30 text-purple-200 text-xs font-medium hover:border-purple-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex < total - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white text-xs font-semibold shadow-purple-glow hover:shadow-purple-glow-lg hover:scale-105 transition-all group"
                  >
                    <span>Next Memory</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={onFinishStory}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-bold shadow-purple-glow-lg hover:shadow-purple-glow-intense hover:scale-105 transition-all animate-pulse"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Grand Surprise Ending</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bar & Thumbnail Quick-Jump Strip */}
      <div className="mt-6 space-y-3">
        {/* Glow progress bar */}
        <div className="relative w-full h-1.5 bg-purple-950/80 rounded-full overflow-hidden border border-purple-500/20">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-400 rounded-full transition-all duration-500 shadow-purple-glow"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2 px-1 scrollbar-thin">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                romanticAudio.playPageTurn();
                setCurrentIndex(idx);
              }}
              className={`relative flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden border transition-all duration-300 ${
                idx === currentIndex
                  ? 'border-fuchsia-400 scale-110 shadow-purple-glow ring-2 ring-purple-400/50'
                  : 'border-purple-500/25 opacity-55 hover:opacity-100 hover:border-purple-400'
              }`}
              title={`Jump to Frame ${idx + 1}: ${p.title}`}
            >
              <img
                src={p.url}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] font-mono text-center text-white py-0.2">
                {idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
