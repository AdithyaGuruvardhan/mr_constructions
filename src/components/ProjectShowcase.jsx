import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcase() {
  const container = useRef();
  const leftMaskRef = useRef();
  const rightMaskRef = useRef();
  const textRef = useRef();
  const sideElementsRef = useRef();
  const imgLeftRef = useRef();
  const imgRightRef = useRef();

  useGSAP(() => {
    // We use a sticky container instead of GSAP pin to prevent layout glitches
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=400%", // Extended scroll duration to accommodate the pan
        scrub: 1, // Smooth scrubbing
      }
    });

    // 1. Initial State: Polygons placed partially on-screen at top and bottom
    // Left mask is 60% tall, starting at the top edge (0% to 60%)
    gsap.set(leftMaskRef.current, {
      clipPath: "polygon(35% 0%, 49.5% 0%, 49.5% 60%, 35% 60%)"
    });
    // Right mask is 60% tall, starting at the bottom edge (40% to 100%)
    gsap.set(rightMaskRef.current, {
      clipPath: "polygon(50.5% 40%, 65% 40%, 65% 100%, 50.5% 100%)"
    });

    // Phase 1: Slide in from top/bottom to the center (with a small gap between them)
    tl.to(leftMaskRef.current, {
      clipPath: "polygon(35% 20%, 49.5% 20%, 49.5% 80%, 35% 80%)",
      ease: "power1.out"
    }, 0);
    tl.to(rightMaskRef.current, {
      clipPath: "polygon(50.5% 20%, 65% 20%, 65% 80%, 50.5% 80%)",
      ease: "power1.out"
    }, 0);

    // Phase 2: Merge the gap in the center (Overlap slightly to hide sub-pixel line)
    tl.to(leftMaskRef.current, {
      clipPath: "polygon(35% 20%, 50.5% 20%, 50.5% 80%, 35% 80%)",
      ease: "none"
    }, 1);
    tl.to(rightMaskRef.current, {
      clipPath: "polygon(49.5% 20%, 65% 20%, 65% 80%, 49.5% 80%)",
      ease: "none"
    }, 1);

    // Fade out side elements as they merge
    tl.to(sideElementsRef.current, {
      opacity: 0,
      ease: "none"
    }, 1);

    // Phase 3: Expand both polygons outward to fill the screen (keep the overlap)
    tl.to(leftMaskRef.current, {
      clipPath: "polygon(0% 0%, 50.5% 0%, 50.5% 100%, 0% 100%)",
      ease: "power2.inOut"
    }, 2);
    tl.to(rightMaskRef.current, {
      clipPath: "polygon(49.5% 0%, 100% 0%, 100% 100%, 49.5% 100%)",
      ease: "power2.inOut"
    }, 2);

    // Phase 4: Letter stagger animation for the title
    tl.fromTo(".title-char", 
      { opacity: 0, y: 50, rotateX: -80, scale: 0.8 }, 
      { opacity: 1, y: 0, rotateX: 0, scale: 1, ease: "power2.out", duration: 0.4, stagger: 0.02 }, 
    2.3);

    // Phase 5: Pan the images and text up to simulate scrolling down the full image
    tl.to([imgLeftRef.current, imgRightRef.current, textRef.current], {
      y: () => {
        // Calculate how much the image overflows the window height
        const overflow = imgLeftRef.current.offsetHeight - window.innerHeight;
        // Pan up by the overflow amount (only if it actually overflows)
        return Math.min(0, -overflow);
      },
      ease: "none",
      duration: 2 // Give it plenty of time in the timeline to scroll naturally
    }, 3);

  }, { scope: container });

  return (
    <>
    <div ref={container} className="relative h-[500vh] w-full bg-white">

      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* Decorative Side Elements */}
        <div ref={sideElementsRef} className="absolute inset-0 flex justify-between p-6 md:p-16 pointer-events-none z-10 font-sans">

          {/* Left Side (Rotated Badge & Line) */}
          <div className="flex flex-col items-center justify-start pt-10 md:pt-20">
            <div className="w-16 h-16 md:w-24 md:h-24 border border-[#2d2d2d] rounded-full flex items-center justify-center text-[10px] md:text-xs tracking-widest text-[#2d2d2d] uppercase -rotate-90 text-center leading-tight">
              MR<br />Const
            </div>
            <div className="w-[1px] h-20 md:h-32 bg-[#2d2d2d]/30 mt-8 md:mt-12"></div>
          </div>

          {/* Right Side (Title & Instructions) */}
          <div className="flex flex-col items-end text-right pt-10 md:pt-20">
            <h3 className="text-xl md:text-4xl text-[#2d2d2d] uppercase tracking-widest font-medium mb-4">
              Selected<br />Work
            </h3>
            <p className="text-xs md:text-sm text-[#6b6b6b] tracking-[0.2em] uppercase flex flex-col items-end gap-2">
              <span>Scroll</span>
              <span className="h-12 w-[1px] bg-[#6b6b6b]/50 block"></span>
            </p>
          </div>
        </div>

        {/* Left Mask Image */}
        <div ref={leftMaskRef} className="absolute inset-0 w-full h-full shadow-2xl">
          <img
            ref={imgLeftRef}
            src="/infosys_hubli.png"
            alt="Infosys New Campus, Hubli"
            className="absolute top-0 left-0 w-full h-auto min-h-screen object-cover object-top"
          />
        </div>

        {/* Right Mask Image */}
        <div ref={rightMaskRef} className="absolute inset-0 w-full h-full shadow-2xl">
          <img
            ref={imgRightRef}
            src="/infosys_hubli.png"
            alt="Infosys New Campus, Hubli"
            className="absolute top-0 left-0 w-full h-auto min-h-screen object-cover object-top"
          />
        </div>

        {/* Top Aligned Text Content */}
        <div
          ref={textRef}
          className="absolute top-0 left-0 w-full pt-32 md:pt-36 pointer-events-none z-20 flex flex-col items-center"
          style={{ perspective: '1000px' }}
        >
          <h2 className="text-white font-bold text-4xl sm:text-5xl md:text-[3rem] lg:text-[4.5rem] xl:text-[5.5rem] uppercase tracking-tight text-center leading-[0.95] px-4 w-full whitespace-nowrap">
            {"Infosys New Campus, Hubli".split('').map((char, index) => (
              <span key={index} className="inline-block title-char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>

      </div>
    </div>
    
    {/* Post-Showcase Description Section */}
    <div className="w-full bg-white py-8 md:py-16 px-6">
      <div className="max-w-4xl mx-auto text-center font-sans flex flex-col items-center">
        <div className="w-[2px] h-20 md:h-32 bg-[#2d2d2d]/70 mb-8 md:mb-12"></div>
        <p className="text-lg md:text-2xl lg:text-3xl text-[#2d2d2d] leading-relaxed mb-8">
          M R Constructions delivered the New Campus Development for Infosys Limited at Hubli, in association with architects M/s RSP Consultants. We covered a built-up area of 378,000 sq. ft. with full site development, completed in 24 months.
        </p>
        <p className="text-lg md:text-2xl lg:text-3xl text-[#2d2d2d] leading-relaxed">
          Our scope included the SDB (G+5), Food Court (G+2), UGR, amphitheater, land development, compound walls, and all associated roads, services, and finishing works.
        </p>
      </div>
    </div>
    </>
  );
}
