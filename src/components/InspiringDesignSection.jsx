import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InspiringDesignSection() {
  const isDark = false;
  const pinContainerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Only do horizontal scroll on desktop (lg and above)
      const isDesktop = window.innerWidth >= 1024;
      
      if (isDesktop && trackRef.current && pinContainerRef.current) {
        gsap.to(trackRef.current, {
          x: () => -(trackRef.current.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + trackRef.current.offsetWidth,
            invalidateOnRefresh: true,
          }
        });
      }
    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={pinContainerRef} className="relative w-full bg-[#fff0e6] overflow-hidden flex flex-col justify-start lg:h-screen lg:flex-row lg:items-center">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        .font-editorial {
          font-family: 'Playfair Display', serif;
        }
        .spin-slow {
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        `}
      </style>

      {/* Horizontal Scrolling Track */}
      <div ref={trackRef} className="flex flex-col lg:flex-row w-full lg:w-max h-full">
        
        {/* Slide 1: Main Title and First Image */}
        <div className="w-full lg:w-[100vw] h-full flex items-center px-6 md:px-12 pt-12 pb-4 lg:py-0 shrink-0">
          <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col xl:flex-row h-full items-center justify-start xl:gap-16 gap-12">
            
            {/* Left Side (Typography) */}
            <div className="w-full xl:w-[30%] relative flex flex-col justify-center xl:min-h-[80vh]">
              {/* Main Huge Typography */}
              <div className="relative md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-4 z-30 pointer-events-none mt-12 xl:mt-0 xl:ml-4">
                <h2 className="font-editorial text-[16vw] md:text-[5.5vw] leading-[0.8] tracking-[-0.03em] text-[#131b2c] drop-shadow-xl md:drop-shadow-none">
                  <span className="block">MELKOTE</span>
                  <span className="block ml-12 md:ml-32 xl:ml-24">KALYANI</span>
                </h2>
              </div>
            </div>

            {/* Main Center Image */}
            <div className="w-full sm:w-[80%] md:w-[60%] xl:w-[35%] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[1.5rem] overflow-hidden relative xl:-translate-x-4 group">
              <img src="/temple/MELKOTE KALYANI3.webp" alt="Melkote Kalyani Main" className="w-full aspect-[4/5] md:aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Description Text (Right of Image) */}
            <div className="w-full sm:w-[80%] md:w-[60%] xl:w-[25%] z-20 xl:self-end xl:pb-24 flex flex-col xl:-translate-x-12">
              <h3 className="font-editorial text-[1.5rem] md:text-[1.75rem] text-[#1c1c1e] leading-[1.1] mb-6 uppercase">
                Restoring Divine Heritage & Sacred Architecture
              </h3>
              
              <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed">
                Surrounded by rich cultural history, the Melkote Kalyani project combines traditional restoration with meticulous engineering. We brought the ancient temple stepwell back to life, honoring its sacred design while ensuring structural longevity for generations. A landmark preserved not just for history, but for eternity.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 2: Gallery Collage */}
        <div className="w-full lg:w-[100vw] h-full flex flex-col lg:flex-row justify-between px-6 md:px-12 pt-4 pb-12 lg:py-16 shrink-0 gap-12">
          
          {/* Collage Item 1: Bottom Left (Vertical) */}
          <div className="w-full lg:w-[35vw] h-auto lg:h-full flex flex-col justify-between items-start lg:-mb-16">
            
            {/* View Project Circular Badge */}
            <Link to="/portfolio/t2" className="flex relative items-center justify-center w-24 h-24 lg:w-28 lg:h-28 md:w-32 md:h-32 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 group mt-0 lg:mt-0 xl:mt-8 lg:-ml-20 mb-8 lg:mb-0">
              {/* Center Text */}
              <span className="absolute text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#1c1c1e] text-center z-10 group-hover:text-[#6b6b6b] transition-colors duration-300">
                View<br/>Project
              </span>
              {/* Rotating Circular Text */}
              <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
                <path id="circlePathMelkote" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
                <text>
                  <textPath href="#circlePathMelkote" startOffset="0" className="text-[9.5px] font-medium tracking-[0.18em] fill-[#1c1c1e]/60 uppercase">
                    EXPLORE • DISCOVER • EXPLORE • DISCOVER
                  </textPath>
                </text>
              </svg>
            </Link>

            <div className="w-full sm:w-[70%] lg:w-[65%] shadow-[0_1px_5px_rgba(0,0,0,0.3)] rounded-[1.5rem] overflow-hidden relative group mt-0 lg:mt-auto">
              <img src="/temple/MELKOTE KALYANI19.webp" alt="Melkote Kalyani detail" className="w-full aspect-[4/5] lg:aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-black/2 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>

          {/* Collage Item 2: Top Right Side with Text */}
          <div className="w-full lg:w-[45vw] h-auto lg:h-full flex flex-col justify-start lg:items-end -mt-10 pb-12 lg:pb-0 lg:-translate-x-12 xl:-translate-x-20">
            
            {/* Image (Top Right - Horizontal) */}
            <div className="w-full lg:w-[90%] shadow-[0_1px_20px_rgba(0,0,0,0.3)] rounded-[1.5rem] overflow-hidden relative group">
              <img src="/temple/MELKOTE KALYANI16.webp" alt="Melkote Kalyani structure" className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Text Below (Offset towards center) */}
            <div className="w-full lg:w-[95%] mt-12 lg:mt-10 self-start flex flex-col gap-8">
               <h3 className="font-editorial text-[1.5rem] lg:text-[1.3rem] text-[#1c1c1e] leading-[1.1] uppercase text-center lg:text-left">
                 Every detail was preserved to create<br className="hidden lg:block"/> spaces that feel sacred, timeless and<br className="hidden lg:block"/> effortless to experience
               </h3>
               
               <div className="flex justify-center lg:justify-end w-full">
                 <p className="text-[#6b6b6b] text-[12px] md:text-sm max-w-[280px] text-center lg:text-left leading-relaxed">
                   Careful restoration of ancient stonework throughout the structure. Traditional water management systems. Structural reinforcements using authentic materials. Hand-carved architectural elements matching historical accuracy.
                 </p>
               </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
