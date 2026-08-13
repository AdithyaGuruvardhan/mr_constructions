import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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
  const cloudRef = useRef();
  const cloudRightRef = useRef();

  useGSAP(() => {
    // We use a sticky container instead of GSAP pin to prevent layout glitches
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=120%", // Adjusted scroll duration since we removed a phase
        scrub: 1, // Smooth scrubbing
      }
    });

    // 1. Initial State: Rectangles placed partially on-screen at top and bottom
    // Left mask is 60% tall, starting at the top edge
    gsap.set(leftMaskRef.current, {
      clipPath: "inset(0% 50.5% 40% 35% round 1.5rem)"
    });
    // Right mask is 60% tall, starting at the bottom edge
    gsap.set(rightMaskRef.current, {
      clipPath: "inset(40% 35% 0% 50.5% round 1.5rem)"
    });

    // Phase 1: Slide in from top/bottom to the center (with a small gap between them)
    tl.to(leftMaskRef.current, {
      clipPath: "inset(20% 50.5% 20% 35% round 1.5rem)",
      ease: "none"
    }, 0);
    tl.to(rightMaskRef.current, {
      clipPath: "inset(20% 35% 20% 50.5% round 1.5rem)",
      ease: "none"
    }, 0);

    // Phase 2: Expand both outward to fill the screen and merge the gap, happening immediately at 1
    tl.to(leftMaskRef.current, {
      clipPath: "inset(0% 49.5% 0% 0% round 0px)",
      ease: "none"
    }, 1);
    tl.to(rightMaskRef.current, {
      clipPath: "inset(0% 0% 0% 49.5% round 0px)",
      ease: "none"
    }, 1);

    // Fade out side elements as they expand
    tl.to(sideElementsRef.current, {
      opacity: 0,
      ease: "none"
    }, 1);

    // Cloud animation: come front, move out and get hidden
    tl.to(cloudRef.current, {
      scale: 8,
      x: "-60vw",
      y: "-20vh",
      opacity: 0,
      ease: "power2.inOut"
    }, 1);

    tl.to(cloudRightRef.current, {
      scale: 8,
      x: "60vw",
      y: "20vh",
      opacity: 0,
      ease: "power2.inOut"
    }, 1);

    // Phase 3: Letter stagger animation for the title
    tl.fromTo(".title-char", 
      { opacity: 0, y: 50, rotateX: -80, scale: 0.8 }, 
      { opacity: 1, y: 0, rotateX: 0, scale: 1, ease: "power2.out", duration: 0.4, stagger: 0.02 }, 
    1.3);

    // Phase 4: Pan the images and text up to simulate scrolling down the full image
    tl.to([imgLeftRef.current, imgRightRef.current, textRef.current], {
      y: () => {
        // Calculate how much the image overflows the window height
        const overflow = imgLeftRef.current.offsetHeight - window.innerHeight;
        // Pan up by the overflow amount (only if it actually overflows)
        return Math.min(0, -overflow);
      },
      ease: "none",
      duration: 2 // Give it plenty of time in the timeline to scroll naturally
    }, 2);

  }, { scope: container });

  return (
    <>
    <div ref={container} className="relative h-[220vh] w-full bg-[#e4f7ff]">

      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* Decorative Side Elements */}
        <div ref={sideElementsRef} className="absolute inset-0 flex justify-between p-6 md:p-16 pointer-events-none z-10 font-sans">

          {/* Left Side (Rotated Badge & Line) */}
          <div className="flex flex-col items-center justify-end pb-10 md:pb-0">
            <div className="w-[1px] h-20 md:h-32 bg-[#2d2d2d]/30 mb-8 md:mb-12"></div>
            <div className="w-16 h-16 md:w-24 md:h-24 border border-[#2d2d2d] rounded-full flex items-center justify-center text-[10px] md:text-xs tracking-widest text-[#2d2d2d] uppercase -rotate-90 text-center leading-tight">
              MRC
            </div>
          </div>

          {/* Right Side (Title & Instructions) */}
          <div className="flex flex-col items-end text-right pt-20 md:pt-20">
            <h3 className="text-xl md:text-4xl text-[#2d2d2d] uppercase tracking-widest font-medium mb-4">
              Best<br />Work
            </h3>
            <p className="text-xs md:text-sm text-[#6b6b6b] tracking-[0.2em] uppercase flex flex-col items-end gap-2">
              <span>Scroll</span>
              <span className="h-12 w-[1px] bg-[#6b6b6b]/50 block"></span>
            </p>
          </div>
        </div>

        {/* Floating Cloud (Top Left) */}
        <img
          ref={cloudRef}
          src="/clouds.webp"
          alt="Clouds"
          className="absolute top-30 left-5 md:top-30 md:left-20 w-62 md:w-132 object-contain pointer-events-none z-20 brightness-170"
        />

        {/* Floating Cloud (Bottom Right) */}
        <img
          ref={cloudRightRef}
          src="/clouds.webp"
          alt="Clouds"
          className="absolute bottom-10 right-5 md:bottom-0 md:right-10 w-62 md:w-132 object-contain pointer-events-none z-20 brightness-170"
        />

        {/* Left Mask Image */}
        <div ref={leftMaskRef} className="absolute inset-0 w-full h-full shadow-2xl">
          <img
            ref={imgLeftRef}
            src="/infosys_hubli.webp"
            alt="Infosys New Campus, Hubli"
            className="absolute top-0 left-0 w-full h-auto min-h-screen object-cover object-top"
          />
        </div>

        {/* Right Mask Image */}
        <div ref={rightMaskRef} className="absolute inset-0 w-full h-full shadow-2xl">
          <img
            ref={imgRightRef}
            src="/infosys_hubli.webp"
            alt="Infosys New Campus, Hubli"
            className="absolute top-0 left-0 w-full h-auto min-h-screen object-cover object-top"
          />
        </div>

        {/* Top Aligned Text Content */}
        <div
          ref={textRef}
          className="absolute top-0 left-0 w-full pt-24 sm:pt-32 md:pt-36 pointer-events-none z-20 flex flex-col items-center"
          style={{ perspective: '1000px' }}
        >
          <h2 className="text-white font-bold text-[10vw] sm:text-5xl md:text-[3rem] lg:text-[4.5rem] xl:text-[5.5rem] uppercase tracking-tight text-center leading-[1.1] md:leading-[0.95] px-4 w-full flex flex-wrap justify-center gap-x-2 md:gap-x-4">
            {"Infosys New Campus, Hubli".split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="inline-flex whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <span key={charIndex} className="inline-block title-char">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

      </div>
    </div>
    
    {/* Post-Showcase Description Section */}
    <div className="w-full bg-white pt-8 pb-0 md:py-16 px-6 relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center font-sans flex flex-col items-center relative z-0">
        <div className="w-[2px] h-12 md:h-20 bg-[#2d2d2d]/70 mb-8 md:mb-12"></div>
        <p className="text-lg md:text-2xl lg:text-3xl text-[#2d2d2d] leading-relaxed mb-8 sm:pr-32 lg:pr-0 px-4">
          M R Constructions delivered the <span className="font-bold">New Campus Development</span> for <span className="font-bold">Infosys Limited at Hubli</span>, in association with architects <span className="font-bold">M/s RSP Consultants</span>. We covered a built-up area of <span className="font-bold">378,000 sq. ft.</span> with full site development, completed in <span className="font-bold">24 months</span>.
        </p>
        <p className="text-lg md:text-2xl lg:text-3xl text-[#2d2d2d] leading-relaxed sm:pr-32 lg:pr-0 px-4">
          Our scope included the <span className="font-bold">SDB (G+5)</span>, <span className="font-bold">Food Court (G+2)</span>, <span className="font-bold">UGR</span>, <span className="font-bold">amphitheater</span>, land development, compound walls, and all associated roads, services, and finishing works.
        </p>
      </div>

      {/* View Project Badge */}
      <Link to="/portfolio/c1" className="relative sm:absolute mt-6 sm:mt-0 mx-auto sm:mx-0 right-auto sm:right-16 md:right-42 top-auto sm:top-1/2 transform-none sm:transform sm:-translate-y-1/2 flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 z-50 group">
        {/* Inner Circle */}
        <div className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 bg-[#2c52a1] group-hover:bg-[#1c1c1e] transition-colors duration-300 rounded-full flex items-center justify-center shadow-lg z-10">
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white text-center leading-tight">
            View<br />Project
          </span>
        </div>
        
        {/* Rotating Text */}
        <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
          <path id="circlePathHubli" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="transparent" />
          <text>
            <textPath href="#circlePathHubli" startOffset="0" className="text-[8px] font-bold tracking-[0.18em] fill-[#2d2d2d]/80 uppercase">
              EXPLORE • DISCOVER • EXPLORE • DISCOVER •
            </textPath>
          </text>
        </svg>
      </Link>
    </div>
    </>
  );
}
