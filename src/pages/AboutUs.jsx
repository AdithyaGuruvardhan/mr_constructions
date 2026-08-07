import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const cardsRef = useRef(null);
  const sectionRef = useRef(null);
  const pointsRef = useRef(null);

  useGSAP(() => {
    // 1. Container comes in when section is reached
    gsap.from(cardsRef.current, {
      y: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Triggers before it gets pinned
        toggleActions: "play none none reverse"
      }
    });

    // 2. Points scrub in while section is pinned
    gsap.from(pointsRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 5%",
        end: "+=100%",
        pin: true,
        scrub: 1,
      }
    });
  });

  return (
    <div className="relative w-full min-h-screen bg-white text-[#2d2d2d] pb-20 font-sans overflow-hidden">

      {/* Layered Parallax Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[90vh] flex items-center justify-center overflow-hidden mb-12 md:mb-20 bg-[#e0e0e0]">

        {/* Background Image Layer */}
        <img
          src="/bg.png"
          alt="Background Skyline"
          className="absolute inset-0 w-full h-full object-cover object-[50%_70%] z-0"
        />

        {/* Sandwiched Text Layer */}
        <h1 className="relative z-10 text-[18vw] md:text-[16vw] leading-none font-bold uppercase tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-transparent opacity-80 select-none -translate-y-12 md:-translate-y-24 drop-shadow-md">
          ABOUT US
        </h1>

        {/* Foreground Image Layer */}
        <img
          src="/fg.png"
          alt="Foreground Building"
          className="absolute inset-0 w-full h-full object-cover object-[50%_70%] z-20 pointer-events-none"
        />

        {/* Fade to white at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-38 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-30">

        {/* Capabilities Inline Image Section */}
        <div className="flex justify-center mb-24 md:mb-32 w-full">
          <p className="text-xl md:text-2xl lg:text-3xl text-[#2d2d2d] leading-relaxed md:leading-relaxed max-w-6xl text-center uppercase font-medium tracking-wide">
            We cover the full construction value chain - <br className="hidden lg:block" />
            design management, civil construction,{' '}
            infrastructure, finishing, and MEP -{' '}
            backed by experienced teams and modern methods, delivering practical, efficient, long-lasting builds.
          </p>
        </div>

        {/* Engineered for Performance / Vision & Mission Section */}
        <div className="flex flex-col mb-24">

          {/* Top Full Width Text & CTA */}
          <div className="w-full flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-[#2d2d2d] uppercase">
              OUR COMMITMENT
            </div>
            <p className="text-2xl md:text-3xl lg:text-[2rem] text-[#4a4a4a] leading-tight mb-8 max-w-5xl">
              As we continue to expand into larger and more complex developments, our focus remains unchanged—to deliver projects that meet the highest standards of quality while creating lasting value for every stakeholder.
            </p>

            <button className="flex items-center justify-between bg-[#111111] text-white px-2 py-2 rounded-full w-44 hover:bg-[#2d2d2d] transition-colors shadow-lg">
              <span className="pl-4 text-sm font-medium tracking-wide">Get in touch</span>
              <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </button>
          </div>

          {/* Cards & Image Row */}
          <div className="flex flex-col lg:flex-row items-end gap-6 md:gap-8">

            {/* Left: Vision & Mission Cards */}
            <div className="flex flex-col md:flex-row gap-4 w-full lg:w-1/2">

              {/* Vision Card */}
              <div className="bg-[#f5f5f7] rounded-[2rem] p-6 md:p-8 flex-1 flex flex-col hover:bg-[#f0f0f2] transition-colors">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mb-6 shadow-sm text-lg">
                  ✦
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#2d2d2d] mb-3">Vision</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  To shape the built environment through engineering excellence, responsible construction practices, and enduring partnerships that stand the test of time.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-[#f5f5f7] rounded-[2rem] p-6 md:p-8 flex-1 flex flex-col hover:bg-[#f0f0f2] transition-colors">
                <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mb-6 shadow-sm text-lg">
                  ✧
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#2d2d2d] mb-3">Mission</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  To deliver construction solutions that combine technical expertise, operational excellence, and uncompromising quality.
                </p>
              </div>

            </div>

            {/* Right: Image */}
            <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden h-[400px] lg:h-[550px] shadow-lg">
              <img src="/infosys_hubli.png" alt="Engineering Excellence" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent"></div>

              {/* Image Overlay Text */}
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-white">
                <p className="text-base md:text-lg font-medium max-w-lg leading-relaxed text-gray-100">
                  At MRC, excellence goes beyond the structures we build - it's in the confidence we inspire. Our commitment to safety, transparency, and engineering integrity forges enduring relationships with every client and partner.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Why MRC Section - Layered Parallax Layout */}
      <div ref={sectionRef} className="relative w-[90vw] max-w-[1800px] mx-auto rounded-[3rem] overflow-hidden min-h-[900px] lg:min-h-[1000px] mb-24 shadow-2xl flex flex-col justify-start bg-[#e6e4e0] z-30">

          {/* Layer 1: Background Image */}
          <img src="/temple_bg.png" alt="Temple Background" className="absolute inset-0 w-full h-full object-cover object-[50%_0%] z-0" />

          {/* Layer 2: Content (Title and Cards) */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-start justify-between px-8 md:px-16 pt-10 lg:pt-14 gap-8">

            {/* Left: Hero Title */}
            <div className="w-full lg:w-5/12 flex flex-col items-start z-10">
              <h2 className="text-6xl md:text-[5.5rem] font-medium text-[#f2f2f2] leading-[0.9] tracking-tighter uppercase w-full">
                Why MRC
              </h2>
              <div className="ml-2 mt-4 flex flex-row flex-wrap gap-3 md:gap-4 uppercase tracking-widest text-[10px] md:text-xs font-bold items-center">
                 <span className="bg-white text-[#2d2d2d] px-5 py-2.5 rounded-full shadow-md">Excellence</span>
                 <span className="bg-white text-[#2d2d2d] px-5 py-2.5 rounded-full shadow-md">Quality</span>
                 <span className="bg-white text-[#2d2d2d] px-5 py-2.5 rounded-full shadow-md">Trust</span>
              </div>
            </div>

            {/* Right: The Cards inside a beautiful glass/white container */}
            <div ref={cardsRef} className="w-full lg:w-7/12 bg-white/95 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] shadow-2xl relative lg:-mr-8 z-10 flex flex-col border border-white/20 mt-4 lg:mt-0 min-h-[600px] lg:min-h-[700px]">

              {/* Top badges */}
              <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
                <span className="border border-gray-200 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Excellence</span>
                <span className="border border-gray-200 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quality</span>
                <span className="border border-[#3b3228] bg-[#3b3228] text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden md:block">Trust</span>
              </div>

              <h3 className="text-2xl md:text-4xl text-[#2d2d2d] font-bold mb-6 md:mb-8 leading-tight">Uncompromising standards & precision</h3>

              {/* The 8 points in a 2-col grid */}
              <div ref={pointsRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                {[
                  "Two Decades of Proven Expertise",
                  "ISO-Certified Quality Systems",
                  "End-to-End Construction Capabilities",
                  "Government & Private Sector Experience",
                  "Precision-Driven Project Management",
                  "Design, Civil, Infrastructure, Finishing & MEP Excellence",
                  "Safety-Led Execution",
                  "Timely Delivery. Lasting Value"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start md:items-center gap-3 md:gap-4">
                    <span className="text-[#8c7362] shrink-0 text-xs md:text-base mt-1 md:mt-0">✦</span>
                    <span className="text-[#2d2d2d] font-bold text-sm md:text-lg leading-snug md:leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Layer 3: Foreground Image */}
          <img src="/temple_fg.png" alt="Temple Foreground" className="absolute inset-0 w-full h-full object-cover object-[50%_0%] pointer-events-none z-20" />
        </div>

        {/* Core Values & Ethics Section (Full Width) */}
        <div className="relative w-full overflow-hidden min-h-[800px] lg:min-h-[900px] flex flex-col justify-center bg-gray-900 z-30">
          
          {/* Background Image */}
          <img 
            src="/commercial/infosys/INFOSYS%20HUBLI50.jpg" 
            alt="Infosys Hubli Background" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
          
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>

          <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 py-24">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              
              {/* Column 1: Title & Card 2 */}
              <div className="flex flex-col justify-between gap-12 lg:gap-32">
                <div className="text-white pt-4">
                  <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter uppercase drop-shadow-lg">
                    Core Values <br className="hidden lg:block"/> & Ethics
                  </h2>
                  <div className="mt-8 w-24 h-1 bg-[#f97316]"></div>
                </div>
                
                <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/20 hover:bg-white transition-colors duration-300">
                  <p className="text-sm md:text-xl text-[#1a1a1a] font-medium leading-relaxed">
                    We are committed to maintaining the highest standards of professionalism, ethics, and transparency across all aspects of our business. Our reputation has been earned through consistent delivery, uncompromising quality, and a client-centric approach that fosters lasting relationships built on trust.
                  </p>
                </div>
              </div>

              {/* Column 2: Card 1 */}
              <div className="flex flex-col justify-center lg:pt-32">
                <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/20 hover:bg-white transition-colors duration-300">
                  <p className="text-sm md:text-xl text-[#1a1a1a] font-medium leading-relaxed">
                    At MRC Construction Company, our foundation is built on the enduring principles of quality, integrity, and unwavering commitment—values established by our founder, Mr. M. Ramesh, and upheld in every project we undertake.
                  </p>
                </div>
              </div>

              {/* Column 3: Card 3 */}
              <div className="flex flex-col justify-end lg:pb-12">
                <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/20 hover:bg-white transition-colors duration-300">
                  <p className="text-sm md:text-xl text-[#1a1a1a] font-medium leading-relaxed">
                    Integrity is not merely a principle we follow—it is the cornerstone of every decision we make.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

    </div>
  );
}
