import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AsymmetricalSection = ({ title, subtitle, link, imgUrl, animateFromCenter }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (animateFromCenter) {
      // Scope the selection to only this component's container
      const cards = gsap.utils.toArray('.anim-card', containerRef.current);
      if (cards.length === 0 || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenterX = containerRect.width / 2;
      const containerCenterY = containerRect.height / 2;

      gsap.from(cards, {
        x: (i, card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left - containerRect.left + rect.width / 2;
          return (containerCenterX - cardCenterX) * 0.5; // Start halfway from center
        },
        y: (i, card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterY = rect.top - containerRect.top + rect.height / 2;
          return (containerCenterY - cardCenterY) * 0.5; // Start halfway from center
        },
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.05,
        clearProps: "all",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Triggers when the top 20% of the section enters the screen
        }
      });
    }
  }, { scope: containerRef });

  return (
    <div className="mb-32 last:mb-16" ref={containerRef}>
      {/* Desktop Layout */}
      <div className="hidden md:block relative w-full max-w-[1400px] mx-auto h-[900px]">
        {/* Text Center */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 w-full max-w-2xl px-6">
          <div className="inline-block px-3 py-1 bg-[#ccffcc] text-[#004d00] text-xs font-bold tracking-widest uppercase rounded mb-6">
            Portfolio
          </div>
          <h2 className="text-5xl font-bold text-black mb-6 leading-tight">{title}</h2>
          <p className="text-gray-800 text-xl mb-8 leading-relaxed">{subtitle}</p>
          <Link to={link} className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#ff761f] transition-colors shadow-lg">
            <span className="font-semibold mr-4 text-xs md:text-sm tracking-widest uppercase">VIEW PROJECTS</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* 1. Top Left (Tall) */}
        <div className="anim-card absolute top-[2%] left-[4%] w-[16%] h-[32%] rounded-[1.5rem] overflow-hidden shadow-lg z-10 hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-left-top" />
        </div>

        {/* 2. Top Mid-Left (Wide) */}
        <div className="anim-card absolute top-[10%] left-[26%] w-[18%] h-[14%] rounded-[1rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-bottom" />
        </div>

        {/* 3. Top Right (Square) */}
        <div className="anim-card absolute top-[0%] right-[28%] w-[18%] h-[24%] rounded-[1.5rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-right-top" />
        </div>

        {/* 4. Top Right Overlay (Wide) */}
        <div className="anim-card absolute top-[12%] right-[18%] w-[14%] h-[12%] rounded-[1rem] overflow-hidden shadow-2xl z-20 hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-center" />
        </div>

        {/* 5. Mid Right (Square) */}
        <div className="anim-card absolute top-[28%] right-[4%] w-[16%] h-[24%] rounded-[1.5rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-left" />
        </div>

        {/* 6. Mid Left (Square) */}
        <div className="anim-card absolute top-[42%] left-[6%] w-[15%] h-[22%] rounded-[1.5rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-right" />
        </div>

        {/* 7. Bottom Mid-Left (Tall) */}
        <div className="anim-card absolute bottom-[2%] left-[30%] w-[17%] h-[34%] rounded-[1.5rem] overflow-hidden shadow-lg z-0 hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-left-bottom" />
        </div>

        {/* 8. Bottom Left Overlay (Wide) */}
        <div className="anim-card absolute bottom-[6%] left-[18%] w-[16%] h-[14%] rounded-[1rem] overflow-hidden shadow-2xl z-20 hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-top" />
        </div>

        {/* 9. Bottom Mid-Right (Wide) */}
        <div className="anim-card absolute bottom-[14%] right-[32%] w-[16%] h-[14%] rounded-[1rem] overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-right-bottom" />
        </div>

        {/* 10. Bottom Right (Square) */}
        <div className="anim-card absolute bottom-[4%] right-[8%] w-[18%] h-[26%] rounded-[1.5rem] overflow-hidden shadow-lg z-0 hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-center" />
        </div>

        {/* 11. Bottom Right Overlay (Tall) */}
        <div className="anim-card absolute bottom-[16%] right-[3%] w-[9%] h-[18%] rounded-[1rem] overflow-hidden shadow-2xl z-20 hover:scale-105 transition-transform duration-500">
          <img src={imgUrl} alt="" className="w-full h-full object-cover object-left" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center mt-12 mb-16 px-6">
        <div className="text-center mb-10 w-full">
          <div className="inline-block px-3 py-1 bg-[#ccffcc] text-[#004d00] text-xs font-bold tracking-widest uppercase rounded mb-4">
            Portfolio
          </div>
          <h2 className="text-3xl font-bold text-black mb-4 leading-snug">{title}</h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">{subtitle}</p>
          <Link to={link} className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#ff761f] transition-colors shadow-lg mt-2">
            <span className="font-semibold mr-4 text-xs tracking-widest uppercase">VIEW PROJECTS</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Collage of images at the bottom for mobile */}
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="col-span-2 h-48 rounded-[1.5rem] overflow-hidden shadow-md">
            <img src={imgUrl} alt="" className="w-full h-full object-cover object-center" />
          </div>
          <div className="h-32 rounded-[1rem] overflow-hidden shadow-md">
            <img src={imgUrl} alt="" className="w-full h-full object-cover object-left-top" />
          </div>
          <div className="h-32 rounded-[1rem] overflow-hidden shadow-md">
            <img src={imgUrl} alt="" className="w-full h-full object-cover object-right-bottom" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationSection = () => {
  return (
    <div className="mb-32 md:mb-48 w-full px-6 md:px-16 mt-32">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-16 md:gap-32">
        
        {/* Top: Image left, Text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Image */}
          <div className="w-full h-[500px] md:h-[650px] rounded-[2rem] overflow-hidden shadow-md">
            <img src="/hubli_school_vert.png" alt="Education" className="w-full h-full object-cover object-center" />
          </div>
          
          {/* Right: Text */}
          <div className="flex flex-col items-start justify-center pt-8 md:pt-0">
            <h2 className="text-4xl md:text-[3.5vw] font-medium text-[#1a1a1a] leading-[1.1] uppercase tracking-wide mb-8">
              SHAPING FUTURE <br/> GENERATIONS
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-lg">
              At M R Constructions, we specialize in building large-scale educational institutions. We work closely with our partners, ensuring that every classroom, library, and campus facility is built with an eye for detail, structural safety, and long-lasting quality to foster the perfect learning environment.
            </p>
          </div>
        </div>

        {/* Bottom: Centered Text with Scattered Images */}
        <div className="relative w-full py-32 flex flex-col items-center justify-center mt-8 md:mt-0">
          
          {/* Scattered Left Images */}
          <div className="hidden md:block absolute left-0 top-[10%] w-48 h-48 rounded-[1.5rem] overflow-hidden shadow-sm">
            <img src="/Hubli_School.png" alt="Detail 1" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block absolute left-[12%] top-[60%] w-28 h-28 rounded-[1rem] overflow-hidden shadow-sm">
            <img src="/Hubli_School_leaves.png" alt="Detail 2" className="w-full h-full object-cover" />
          </div>

          {/* Scattered Right Image */}
          <div className="hidden md:block absolute right-0 top-[20%] w-56 h-56 rounded-[1.5rem] overflow-hidden shadow-sm">
            <img src="/MRC shivanahalli DRONE _18.JPG" alt="Detail 3" className="w-full h-full object-cover" />
          </div>

          {/* Center Content */}
          <div className="text-center z-10 max-w-3xl flex flex-col items-center px-4">
            <h2 className="text-4xl md:text-[3.5vw] font-medium text-[#1a1a1a] leading-[1.2] uppercase tracking-wide mb-10">
              BUILDING FOR TOMORROW, <br/> EDUCATING SMARTER.
            </h2>
            <Link to="/portfolio/education" className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#ff761f] transition-colors shadow-lg">
              <span className="font-semibold mr-4 text-xs md:text-sm tracking-widest uppercase">VIEW PROJECTS</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
        </div>

      </div>
    </div>
  );
};

const HospitalSection = () => {
  return (
    <div className="mb-32 md:mb-48 w-full px-6 md:px-16 mt-32">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* Header Area */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Healthcare</span>
            </div>
            <h2 className="text-4xl md:text-[4vw] font-medium text-[#1a1a1a] leading-[1.1] tracking-tight">
              State-of-the-art Infrastructure for <br className="hidden md:block" /> Modern Healthcare.
            </h2>
          </div>
          <div className="pb-4">
            <Link to="/portfolio/hospitals" className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#ff761f] transition-colors shadow-lg">
              <span className="font-semibold mr-4 text-xs md:text-sm tracking-widest uppercase">VIEW PROJECTS</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
          
          {/* Left Column (Tall) */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-sm">
              <img src="/hospital/hospital.png" alt="Hospital Exterior" className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex items-center justify-between text-[#1a1a1a] px-2">
              <span className="text-sm font-medium tracking-wide">— Specialized Facilities</span>
            </div>
          </div>

          {/* Middle Column (Landscape, lower) */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-sm">
              <img src="/hospital/MRC jayadeva 2S _81.JPG" alt="Hospital Construction" className="w-full h-full object-cover object-center" />
            </div>
          </div>

          {/* Right Column (Tall) */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-sm">
              <img src="/hospital/MRC jayadeva drone 2S _23.JPG" alt="Hospital Aerial" className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex items-center justify-between text-[#1a1a1a] px-2">
              <span className="text-sm font-medium tracking-wide">— Advanced Engineering</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

const TempleSection = () => {
  return (
    <div className="w-full px-4 md:px-[5vw] mt-32 mb-24">
      <div className="relative w-full h-[70vh] min-h-[700px] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#fafafa] flex items-center shadow-lg">
        
        {/* Back Layer (temple_bg) */}
        <div className="absolute inset-0 z-0">
          <img src="/temple_bg.png" alt="Temple Background" className="w-full h-full object-cover" />
        </div>

        {/* Middle Layer (Text - Under Foreground) */}
        <div className="absolute inset-0 z-10 w-full max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col justify-start pt-12 md:pt-16">
          {/* Top Left Headline */}
          <div className="w-full md:w-2/3">
            <p className="text-black/80 text-sm md:text-base font-medium mb-4 md:mb-6 uppercase tracking-widest">Spiritual Architecture</p>
            <h2 className="text-5xl md:text-[6vw] font-medium text-white leading-[0.85] tracking-tighter uppercase drop-shadow-md">
              WE BUILD <br/> SPACES OF <br/> DEVOTION
            </h2>
          </div>
        </div>

        {/* Front Layer (temple_fg) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img src="/temple_fg.png" alt="Temple Foreground" className="w-full h-full object-cover object-bottom" />
        </div>

        {/* Top Layer (Text - Above Foreground) */}
        <div className="absolute inset-0 z-30 w-full max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col justify-end pb-8 md:pb-12 pointer-events-none">
          {/* Bottom Right Description & Button */}
          <div className="w-full md:w-1/2 self-end text-right flex flex-col items-end gap-6 pointer-events-auto">
            <p className="text-white text-sm md:text-base font-light leading-relaxed drop-shadow-md max-w-sm">
              M R Constructions specializes in realizing grand temple projects, shaping serene environments for spiritual journeys.
            </p>
            <Link to="/portfolio/temples" className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#ff761f] transition-colors shadow-lg pointer-events-auto">
              <span className="font-semibold mr-4 text-xs md:text-sm tracking-widest uppercase">VIEW PROJECTS</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Portfolio() {
  const images = {
    commercial: "/infosys_hubli.png",
    education: "/Hubli_School.png",
    hospitals: "/hospital.png",
    temples: "/melukote_temple.png"
  };

  return (
    <div className="pt-32 min-h-screen bg-[#fafafa] overflow-hidden">
      {/* Optional Top Header if needed, but since each section has a title, we might just jump straight into the sections. */}
      <div className="w-full px-6 md:px-16 mb-24 mt-0 md:mt-4">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Typographical Header */}
          <div className="border-t-2 border-black/10 pt-4 mb-16 md:mb-24">
            <h1 className="text-[14vw] md:text-[8vw] leading-[1.1] font-extrabold tracking-tighter uppercase pb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#2a2a2a] to-transparent inline-block pb-4">Our</span> <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff761f] to-transparent inline-block pb-4">Portfolio</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left side: Highlight text */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-light text-[#4b4b4b] leading-[1.2] tracking-tight">
                Building trust over <br className="hidden lg:block" /> <span className="font-semibold text-[#ff761f]">17+ years</span> of excellence.
              </h2>
            </div>

            {/* Right side: Paragraphs */}
            <div className="lg:col-span-7 flex flex-col space-y-8 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              <p className="text-2xl md:text-2xl text-gray-800 font-normal leading-snug">
                At M R Constructions, our portfolio is a reflection of the trust placed in us over 17+ years of building for institutions that matter. Each project — from IT campuses to hospitals, schools, and heritage structures — represents more than construction; it represents a commitment to precision, safety, and lasting quality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-6 border-t border-black/10">
                <p>
                  We approach every site with the same discipline, whether we're building a corporate campus for a global technology leader or a school that will shape generations of students. Our work spans commercial, educational, healthcare, and heritage construction, each built to the same uncompromising standard.
                </p>
                <p>
                  What you'll find here is not just a list of completed structures, but a record of partnerships built on reliability — with organizations that trusted us to deliver on time, on budget, and beyond expectation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AsymmetricalSection
        title="Commercial"
        subtitle="Explore our corporate and retail projects"
        link="/portfolio/commercial"
        imgUrl={images.commercial}
        animateFromCenter={true}
      />

      <EducationSection />

      <HospitalSection />

      <TempleSection />
    </div>
  );
}
