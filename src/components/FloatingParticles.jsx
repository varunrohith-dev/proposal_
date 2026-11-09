import React, { useEffect, useState } from 'react';

export default function FloatingParticles() {
  const [particles, setParticles] = useState([]);
  const [mouseSparkles, setMouseSparkles] = useState([]);

  useEffect(() => {
    // Generate initial floating ambient particles
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 10,
      symbol: ['💜', '✨', '🌸', '💫', '✦', '•'][Math.floor(Math.random() * 6)],
      opacity: Math.random() * 0.45 + 0.15
    }));
    setParticles(items);

    // Subtle mouse move sparkle
    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 90) return;
      lastTime = now;

      const newSparkle = {
        id: now + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4
      };

      setMouseSparkles(prev => [...prev.slice(-12), newSparkle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (mouseSparkles.length === 0) return;
    const timer = setTimeout(() => {
      setMouseSparkles(prev => prev.slice(1));
    }, 900);
    return () => clearTimeout(timer);
  }, [mouseSparkles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/15 rounded-full blur-[110px]" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-fuchsia-700/12 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] bg-indigo-900/15 rounded-full blur-[130px]" />

      {/* Floating gentle particles */}
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute select-none transition-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            filter: 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.6))',
            animation: `heartFloat ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`
          }}
        >
          {p.symbol}
        </span>
      ))}

      {/* Mouse trail stardust */}
      {mouseSparkles.map(s => (
        <span
          key={s.id}
          className="absolute rounded-full bg-purple-400 pointer-events-none transition-all duration-700 ease-out animate-ping"
          style={{
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: '0 0 12px 3px rgba(192, 132, 252, 0.8)',
            opacity: 0.65
          }}
        />
      ))}
    </div>
  );
}

