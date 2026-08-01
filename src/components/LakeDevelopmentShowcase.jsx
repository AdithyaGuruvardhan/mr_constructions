import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function LakeDevelopmentShowcase() {
  const container = useRef();
  const expandImgRef = useRef();
  const textGroupRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=250%", 
        scrub: 1,
      }
    });

    // Initial state for the expanding image (Center Bottom box)
    // 30% to 70% horizontally, 75% to 100% vertically -> forms a box in the center bottom
    gsap.set(expandImgRef.current, {
      clipPath: "polygon(30% 75%, 70% 75%, 70% 100%, 30% 100%)"
    });

    // Animate the expanding image to full screen
    tl.to(expandImgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power2.inOut"
    }, 0);

    // Fade out the text and background images as it expands
    tl.to(textGroupRef.current, {
      opacity: 0,
      scale: 0.95,
      ease: "power2.inOut"
    }, 0);

  }, { scope: container });

  return (
    <div ref={container} className="relative h-[350vh] w-full bg-white font-sans">
      
      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white">
        
        {/* Static Elements Group (Fades out on scroll) */}
        <div ref={textGroupRef} className="absolute inset-0 w-full h-full flex items-center justify-center p-6">
          
          {/* Top Left Vertical Image */}
          <div className="absolute top-0 md:top-10 left-10 w-[40vw] md:w-[25vw] h-[40vh] md:h-[60vh]">
            <img 
              src="/hospital/hospital.png" 
              alt="Infosys Foundation Jayadeva Hospital Left" 
              className="w-full h-full object-cover rounded-[1.5rem] shadow-2xl relative z-10" 
            />
          </div>

          {/* Bottom Right Vertical Image */}
          <div className="absolute bottom-0 md:bottom-10 right-0 md:right-10 w-[40vw] md:w-[20vw] h-[55vh]">
            <img 
              src="/hospital/hospital (1).JPG" 
              alt="Infosys Foundation Jayadeva Hospital Right" 
              className="w-full h-full object-cover rounded-[1.5rem]" 
            />
          </div>
          
          {/* Center Text Description */}
          <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#2d2d2d] mb-6">
              Infosys Foundation Jayadeva Hospital Building, Bangalore
            </h2>
            <div className="w-[2px] h-16 md:h-24 bg-[#2d2d2d]/50 mb-8"></div>
            
            <p className="text-base md:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed mb-6 font-medium">
              We undertook the construction of the Infosys Foundation Jayadeva Hospital Building in Bangalore. The state-of-the-art facility is designed to provide world-class healthcare infrastructure.
            </p>
            <p className="text-base md:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed font-medium">
              Our scope of work included the complete civil and structural construction, specialized medical infrastructure integration, MEP services, and finishing works, ensuring the highest standards of safety and quality.
            </p>

            {/* Small View Project Badge */}
            <div className="mt-8 md:mt-12 flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 z-20 group hidden sm:flex">
              <span className="absolute text-[8px] md:text-[10px] font-semibold uppercase tracking-widest text-[#2d2d2d] text-center z-10 group-hover:text-[#ff761f] transition-colors duration-300">
                View<br/>Project
              </span>
              <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
                <path id="circlePathHospital" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
                <text>
                  <textPath href="#circlePathHospital" startOffset="0" className="text-[9.5px] font-medium tracking-[0.18em] fill-[#2d2d2d]/60 uppercase">
                    EXPLORE • DISCOVER • EXPLORE • DISCOVER
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
          
        </div>

        {/* Expanding Center Bottom Image */}
        <div ref={expandImgRef} className="absolute inset-0 w-[95vw] h-full z-20 shadow-2xl top-50 left-1/2 transform -translate-x-1/2">
          <img 
            src="/hospital/MRC jayadeva 2S _81.JPG" 
            alt="Infosys Foundation Jayadeva Hospital Panorama" 
            className="w-full h-full object-cover rounded-[1.5rem]" 
          />
        </div>

      </div>
    </div>
  );
}
