import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Dr. C.N. Manjunath",
    role: "Director, Sri Jayadeva Institute",
    text: "M R Constructions demonstrated exceptional commitment to quality and timelines in delivering the new hospital block. Their attention to specialized medical infrastructure requirements was outstanding."
  },
  {
    name: "Rahul Sharma",
    role: "CEO, TechPark Solutions",
    text: "The commercial complex built by M R Constructions stands as a landmark in the city. Their architectural precision and flawless execution made the entire process seamless from start to finish."
  },
  {
    name: "Priya Desai",
    role: "Principal, Vidya Mandir",
    text: "Our new school campus is not just a building; it's an inspiring environment for our students. The team's dedication to creating functional and beautiful educational spaces is highly commendable."
  },
  {
    name: "Anil Kumar",
    role: "Chairman, Lake View Society",
    text: "The lake development project was executed beautifully. Their attention to ecological balance and community spaces has revitalized our entire neighborhood."
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useGSAP(() => {
    gsap.from(scrollRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const scrollLeftBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#fcfcfc] pt-18 pb-8 md:pt-[16rem] md:pb-18 overflow-hidden font-sans">
      
      {/* Massive Background Watermark */}
      <div className="absolute top-6 md:top-12 left-1/2 transform -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[12vw] leading-none font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#2052a1]/40 to-transparent opacity-80 whitespace-nowrap">
          TESTIMONIALS
        </h1>
      </div>

      <div className="w-[90vw] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-12 flex flex-col items-center">
          <div className="w-[2px] h-12 md:h-20 bg-[#2c52a1] mb-8"></div>
          <p className="text-lg text-[#6b6b6b] leading-relaxed max-w-2xl mx-auto">
            Hear from our esteemed clients about their experiences partnering with M R Constructions for their landmark projects.
          </p>
        </div>

        {/* Draggable/Scrollable Container */}
        <div className="bg-[#2c2d3c]/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 w-full overflow-hidden shadow-sm">
          
          <div 
            ref={scrollRef}
            className={`flex gap-6 md:gap-8 overflow-x-auto pb-4 ${isDown ? 'cursor-grabbing' : 'cursor-grab'} select-none scrollbar-hide`}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', scrollBehavior: isDown ? 'auto' : 'smooth' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="w-[300px] md:w-[450px] flex-shrink-0 bg-white p-8 md:p-10 rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500 flex flex-col justify-between"
              >
                <div>
                  <svg className="w-10 h-10 text-[#2c52a1] mb-6 opacity-80 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[#4a4a4a] text-base md:text-lg leading-relaxed mb-8 font-medium whitespace-normal pointer-events-none">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 pointer-events-none">
                  <h4 className="text-[#2d2d2d] font-bold text-lg">{t.name}</h4>
                  <p className="text-[#2c52a1] text-sm font-semibold tracking-wide uppercase mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}} />

        </div>

        {/* Scroll Buttons */}
        <div className="w-full flex justify-end mt-8 gap-4">
          <button 
            onClick={scrollLeftBtn}
            className="w-14 h-14 rounded-full bg-[#1e2025] hover:bg-[#2c52a1] transition-colors duration-300 text-white flex items-center justify-center shadow-lg group cursor-pointer"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:-translate-x-1">arrow_left</span>
          </button>
          
          <button 
            onClick={scrollRight}
            className="w-14 h-14 rounded-full bg-[#1e2025] hover:bg-[#2c52a1] transition-colors duration-300 text-white flex items-center justify-center shadow-lg group cursor-pointer"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:translate-x-1">arrow_right</span>
          </button>
        </div>

      </div>
    </section>
  );
}
