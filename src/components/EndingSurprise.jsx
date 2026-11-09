import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  Gift, 
  RotateCcw, 
  Sliders, 
  Stars, 
  BookOpen, 
  Award,
  Crown
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

export default function EndingSurprise({
  onRestartStory,
  onOpenStudio,
  onOpenLetter,
  speakText
}) {
  const [accepted, setAccepted] = useState(false);
  const [answeredType, setAnsweredType] = useState('');
  const [revealedLoveSecret, setRevealedLoveSecret] = useState(false);

  // Trigger romantic purple & golden confetti shower
  const launchFireworks = () => {
    romanticAudio.playHeartChime();
    
    // Heart shaped & purple/gold confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#a855f7', '#c084fc', '#e879f9', '#f472b6', '#fbbf24', '#ffffff']
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleAcceptProposal = (type) => {
    setAccepted(true);
    setAnsweredType(type);
    launchFireworks();
    speakText("My heart is yours forever, Joma. You make my entire world complete. I love you so much!");
  };

  useEffect(() => {
    // Initial gentle confetti on reaching finale
    launchFireworks();
  }, []);

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center p-4 relative z-10 animate-fade-in">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-3xl mx-auto text-center space-y-6">
        
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-glow border border-purple-400/40 text-purple-200 text-xs uppercase tracking-widest shadow-purple-glow">
          <Crown className="w-4 h-4 text-amber-300" />
          <span>Chapter 13: The Forever Chapter</span>
          <Sparkles className="w-4 h-4 text-purple-300" />
        </div>

        {/* Main Emotional Heading */}
        <h1 className="text-3xl md:text-6xl font-serifDisplay font-bold text-white tracking-wide leading-tight drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
          My Heart Chose You, <br />
          <span className="font-romantic text-5xl md:text-7xl bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
            Now & Always, Joma 💜
          </span>
        </h1>

        <p className="text-purple-200/90 text-sm md:text-lg max-w-xl mx-auto font-sans leading-relaxed">
          Twelve memories could never be enough to contain the love I hold for you. You are my quiet comfort, my loudest laughter, and my favorite tomorrow.
        </p>

        {/* Emotional Proposal Card */}
        <div className="glass-panel-glow rounded-3xl p-6 md:p-10 border-2 border-purple-400/40 shadow-purple-glow-intense relative overflow-hidden my-6">
          
          {/* Animated pulsing heart in center */}
          <div className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-600 shadow-purple-glow-lg animate-pulse-glow">
              <Heart className="w-12 h-12 text-white fill-white animate-bounce" />
            </div>
          </div>

          {!accepted ? (
            <div className="space-y-6">
              <h2 className="text-xl md:text-3xl font-serifDisplay font-semibold text-white">
                "Will you walk through all of life's chapters by my side?"
              </h2>
              <p className="font-romantic text-2xl md:text-3xl text-purple-200 max-w-lg mx-auto">
                No matter where life takes us, through every storm and every sunshine... I promise to love you more with every heartbeat.
              </p>

              {/* Proposal Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => handleAcceptProposal('forever')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-sm shadow-purple-glow-lg hover:shadow-purple-glow-intense hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <Heart className="w-4 h-4 text-pink-300 fill-pink-300 group-hover:scale-125 transition-transform" />
                  <span>YES! Always & Forever 💜</span>
                </button>

                <button
                  onClick={() => handleAcceptProposal('thousand')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold text-sm shadow-purple-glow-lg hover:shadow-purple-glow-intense hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 group-hover:rotate-45 transition-transform" />
                  <span>YES, A Thousand Times Over! ✨</span>
                </button>
              </div>
            </div>
          ) : (
            /* Accepted State Celebration */
            <div className="space-y-5 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                <span>SHE SAID YES! Best Decision Ever 💜</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-serifDisplay font-bold text-white text-glow-purple">
                You Just Made Me The Happiest Person Alive!
              </h2>

              <p className="font-romantic text-2xl md:text-4xl text-fuchsia-200 leading-relaxed max-w-xl mx-auto">
                Thank you for being my dream come true, my heart, and my destiny. Every single day with you is a gift I will treasure for eternity.
              </p>

              {/* Secret note reveal button */}
              {!revealedLoveSecret ? (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      romanticAudio.playHeartChime();
                      setRevealedLoveSecret(true);
                      launchFireworks();
                    }}
                    className="px-6 py-2.5 rounded-full bg-purple-900/60 border border-purple-400/50 text-purple-200 text-xs font-medium hover:bg-purple-800 hover:text-white transition-all shadow-md inline-flex items-center gap-2"
                  >
                    <Gift className="w-4 h-4 text-pink-400 animate-bounce" />
                    <span>Unwrap One Last Secret Love Note</span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 to-fuchsia-950/80 border border-purple-400/40 text-left space-y-2 animate-fade-in shadow-lg">
                  <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">
                    ✦ Secret Midnight Whisper:
                  </span>
                  <p className="font-romantic text-2xl text-purple-100 leading-relaxed">
                    "I loved you yesterday, I love you still, I always have, I always will. When you smile at me, Joma, nothing else in the world matters."
                  </p>
                  <p className="text-right text-xs text-purple-300/80 font-sans">
                    — Crafted with endless devotion for Jo ma 💜
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={onRestartStory}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-purple-500/30 text-purple-200 text-xs font-medium hover:border-purple-300 hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay 12-Frame Story</span>
          </button>

          <button
            onClick={onOpenLetter}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-purple-500/30 text-purple-200 text-xs font-medium hover:border-purple-300 hover:text-white transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Re-read Love Letter</span>
          </button>

          <button
            onClick={onOpenStudio}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-purple-500/30 text-purple-200 text-xs font-medium hover:border-purple-300 hover:text-white transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Photo Studio Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}

