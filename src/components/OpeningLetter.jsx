import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Edit3, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

export default function OpeningLetter({ 
  letterData, 
  setLetterData, 
  onStartStory, 
  speakText, 
  onOpenStudio 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftGreeting, setDraftGreeting] = useState(letterData.greeting);
  const [draftSubtitle, setDraftSubtitle] = useState(letterData.subtitle);
  const [draftParagraphs, setDraftParagraphs] = useState(letterData.paragraphs);
  const [draftClosing, setDraftClosing] = useState(letterData.closing);
  const [draftSignature, setDraftSignature] = useState(letterData.signature);

  const handleOpenEnvelope = () => {
    romanticAudio.playHeartChime();
    setIsOpen(true);
  };

  const handleSaveEdits = () => {
    setLetterData({
      greeting: draftGreeting,
      subtitle: draftSubtitle,
      paragraphs: draftParagraphs,
      closing: draftClosing,
      signature: draftSignature
    });
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    setDraftGreeting("Hi Jo ma! 💜");
    setDraftSubtitle("A little love letter written from the depths of my soul...");
    setDraftParagraphs([
      "To my prettiest soul, my forever favorite human, and the light that softens every shadow in my world.",
      "I created this haven of memories just for you — to capture every smile that made my heart race, every laughter we shared under midnight skies, and every quiet second where time paused just for us.",
      "Walk with me through our twelve chapters. Every frame holds a piece of my heart that belongs entirely to you.",
      "Whenever you are ready, turn the page and let our journey unfold..."
    ]);
    setDraftClosing("Forever & Always Yours,");
    setDraftSignature("With All My Love 💜");
  };

  const readFullLetter = () => {
    const fullText = `${letterData.greeting}. ${letterData.paragraphs.join(' ')} ${letterData.closing} ${letterData.signature}`;
    speakText(fullText);
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-purple-400 hover:text-purple-200 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Fold back</span>
                </button>
                <span className="text-purple-600">•</span>
                <button
                  onClick={readFullLetter}
                  className="text-xs text-purple-300 hover:text-white flex items-center gap-1 transition-colors bg-purple-900/30 px-2.5 py-1 rounded-full border border-purple-500/20"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Listen to Letter</span>
                </button>
              </div>

              {/* Edit Mode Toggle */}
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSaveEdits();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  isEditing 
                    ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 shadow-md' 
                    : 'bg-purple-900/40 border-purple-400/30 text-purple-300 hover:border-purple-300 hover:text-white'
                }`}
              >
                {isEditing ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Save Custom Letter</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Customize Words</span>
                  </>
                )}
              </button>
            </div>

            {/* Letter Content */}
            {!isEditing ? (
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
            ) : (
              /* Editable Letter Form */
              <div className="space-y-4 animate-fade-in text-sm">
                <div className="flex items-center justify-between text-xs text-purple-300/70">
                  <span>Edit your personalized message for Joma below:</span>
                  <button 
                    onClick={handleResetToDefault}
                    className="hover:underline text-purple-400"
                  >
                    Reset to romantic default
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">
                    First Line / Greeting
                  </label>
                  <input
                    type="text"
                    value={draftGreeting}
                    onChange={(e) => setDraftGreeting(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-input font-romantic text-2xl text-purple-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={draftSubtitle}
                    onChange={(e) => setDraftSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">
                    Letter Body Paragraphs (One per line)
                  </label>
                  <textarea
                    rows={5}
                    value={draftParagraphs.join('\n\n')}
                    onChange={(e) => setDraftParagraphs(e.target.value.split('\n\n').filter(p => p.trim().length > 0))}
                    className="w-full px-3 py-2 rounded-xl glass-input font-romantic text-xl text-purple-100"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-purple-300 mb-1">
                      Closing Salutation
                    </label>
                    <input
                      type="text"
                      value={draftClosing}
                      onChange={(e) => setDraftClosing(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-purple-300 mb-1">
                      Signature
                    </label>
                    <input
                      type="text"
                      value={draftSignature}
                      onChange={(e) => setDraftSignature(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-input font-romantic text-2xl text-fuchsia-300"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1.5 rounded-xl text-xs text-purple-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdits}
                    className="px-5 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-purple-glow hover:scale-105 transition-transform"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Button to Start Story */}
            <div className="mt-8 pt-6 border-t border-purple-500/20 flex items-center justify-center">
              <button
                onClick={() => {
                  romanticAudio.playHeartChime();
                  onStartStory();
                }}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white font-medium text-sm md:text-base shadow-purple-glow-lg hover:shadow-purple-glow-intense hover:scale-105 transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>Begin Our 12-Frame Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

