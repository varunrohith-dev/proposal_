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
        <h1 className="text-3xl md:text-5xl font-serifDisplay font-bold text-white tracking-wide leading-tight drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
          My Heart Chose You, <br />
          <span className="font-romantic text-4xl md:text-6xl bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
            Now & Always, Joma 💜
          </span>
        </h1>

        {/* Emotional Forever Card */}
        <div className="glass-panel-glow rounded-3xl p-6 md:p-10 border-2 border-purple-400/40 shadow-purple-glow-intense relative overflow-hidden my-6 text-left">
          
          {/* Animated pulsing heart in center */}
          <div className="flex justify-center mb-6">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-600 shadow-purple-glow-lg animate-pulse-glow">
              <Heart className="w-10 h-10 text-white fill-white animate-bounce" />
            </div>
          </div>

          {/* Custom Grand Finale Text Box */}
          <div className="space-y-4 text-sm md:text-base text-purple-100/95 leading-relaxed tracking-wide font-sans">
            <p>
              Unkitta ethana vaati solliruppen nu enakke count theriyala... but honestly, un heart-lendhu varra andha one simple phrase, &ldquo;I Love You&rdquo; kekkuradhukkaaga dhaan naan ivlo naala wait pannittu irukken. 🥺💜 Nee en kaiya strong-ah pudichittu, &ldquo;You&apos;re the one for me&rdquo; nu oru vaati sonna podhum, enakku adha vida periya happiness vera edhuvum illa. 🫶
            </p>

            <p>
              Family situations-ah irukkattum, doubts-ah irukkattum, illa life-la evlo struggles vandhaalum, I&apos;ll stand by you and face every obstacle together. Idhellam just words illa, it&apos;s a promise from the bottom of my heart. 💜
            </p>

            <p>
              Evlo difficult situation vandhaalum unna vittu pogavum maatten, un trust-ah eppovume break pannavum maatten. You&apos;re someone incredibly special to me, and I genuinely want you beside me until my last breath. 💜♾️🧿
            </p>

            <p className="font-medium text-fuchsia-200 pt-2 border-t border-purple-500/20">
              En heart wait pannittu irukkuradhu ore oru vishayathukkaga dhaan... one day, un lips-lerndhu andha &ldquo;I Love You&rdquo; kekkanum. 🥹💜🫂
            </p>

            <div className="pt-4 text-right">
              <p className="font-romantic text-2xl text-fuchsia-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]">
                — Aravind 💜
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
