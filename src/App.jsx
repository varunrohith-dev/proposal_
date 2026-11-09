import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FloatingParticles from './components/FloatingParticles';
import OpeningLetter from './components/OpeningLetter';
import PhotoStory from './components/PhotoStory';
import PhotoManagementDashboard from './components/PhotoManagementDashboard';
import EndingSurprise from './components/EndingSurprise';
import { DEFAULT_PHOTOS, INITIAL_LETTER } from './data/defaultPhotos';
import { romanticAudio } from './utils/audioSynthesizer';

export default function App() {
  // Navigation view: 'letter' | 'story' | 'manage' | 'surprise'
  const [activeView, setActiveView] = useState('letter');
  
  // Photos state with localStorage persistence
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('joma_photos_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load photos from localStorage:", e);
    }
    return DEFAULT_PHOTOS;
  });

  // Letter state with localStorage persistence
  const [letterData, setLetterData] = useState(() => {
    try {
      const saved = localStorage.getItem('joma_letter_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load letter from localStorage:", e);
    }
    return INITIAL_LETTER;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);

  // Sync photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('joma_photos_v1', JSON.stringify(photos));
    } catch (e) {
      // ignore quota exceeded for very large blob urls
    }
  }, [photos]);

  // Sync letter to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('joma_letter_v1', JSON.stringify(letterData));
    } catch (e) {
      console.warn(e);
    }
  }, [letterData]);

  // Music toggle
  const toggleMusic = () => {
    if (isMusicPlaying) {
      romanticAudio.stopMelody();
      setIsMusicPlaying(false);
    } else {
      romanticAudio.startMelody();
      setIsMusicPlaying(true);
    }
  };

  // TTS Voice Synthesis
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      // Prefer a natural soft English voice if available
      const preferredVoice = voices.find(v => 
        (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Google UK English Female') || v.name.includes('Karen') || v.name.includes('Female')) && v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  };

  const toggleTts = () => {
    if (isTtsEnabled) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsTtsEnabled(false);
    } else {
      setIsTtsEnabled(true);
      speakText("Voice narration enabled. I will read our romantic memories to you.");
    }
  };

  // Preview Website action from Photo Studio Dashboard
  const handlePreviewWebsite = () => {
    setCurrentIndex(0);
    setActiveView('story');
    if (!isMusicPlaying) {
      romanticAudio.startMelody();
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07020d] text-white flex flex-col justify-between selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Floating Particles and Ambient Starlight Dust */}
      <FloatingParticles />

      {/* Main Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
        isTtsEnabled={isTtsEnabled}
        toggleTts={toggleTts}
        totalPhotos={photos.length}
        categorizedCount={photos.length}
      />

      {/* Primary Content Router */}
      <main className="flex-1 w-full relative z-10 pb-12">
        {activeView === 'letter' && (
          <OpeningLetter
            letterData={letterData}
            setLetterData={setLetterData}
            onStartStory={() => {
              setCurrentIndex(0);
              setActiveView('story');
            }}
            onOpenStudio={() => setActiveView('manage')}
            speakText={speakText}
          />
        )}

        {activeView === 'story' && (
          <PhotoStory
            photos={photos}
            setPhotos={setPhotos}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onFinishStory={() => setActiveView('surprise')}
            onOpenStudio={() => setActiveView('manage')}
            speakText={speakText}
            isTtsEnabled={isTtsEnabled}
          />
        )}

        {activeView === 'manage' && (
          <PhotoManagementDashboard
            photos={photos}
            setPhotos={setPhotos}
            onPreviewWebsite={handlePreviewWebsite}
          />
        )}

        {activeView === 'surprise' && (
          <EndingSurprise
            onRestartStory={() => {
              setCurrentIndex(0);
              setActiveView('story');
            }}
            onOpenStudio={() => setActiveView('manage')}
            onOpenLetter={() => setActiveView('letter')}
            speakText={speakText}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 border-t border-purple-500/15 text-center text-xs text-purple-300/50 backdrop-blur-md relative z-10">
        <p className="flex items-center justify-center gap-1.5">
          <span>Created with eternal love for Joma</span>
          <span className="text-purple-400">💜</span>
          <span>• 12 Chapters of Our Story</span>
        </p>
      </footer>
    </div>
  );
}

