import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  Crown
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

export default function EndingSurprise() {
  // Trigger romantic purple & golden confetti shower
  const launchFireworks = () => {
    romanticAudio.playHeartChime();
    
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#a855f7', '#c084fc', '#e879f9', '#f472b6', '#fbbf24', '#ffffff']
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  useEffect(() => {
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
          <span>The Forever Chapter</span>
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
          Eleven memories could never be enough to contain the love I hold for you. You are my quiet comfort, my loudest laughter, and my favorite tomorrow.
        </p>

        {/* Emotional Forever Card */}
        <div className="glass-panel-glow rounded-3xl p-6 md:p-10 border-2 border-purple-400/40 shadow-purple-glow-intense relative overflow-hidden my-6">
          
          {/* Animated pulsing heart in center */}
          <div className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-600 shadow-purple-glow-lg animate-pulse-glow">
              <Heart className="w-12 h-12 text-white fill-white animate-bounce" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl md:text-3xl font-serifDisplay font-semibold text-white">
              "Will you walk through all of life's chapters by my side?"
            </h2>
            <p className="font-romantic text-2xl md:text-3xl text-purple-200 max-w-lg mx-auto">
              No matter where life takes us, through every storm and every sunshine... I promise to love you more with every heartbeat.
            </p>

            {/* Secret Love Note */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 to-fuchsia-950/80 border border-purple-400/40 text-left space-y-2 shadow-lg">
              <span className="text-xs font-mono uppercase text-purple-400 tracking-wider">
                ✦ Midnight Whisper:
              </span>
              <p className="font-romantic text-2xl text-purple-100 leading-relaxed">
                "I loved you yesterday, I love you still, I always have, I always will. When you smile at me, Joma, nothing else in the world matters."
              </p>
              <p className="text-right text-xs text-purple-300/80 font-sans">
                — Crafted with endless devotion for Jo ma 💜
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
