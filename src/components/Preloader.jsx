import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const duration = 2500; // 2.5 seconds
    const interval = 25; // 25ms per frame
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Custom easing or just linear
      let currentProgress = (currentStep / steps) * 100;
      
      // Make it slow down slightly at the end for effect
      if (currentProgress > 90) {
        currentProgress = 90 + ((currentProgress - 90) * 0.5);
      }
      
      const roundedProgress = Math.min(Math.round(currentProgress), 100);
      setProgress(roundedProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setProgress(100);
        
        // Brief pause at 100% before fading out
        setTimeout(() => {
          setIsFading(true);
          
          // Trigger onComplete after zoom animation
          setTimeout(() => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 1000); // 1000ms zoom duration
        }, 200);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center ${isFading ? 'pointer-events-none' : ''}`}>
      {/* Background that fades out */}
      <div className={`absolute inset-0 bg-[#1c1c1e] transition-opacity duration-1000 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`} />
      
      {/* Content */}
      <div className="flex flex-col items-center w-64 md:w-80 relative z-10">
        <img 
          src="/mrc_logo.png" 
          alt="MR Constructions Loading" 
          className={`w-full h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]`}
          style={{ 
            transform: isFading ? 'scale(40)' : 'scale(1)',
            opacity: isFading ? 0 : 1 
          }}
        />
        
        {/* Progress Bar Container */}
        <div className={`w-full absolute top-full mt-10 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden mb-4 relative">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-[#2c52a1] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="w-full flex justify-between items-center text-white/50 text-xs md:text-sm font-medium tracking-widest uppercase">
            <span>Loading...</span>
            <span className="font-mono text-white/80">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
