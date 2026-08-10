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
              Infosys Foundation Jayadeva Hospital Block, Bengaluru
            </h2>
            <div className="w-[2px] h-12 md:h-24 bg-[#2d2d2d]/50 mb-6 md:mb-8"></div>

            <p className="text-base sm:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed mb-6 font-medium">
              We undertook the construction of the <span className="font-bold">Infosys Foundation Jayadeva Hospital Block</span> in <span className="font-bold">Bengaluru</span>. The state-of-the-art facility is designed to provide <span className="font-bold">world-class healthcare infrastructure</span>.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed font-medium">
              Our scope of work included the <span className="font-bold">complete civil and structural construction</span>, <span className="font-bold">specialized medical infrastructure integration</span>, <span className="font-bold">MEP services</span>, and <span className="font-bold">finishing works</span>, ensuring the highest standards of safety and quality.
            </p>


          </div>

          {/* Bottom Right Vertical Image (Mobile Bottom) */}
          <div className="relative md:absolute md:bottom-20 md:right-10 w-full md:w-[20vw] h-[35vh] md:h-[55vh] z-0 order-3 md:order-none">
            
            {/* View Project Badge - Moved above the right image */}
            <Link to="/portfolio/h3" className="absolute bottom-full mb-4 md:mb-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 z-30 group hidden sm:flex">
              {/* Inner Circle */}
              <div className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 bg-[#2c52a1] group-hover:bg-[#1c1c1e] transition-colors duration-300 rounded-full flex items-center justify-center shadow-lg z-10">
                <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest text-white text-center leading-tight">
                  View<br />Project
                </span>
              </div>
              
              {/* Rotating Text */}
              <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
                <path id="circlePathHospital" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="transparent" />
                <text>
                  <textPath href="#circlePathHospital" startOffset="0" className="text-[8px] font-bold tracking-[0.18em] fill-[#2d2d2d]/80 uppercase">
                    EXPLORE • DISCOVER • EXPLORE • DISCOVER •
                  </textPath>
                </text>
              </svg>
            </Link>

            <img
              src="/hospital/hospital (1).webp"
              alt="Infosys Foundation Jayadeva Hospital Right"
              className="w-full h-full object-cover rounded-3xl md:rounded-[1.5rem] shadow-xl md:shadow-2xl relative z-10"
            />
          </div>

        </div>

        {/* Fade to white at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none"></div>

    </div>
  );
}
