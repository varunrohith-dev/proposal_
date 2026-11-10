import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowRight, 
  RotateCcw
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

export default function OpeningLetter({ 
  letterData, 
  onStartStory
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    romanticAudio.playHeartChime();
    setIsOpen(true);
  };

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center p-4 relative z-10">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Top greeting badge */}
      <div className="mb-6 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-purple-400/30 text-purple-200 text-xs tracking-wider uppercase mb-2 shadow-purple-glow">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span>A Dedicated Romantic Gift For Joma</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
        </div>
        <h1 className="text-3xl md:text-5xl font-serifDisplay font-bold text-white tracking-wide">
          Every Moment With You Is Magic
        </h1>
        <p className="text-purple-300/80 text-sm md:text-base mt-2 max-w-lg mx-auto">
          Tap the sealed letter below to uncover the words written only for your eyes...
        </p>
      </div>

      {!isOpen ? (
        /* Envelope Closed State */
        <div 
          onClick={handleOpenEnvelope}
          className="cursor-pointer group relative w-full max-w-md mx-auto aspect-[16/11] transition-transform duration-500 hover:scale-[1.03]"
        >
          {/* Envelope Glow Rim */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

          {/* Envelope Body */}
          <div className="relative h-full w-full rounded-2xl bg-gradient-to-b from-[#190730] to-[#0d0219] border border-purple-400/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
            
            {/* Elegant Corner Filigrees */}
            <div className="absolute top-3 left-3 text-purple-500/40 text-xs">✦ ✦ ✦</div>
            <div className="absolute top-3 right-3 text-purple-500/40 text-xs">✦ ✦ ✦</div>
            
            {/* Top First Line Display */}
            <div className="pt-2 text-center">
              <span className="font-romantic text-3xl md:text-4xl text-purple-200 font-semibold tracking-wide drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]">
                {letterData.greeting || "Hi Jo ma! 💜"}
              </span>
              <p className="text-xs text-purple-300/60 font-mono tracking-widest mt-1">
                SEALED WITH ENDLESS AFFECTION
              </p>
            </div>

            {/* Wax Seal in Center */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-600 to-purple-800 shadow-[0_0_30px_rgba(168,85,247,0.7)] border-2 border-purple-200/50 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
              </div>
            </div>

            {/* Bottom Footer of Envelope */}
            <div className="text-center text-xs text-purple-300/70 font-sans flex items-center justify-center gap-1.5">
              <span>Touch the heart seal to open your letter</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
            </div>
          </div>
        </div>
      ) : (
        /* Envelope Opened / Unfolded Letter State */
        <div className="w-full max-w-2xl mx-auto relative animate-fade-in transition-all">
          
          {/* Outer Glow Frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/60 via-fuchsia-600/50 to-indigo-600/60 rounded-3xl blur-xl" />

          {/* Letter Sheet */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#18082e] via-[#120524] to-[#090214] border-2 border-purple-400/40 p-6 md:p-10 shadow-2xl backdrop-blur-2xl">
            
            {/* Action Bar Header */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-purple-400 hover:text-purple-200 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Fold back</span>
              </button>

              <span className="text-xs font-mono text-purple-400/70 tracking-widest uppercase">
                Forever Yours
              </span>
            </div>

            {/* Letter Content */}
            <div className="space-y-6">
              <div>
                <h2 className="font-romantic text-4xl md:text-5xl text-purple-200 font-bold tracking-wide drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]">
                  {letterData.greeting}
                </h2>
                <p className="text-sm font-sans text-purple-300/70 italic mt-1">
                  {letterData.subtitle}
                </p>
              </div>

              <div className="space-y-4 font-romantic text-xl md:text-2xl text-purple-100/90 leading-relaxed tracking-wide">
                {letterData.paragraphs.map((para, idx) => (
                  <p key={idx} className="transition-all hover:text-white">
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-6 border-t border-purple-500/20 text-right">
                <p className="font-sans text-sm text-purple-300/80">
                  {letterData.closing}
                </p>
                <p className="font-romantic text-3xl text-fuchsia-300 font-semibold mt-1 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]">
                  {letterData.signature}
                </p>
              </div>
            </div>

            {/* Bottom Button to Start Story */}
            <div className="mt-8 pt-6 border-t border-purple-500/20 flex items-center justify-center">
              <button
                onClick={() => {
                  romanticAudio.playHeartChime();
                  onStartStory();
                }}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white font-medium text-sm md:text-base shadow-purple-glow-lg hover:shadow-purple-glow-intense hover:scale-105 transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>Begin Our 11-Frame Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
