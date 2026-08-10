import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectData } from '../data/projectsData';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AsymmetricalSection = ({ title, subtitle, link, imgUrl, animateFromCenter }) => {
  const containerRef = useRef(null);
  const portfolioCategories = getProjectData();

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
          <Link to={link} className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#2c52a1] transition-colors shadow-lg">
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
          <Link to={link} className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#2c52a1] transition-colors shadow-lg mt-2">
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
            <img src="/hubli_school_vert.webp" alt="Education" className="w-full h-full object-cover object-center" />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col items-start justify-center pt-8 md:pt-0">
            <h2 className="text-4xl md:text-[3.5vw] font-medium text-[#1a1a1a] leading-[1.1] uppercase tracking-wide mb-8">
              SHAPING FUTURE <br /> GENERATIONS
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
            <img src="/Hubli_School.webp" alt="Detail 1" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block absolute left-[12%] top-[60%] w-28 h-28 rounded-[1rem] overflow-hidden shadow-sm">
            <img src="/Hubli_School_leaves.webp" alt="Detail 2" className="w-full h-full object-cover" />
          </div>

          {/* Scattered Right Image */}
          <div className="hidden md:block absolute right-0 top-[20%] w-56 h-56 rounded-[1.5rem] overflow-hidden shadow-sm">
            <img src="/MRC shivanahalli DRONE _18.webp" alt="Detail 3" className="w-full h-full object-cover" />
          </div>

          {/* Center Content */}
          <div className="text-center z-10 max-w-3xl flex flex-col items-center px-4">
            <h2 className="text-4xl md:text-[3.5vw] font-medium text-[#1a1a1a] leading-[1.2] uppercase tracking-wide mb-10">
              BUILDING FOR TOMORROW, <br /> EDUCATING SMARTER.
            </h2>
            <Link to="/portfolio/education" className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#2c52a1] transition-colors shadow-lg">
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
            <Link to="/portfolio/hospitals" className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#2c52a1] transition-colors shadow-lg">
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
              <img src="/hospital/hospital.webp" alt="Hospital Exterior" className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex items-center justify-between text-[#1a1a1a] px-2">
              <span className="text-sm font-medium tracking-wide">— Specialized Facilities</span>
            </div>
          </div>

          {/* Middle Column (Landscape, lower) */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-sm">
              <img src="/hospital/MRC jayadeva 2S _81.webp" alt="Hospital Construction" className="w-full h-full object-cover object-center" />
            </div>
          </div>

          {/* Right Column (Tall) */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-sm">
              <img src="/hospital/MRC jayadeva drone 2S _23.webp" alt="Hospital Aerial" className="w-full h-full object-cover object-center" />
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
          <img src="/temple_bg.webp" alt="Temple Background" className="w-full h-full object-cover" />
        </div>

        {/* Middle Layer (Text - Under Foreground) */}
        <div className="absolute inset-0 z-10 w-full max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col justify-start pt-12 md:pt-16">
          {/* Top Left Headline */}
          <div className="w-full md:w-2/3">
            <p className="text-black/80 text-sm md:text-base font-medium mb-4 md:mb-6 uppercase tracking-widest">Spiritual Architecture</p>
            <h2 className="text-5xl md:text-[6vw] font-medium text-white leading-[0.85] tracking-tighter uppercase drop-shadow-md">
              WE BUILD <br /> SPACES OF <br /> DEVOTION
            </h2>
          </div>
        </div>

        {/* Front Layer (temple_fg) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img src="/temple_fg.webp" alt="Temple Foreground" className="w-full h-full object-cover object-bottom" />
        </div>

        {/* Top Layer (Text - Above Foreground) */}
        <div className="absolute inset-0 z-30 w-full max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col justify-end pb-8 md:pb-12 pointer-events-none">
          {/* Bottom Right Description & Button */}
          <div className="w-full md:w-1/2 self-end text-right flex flex-col items-end gap-6 pointer-events-auto">
            <p className="text-white text-sm md:text-base font-light leading-relaxed drop-shadow-md max-w-sm">
              M R Constructions specializes in realizing grand temple projects, shaping serene environments for spiritual journeys.
            </p>
            <Link to="/portfolio/temples" className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 rounded-full group hover:bg-[#2c52a1] transition-colors shadow-lg pointer-events-auto">
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

const portfolioCategories = [
  {
    category: "Commercial",
    projects: [
      { id: "c1", title: "Infosys New Campus", subtitle: "Hubli", img: "/commercial/infosys/INFOSYS HUBLI29.webp" },
      { id: "c2", title: "Lake development and construction", subtitle: "Hebbal Mysore", img: "/commercial/lake/infosys STP drone 1_10.webp" },
      { id: "c3", title: "Sira Solar Plant", subtitle: "Sira", img: "/sira_solar.webp" },
      { id: "c4", title: "Paying Guest Buildings", subtitle: "Electronic city", img: "/commercial/pg/PG13.webp" },
    ]
  },
  {
    category: "Education Institution",
    projects: [
      { id: "e1", title: "CBSE ENGLISH MEDIUM HIGH SCHOOL", subtitle: "Shivanahalli", img: "/Education%20Institution/CBSE%20ENGLISH%20MEDIUM%20HIGH%20SCHOOL-%20Shivanahalli/MRC shivanahalli DRONE _21.webp" },
      { id: "e2", title: "Hubli School", subtitle: "Hubli", img: "/Education%20Institution/Hubli%20School/HUBLI SCHOOL1.webp" },
      { id: "e3", title: "Indian Institute of Information Technology", subtitle: "Dharwad", img: "/Education%20Institution/Indian%20Institute%20of%20Information%20Technology%20(IIIT),%20Dharwad/IIIT7.webp" },
    ]
  },
  {
    category: "Hospitals",
    projects: [
      { id: "h1", title: "Bowring Hospital", subtitle: "Bangalore", img: "/hospital/Bowring%20Hospital-%20Bangalore/Bowring%20hospital1.webp" },
      { id: "h3", title: "Jayadeva Hospital Building", subtitle: "Bangalore", img: "/hospital.webp" },
      { id: "h4", title: "Kidwai Cancer Hospital", subtitle: "Bangalore", img: "/hospital/Kidwai%20Cancer%20Hospital/MRC%20kidwai%20DRONE%20_11.webp" },
      { id: "h5", title: "Tata Memorial Centre Advanced Centre", subtitle: "Mumbai", img: "/hospital/Tata%20Memorial%20Centre%20Advanced%20Centr%20-%20Mumbai/MRC mumbai DRONE_6.webp" },
    ]
  },
  {
    category: "Temple",
    projects: [
      { id: "t1", title: "Development Of Kalayani", subtitle: "Vasanthpura, Bangalore", img: "/temple/DEVELOPMENT%20OF%20KALAYANI%20VASANTHPURA,BANGALORE/VASANTHPURA KALYANI12.webp" },
      { id: "t2", title: "Melukote Kalayani", subtitle: "Melukote", img: "/temple/Melukote%20Kalayani/MELKOTE KALYANI5.webp" },
    ]
  }
];

const ProjectCard = ({ project }) => {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[350px] aspect-[3/4] bg-gray-200 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      {/* Top Text */}
      <div className="z-10 flex flex-col gap-2 pointer-events-none select-none">
        <h3 className="font-bold text-xl md:text-2xl text-[#1c1c1e] leading-tight">{project.title}</h3>
        {project.subtitle && (
          <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">{project.subtitle}</p>
        )}
      </div>

      {/* Center Image (takes most of the card) */}
      <div className="absolute top-[140px] left-5 right-5 bottom-24 rounded-2xl overflow-hidden shadow-lg pointer-events-none select-none">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          draggable="false"
        />
      </div>

      {/* Bottom Button (Matching Affordable Price Card) */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1c1c1e] cursor-pointer bg-[#2c52a1] text-white shadow-xl z-10">
        <svg className="w-5 h-5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </div>
    </div>
  );
};

const DraggableCategoryRow = ({ category, projects }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const sectionId = category.toLowerCase().replace(/\s+/g, '-');

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Center items based on how many fit safely on the screen to prevent cutoff bugs
  let justifyClass = "justify-start";
  if (projects.length <= 2) {
    justifyClass = "md:justify-center";
  } else if (projects.length === 3) {
    justifyClass = "xl:justify-center justify-start";
  } else if (projects.length === 4) {
    justifyClass = "2xl:justify-center justify-start";
  }

  return (
    <div id={sectionId} className="w-full mb-16 md:mb-24 overflow-hidden max-w-[1600px] mx-auto scroll-mt-32">
      <div className="flex items-center justify-center mb-8 px-6 md:px-16 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] tracking-tight uppercase drop-shadow-sm">{category}</h2>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className={`flex gap-6 overflow-x-auto hide-scrollbar pb-8 pt-4 px-6 md:px-16 ${justifyClass} ${isDragging ? 'cursor-grabbing select-none snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {projects.map(p => (
          <Link
            to={`/portfolio/${p.id}`}
            key={p.id}
            className="snap-center block"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          >
            <ProjectCard project={p} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Portfolio() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="pt-32 min-h-screen bg-[#fafafa] overflow-hidden">
      {/* Optional Top Header if needed, but since each section has a title, we might just jump straight into the sections. */}
      <div className="w-full px-6 md:px-16 mb-24 mt-0 md:mt-4">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Typographical Header */}
          <div className="border-t-2 border-black/10 pt-4 mb-0 md:mb-12">
            <h1 className="text-[13vw] md:text-[8vw] leading-[1.1] font-extrabold tracking-tighter uppercase pb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#2a2a2a] to-transparent inline-block pb-4">Our</span> <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#2c52a1] to-transparent inline-block pb-4">Portfolio</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left side: Highlight text */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-light text-[#4b4b4b] leading-[1.2] tracking-tight">
                Building trust over <br className="hidden lg:block" /> <span className="font-semibold text-[#2c52a1]">25+ years</span> of excellence.
              </h2>
            </div>

            {/* Right side: Paragraphs */}
            <div className="lg:col-span-7 flex flex-col space-y-8 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              <p className="text-2xl md:text-2xl text-gray-800 font-normal leading-snug">
                At M R Constructions, our portfolio is a reflection of the trust placed in us over 25+ years of building for institutions that matter. Each project — from IT campuses to hospitals, schools, and heritage structures — represents more than construction; it represents a commitment to precision, safety, and lasting quality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-6 border-t border-black/10">
                <p>
                  We approach every project with the same discipline — whether it's a corporate campus for a global tech leader or a school shaping generations of students. Our work spans commercial, educational, healthcare, and heritage construction, all held to the same uncompromising standard.
                </p>
                <p>
                  What you'll find here is not just a list of completed structures, but a record of partnerships built on reliability — with organizations that trusted us to deliver on time, on budget, and beyond expectation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Category Rows */}
      <div className="-mt-10 md:mt-0 pb-32">
        {portfolioCategories.map((cat, idx) => (
          <DraggableCategoryRow key={idx} category={cat.category} projects={cat.projects} />
        ))}
      </div>

    </div>
  );
}
