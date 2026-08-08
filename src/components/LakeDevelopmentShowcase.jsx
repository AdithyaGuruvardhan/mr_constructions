import React from 'react';
import { Link } from 'react-router-dom';

export default function LakeDevelopmentShowcase() {

  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-white font-sans flex flex-col md:block py-16 md:py-0">
        
      {/* Static Elements Group */}
      <div className="relative md:absolute inset-0 w-full h-full flex flex-col md:items-center justify-center p-6 gap-10 md:gap-0">

          {/* Top Left Vertical Image (Mobile Top) */}
          <div className="relative md:absolute md:top-10 md:left-10 w-full md:w-[25vw] h-[35vh] md:h-[60vh] z-0 order-1 md:order-none">
            <img
              src="/hospital/hospital.webp"
              alt="Infosys Foundation Jayadeva Hospital Left"
              className="w-full h-full object-cover rounded-3xl md:rounded-[1.5rem] shadow-xl md:shadow-2xl"
            />
          </div>

          {/* Center Text Description */}
          <div className="relative z-20 max-w-2xl mx-auto text-center flex flex-col items-center px-2 md:px-4 order-2 md:order-none">
            <h2 className="text-2xl sm:text-2xl md:text-5xl font-bold uppercase tracking-tight text-[#2d2d2d] mb-6 md:mb-6 leading-tight">
              Infosys Foundation Jayadeva Hospital Building, Bangalore
            </h2>
            <div className="w-[2px] h-12 md:h-24 bg-[#2d2d2d]/50 mb-6 md:mb-8"></div>

            <p className="text-base sm:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed mb-6 font-medium">
              We undertook the construction of the Infosys Foundation Jayadeva Hospital Building in Bangalore. The state-of-the-art facility is designed to provide world-class healthcare infrastructure.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed font-medium">
              Our scope of work included the complete civil and structural construction, specialized medical infrastructure integration, MEP services, and finishing works, ensuring the highest standards of safety and quality.
            </p>

            {/* Small View Project Badge */}
            <Link to="/portfolio/h3" className="mt-8 md:mt-12 flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 z-20 group hidden sm:flex block">
              <span className="absolute text-[8px] md:text-[10px] font-semibold uppercase tracking-widest text-[#2d2d2d] text-center z-10 group-hover:text-[#ff761f] transition-colors duration-300">
                View<br />Project
              </span>
              <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
                <path id="circlePathHospital" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
                <text>
                  <textPath href="#circlePathHospital" startOffset="0" className="text-[9.5px] font-medium tracking-[0.18em] fill-[#2d2d2d]/60 uppercase">
                    EXPLORE • DISCOVER • EXPLORE • DISCOVER
                  </textPath>
                </text>
              </svg>
            </Link>
          </div>

          {/* Bottom Right Vertical Image (Mobile Bottom) */}
          <div className="relative md:absolute md:bottom-10 md:right-10 w-full md:w-[20vw] h-[35vh] md:h-[55vh] z-0 order-3 md:order-none">
            <img
              src="/hospital/hospital (1).webp"
              alt="Infosys Foundation Jayadeva Hospital Right"
              className="w-full h-full object-cover rounded-3xl md:rounded-[1.5rem] shadow-xl md:shadow-2xl"
            />
          </div>

        </div>

        {/* Fade to white at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none"></div>

    </div>
  );
}
