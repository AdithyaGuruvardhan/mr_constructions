import React, { useEffect, useRef, useState } from 'react';

const logosRow1 = [
  { src: '/clients/infosys.webp', alt: 'Infosys' },
  { src: '/clients/iit.webp', alt: 'IIIT Dharwad' },
  { src: '/clients/tata.webp', alt: 'Tata Memorial' },
  { src: '/clients/namma_metro.webp', alt: 'Namma Metro' },
];

const logosRow2 = [
  { src: '/clients/infosys1.webp', alt: 'Infosys' },
  { src: '/clients/kiwadi.webp', alt: 'Kidwai' },
  { src: '/clients/elcita.webp', alt: 'Elcita' },
  { src: '/clients/hospital.webp', alt: 'Hospital' },
  { src: '/clients/elcia.webp', alt: 'Elcia' },
];

export default function ClienteleSection() {
  const sectionRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      // Get the distance from the top of the viewport to the top of the section
      const rect = sectionRef.current.getBoundingClientRect();
      
      // Calculate how far the section has scrolled into view
      // window.innerHeight is the bottom of the screen. 
      // When rect.top equals window.innerHeight, it just entered the screen.
      const scrollPos = window.innerHeight - rect.top; 
      
      if (scrollPos > 0) {
        // Multiplier 0.15 controls the speed of the parallax scroll
        setScrollOffset(scrollPos * 0.15); 
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 overflow-hidden w-full flex flex-col items-center">
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
        {/* Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-[2.75rem] font-medium text-[#2c52a1] mb-4 leading-tight">
            Trusted By Leaders
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg max-w-2xl mx-auto">
            The prominent organizations that have entrusted us with their landmark projects.
          </p>
        </div>
      </div>

      {/* Desktop View: Scroll-driven Parallax Rows */}
      <div className="hidden md:flex w-full flex-col gap-8 relative overflow-visible">
        
        {/* Top Row (Scrolls Left as you scroll down) */}
        {/* We use a left margin (ml-[35%]) to create that staggered offset shown in your design */}
        <div 
          className="flex w-max gap-8 ml-[35%]"
          style={{ transform: `translateX(-${scrollOffset}px)`, transition: 'transform 0.1s ease-out' }}
        >
          {logosRow1.map((logo, index) => (
            <div 
              key={`row1-${index}`} 
              className="w-72 h-36 bg-[#e2e2e2] rounded-[2rem] flex items-center justify-center p-4 shrink-0 shadow-sm transition-transform hover:scale-105"
            >
              <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom Row (Scrolls Right as you scroll down) */}
        {/* We use a negative left margin (-ml-[10%]) to offset it to the left initially */}
        <div 
          className="flex w-max gap-8 -ml-[10%]"
          style={{ transform: `translateX(${scrollOffset}px)`, transition: 'transform 0.1s ease-out' }}
        >
          {logosRow2.map((logo, index) => (
            <div 
              key={`row2-${index}`} 
              className="w-72 h-36 bg-[#e2e2e2] rounded-[2rem] flex items-center justify-center p-4 shrink-0 shadow-sm transition-transform hover:scale-105"
            >
              <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View: Static Flex Grid */}
      <div className="flex md:hidden w-full px-6 flex-wrap justify-center gap-3">
        {[...logosRow1, ...logosRow2].map((logo, index) => (
          <div 
            key={`mobile-${index}`} 
            className="w-[calc(50%-0.5rem)] h-24 bg-[#e2e2e2] rounded-[1.25rem] flex items-center justify-center p-3 shadow-sm"
          >
            <img src={logo.src} alt={logo.alt} className="max-w-[85%] max-h-[85%] object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}
