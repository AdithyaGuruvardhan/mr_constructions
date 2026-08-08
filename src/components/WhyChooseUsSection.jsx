import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Affordable Price",
    description: "We deliver quality construction solutions without compromising on your budget."
  },
  {
    title: "On-Time Delivery",
    description: "We respect project timelines and ensure every milestone is met as committed."
  },
  {
    title: "Quality Assured",
    description: "Our dedication to Safety, Quality, Delivery, Management, and Cost has made us an industry leader."
  },
  {
    title: "Extensive Experience",
    description: "From IT Parks & hospitals to educational institutions & temples, our diverse project portfolio speaks for our expertise."
  }
];

export default function WhyChooseUsSection() {
  const containerRef = useRef();
  const headerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#fcfcfc] pt-20 pb-16 md:pt-[14rem] md:pb-12 overflow-hidden font-sans">
      
      {/* Massive Background Watermark */}
      <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[10vw] leading-none font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-20 opacity-80 whitespace-nowrap">
          Why Choose Us
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-10 md:mb-14 flex flex-col items-center">
          <div className="w-[2px] h-16 md:h-20 bg-[#ff761f] mb-8"></div>
          <p className="text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl mx-auto">
            With 17+ years of experience and 125+ projects delivered, M R Constructions has established itself as a trusted name in construction and engineering.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const isDark = index % 2 !== 0; // Odd indices are dark to match image
            return (
              <div 
                key={index}
                className={`feature-card relative ${isDark ? 'bg-[#2c2c2e] text-white' : 'bg-gray-200 text-[#1c1c1e] shadow-sm'} p-6 sm:p-8 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 flex flex-col min-h-[160px] md:min-h-[240px]`}
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs md:text-sm leading-relaxed mb-10 md:mb-12`}>
                  {feature.description}
                </p>
                
                {/* Circular Arrow Icon */}
                <div className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${isDark ? 'bg-white text-black' : 'bg-[#1c1c1e] text-white'}`}>
                  <svg className="w-4 h-4 md:w-5 md:h-5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
