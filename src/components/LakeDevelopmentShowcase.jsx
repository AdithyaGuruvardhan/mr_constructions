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
          
          {/* Top Left Vertical Image (Sharp corners, a bit to the top) */}
          <div className="absolute top-0 md:top-10 left-10 w-[40vw] md:w-[25vw] h-[40vh] md:h-[60vh]">
            <img 
              src="/Lake Development_vert.png" 
              alt="Lake Development Left" 
              className="w-full h-full object-cover rounded-none shadow-2xl" 
            />
          </div>

          {/* Bottom Right Vertical Image (Sharp corners) */}
          <div className="absolute bottom-0 md:bottom-10 right-0 md:right-10 w-[40vw] md:w-[20vw] h-[55vh]">
            <img 
              src="/Lake Development_vert (1).png" 
              alt="Lake Development Right" 
              className="w-full h-full object-cover rounded-none" 
            />
          </div>
          
          {/* Center Text Description */}
          <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#2d2d2d] mb-6">
              Hebbal Lake, Mysore
            </h2>
            <div className="w-[2px] h-16 md:h-24 bg-[#2d2d2d]/50 mb-8"></div>
            
            <p className="text-base md:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed mb-6 font-medium">
              We undertook the Lake Development & Construction project at Hebbal Lake, Mysore, for Infosys Limited, in association with architects TRC. The project covered an 8 MLD capacity STP with full site development, completed in 15 months.
            </p>
            <p className="text-base md:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed font-medium">
              Our scope included a 78,000 sft floor area for the 8 MLD facility, lake development, 5 kms of roads, and all associated civil and finishing works.
            </p>
          </div>
          
        </div>

        {/* Expanding Center Bottom Image */}
        <div ref={expandImgRef} className="absolute inset-0 w-[90vw] h-full z-20 shadow-2xl top-50 left-1/2 transform -translate-x-1/2">
          <img 
            src="/Lake Development.png" 
            alt="Lake Development Panorama" 
            className="w-full h-full object-cover rounded-none" 
          />
        </div>

      </div>
    </div>
  );
}
