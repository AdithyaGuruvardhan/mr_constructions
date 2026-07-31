import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HubliSchoolShowcase() {
  const container = useRef();
  const schoolImgRef = useRef();
  const textRef = useRef();
  const leavesRef = useRef();

  useGSAP(() => {
    // Main scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=150%", // Scroll distance
        scrub: 1,
      }
    });

    // Set initial clip-path: a tiny circle at the bottom center
    gsap.set(schoolImgRef.current, {
      clipPath: "circle(0% at 50% 100%)"
    });

    // Animate the circle expanding to cover the entire screen
    tl.to(schoolImgRef.current, {
      clipPath: "circle(150% at 50% 100%)",
      ease: "power1.inOut"
    }, 0);

    // Fade out text as the image is revealed
    tl.to(textRef.current, {
      opacity: 0,
      y: -50,
      ease: "power1.inOut"
    }, 0);

    // Parallax mouse movement using GSAP quickTo for high performance
    const xTo = gsap.quickTo(leavesRef.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(leavesRef.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * -60;
      const moveY = (e.clientY / window.innerHeight - 0.5) * -60;
      xTo(moveX);
      yTo(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: container });

  return (
    <div ref={container} className="relative h-[250vh] w-full bg-white font-sans">

      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white">

        {/* The School Image Layer (z-10, behind text) */}
        <div
          ref={schoolImgRef}
          className="absolute inset-0 w-full h-full z-10"
        >
          <img
            src="/Hubli_School.png"
            alt="Hubli School Project"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Static Text Layer (z-20) */}
        <div ref={textRef} className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 z-20 pointer-events-none mt-38">
          <div className="max-w-3xl text-center flex flex-col items-center pointer-events-auto">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#2d2d2d] mb-6 drop-shadow-sm">
              Ramakrishna Mission School, Hubli
            </h2>
            <div className="w-[2px] h-16 md:h-24 bg-[#2d2d2d]/50 mb-8"></div>

            <p className="text-lg md:text-2xl text-[#2d2d2d] leading-relaxed font-medium drop-shadow-sm">
              We undertook the construction of a CBSE school building for Ramakrishna Mission at Hubli, covering an area of 35,000 sft.
            </p>
          </div>
        </div>

        {/* Interactive Foreground Leaves Layer (z-30) */}
        {/* Moves slightly based on mouse position for a parallax effect */}
        <div
          ref={leavesRef}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none scale-105"
        >
          <img
            src="/Hubli_School_leaves.png"
            alt="Leaves Overlay"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
