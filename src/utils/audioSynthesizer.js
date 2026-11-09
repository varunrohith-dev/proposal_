// Web Audio API romantic melody synthesizer & sound effects
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.volumeNode = null;
    this.currentStep = 0;
    this.volume = 0.35;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = vol;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  // Romantic pentatonic chord progression (Db major / Bb minor dreamy feel)
  playNote(frequency, duration = 1.6, type = 'sine') {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Soft envelope for dreamy music-box / harp / warm electric piano vibe
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.28, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.volumeNode);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  startMelody() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Frequencies for a romantic, gentle, slow arpeggio (C#4, F4, G#4, C5, F5, G#5, etc.)
    const chordProgression = [
      // F Minor 9
      [174.61, 349.23, 415.30, 523.25, 698.46],
      // Db Major 7
      [138.59, 277.18, 349.23, 415.30, 523.25],
      // Eb Major
      [155.56, 311.13, 392.00, 466.16, 622.25],
      // Ab Major
      [207.65, 415.30, 523.25, 622.25, 830.61],
      // Bb Minor 7
      [233.08, 466.16, 554.37, 698.46, 932.33],
      // C Minor 7
      [261.63, 523.25, 622.25, 783.99, 1046.50]
    ];

    let chordIdx = 0;
    let arpeggioStep = 0;

    const tick = () => {
      if (!this.isPlaying) return;

      const currentChord = chordProgression[chordIdx];
      const freq = currentChord[arpeggioStep % currentChord.length];

      // Play soft harmonic note
      this.playNote(freq, 2.2, 'sine');

      // Occasionally add higher chime
      if (arpeggioStep % 3 === 0) {
        this.playNote(freq * 2, 2.8, 'triangle');
      }

      arpeggioStep++;
      if (arpeggioStep >= currentChord.length) {
        arpeggioStep = 0;
        chordIdx = (chordIdx + 1) % chordProgression.length;
      }

      this.timerId = setTimeout(tick, 580);
    };

    tick();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  // Romantic heart click sound effect
  playHeartChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.8, 'sine');
      }, idx * 70);
    });
  }

  // Page turn chime
  playPageTurn() {
    this.init();
    if (!this.ctx) return;
    this.playNote(440, 0.4, 'sine');
    setTimeout(() => {
      this.playNote(554.37, 0.5, 'sine');
    }, 90);
  }
}

export const romanticAudio = new RomanticAudioEngine();

