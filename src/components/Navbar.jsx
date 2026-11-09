import React from 'react';
import { 
  Heart, 
  BookOpen, 
  Sparkles,
  Camera,
  Gift
} from 'lucide-react';

export default function Navbar({
  activeView,
  setActiveView,
  isTtsEnabled,
  toggleTts
}) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#090312]/80 border-b border-purple-500/20 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo / Title */}
        <div 
          onClick={() => setActiveView('letter')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-purple-700 to-fuchsia-600 shadow-purple-glow transition-transform group-hover:scale-110">
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serifDisplay font-bold text-lg md:text-xl tracking-wide bg-gradient-to-r from-purple-200 via-fuchsia-200 to-purple-400 bg-clip-text text-transparent group-hover:text-purple-200 transition-colors">
                For Jo ma
              </span>
              <span className="text-purple-400 text-sm">💜</span>
            </div>
            <p className="text-[10px] text-purple-300/70 uppercase tracking-widest font-mono">
              Eternal Romance
            </p>
          </div>
        </div>

        {/* Center Nav tabs: Pure romantic journey without studio pill */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full glass-panel border border-purple-500/25">
          <button
            onClick={() => setActiveView('letter')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeView === 'letter'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-purple-glow font-semibold'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Love Letter</span>
          </button>

          <button
            onClick={() => setActiveView('story')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeView === 'story'
                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-purple-glow font-semibold'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photo Story (12 Frames)</span>
          </button>

          <button
            onClick={() => setActiveView('surprise')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeView === 'surprise'
                ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-purple-glow font-semibold'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
            <span>Grand Finale</span>
          </button>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2">
          {/* TTS Toggle */}
          <button
            onClick={toggleTts}
            title={isTtsEnabled ? "Disable Voice Narration" : "Enable Romantic Voice Narration"}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isTtsEnabled 
                ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-purple-glow' 
                : 'bg-purple-950/40 border-purple-500/20 text-purple-400 hover:border-purple-400/40'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isTtsEnabled ? 'text-yellow-300 animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isTtsEnabled ? "Voice ON" : "Voice Narrate"}</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-bar */}
      <div className="md:hidden flex items-center justify-around mt-2.5 pt-2 border-t border-purple-500/15 text-[11px]">
        <button
          onClick={() => setActiveView('letter')}
          className={`px-3 py-1 rounded-md ${activeView === 'letter' ? 'text-purple-300 font-bold bg-purple-900/30' : 'text-purple-400/80'}`}
        >
          💌 Letter
        </button>
        <button
          onClick={() => setActiveView('story')}
          className={`px-3 py-1 rounded-md ${activeView === 'story' ? 'text-purple-300 font-bold bg-purple-900/30' : 'text-purple-400/80'}`}
        >
          📸 Story (12)
        </button>
        <button
          onClick={() => setActiveView('surprise')}
          className={`px-3 py-1 rounded-md ${activeView === 'surprise' ? 'text-pink-300 font-bold bg-purple-900/30' : 'text-purple-400/80'}`}
        >
          💖 Finale
        </button>
      </div>
    </header>
  );
}
