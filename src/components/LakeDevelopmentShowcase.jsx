import React from 'react';
import { Link } from 'react-router-dom';
import { T, Img, useField, LinkEdit } from '../content/editable';

export default function LakeDevelopmentShowcase() {
  const [link, setLink] = useField('home.showcase2.link', '/portfolio/h3');

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white font-sans flex flex-col md:block py-16 md:py-0">

      {/* Static Elements Group */}
      <div className="relative w-full md:min-h-screen flex flex-col md:items-center justify-center p-6 gap-10 md:gap-0 pt-10 md:pt-16 pb-40 md:pb-56">

          {/* Top Left Vertical Image (Mobile Top) */}
          <div className="relative md:absolute md:top-0 md:left-10 w-full md:w-[25vw] h-[35vh] md:h-[60vh] z-0 order-1 md:order-none">
            <Img
              k="home.showcase2.image1"
              src="/hospital/hospital.webp"
              alt="Infosys Foundation Jayadeva Hospital Left"
              className="w-full h-full object-cover rounded-3xl md:rounded-[1.5rem] shadow-xl md:shadow-2xl"
            />
          </div>

          {/* Center Text Description */}
          <div className="relative z-20 max-w-2xl mx-auto text-center flex flex-col items-center px-2 md:px-4 order-2 md:order-none">
            <h2 className="text-2xl sm:text-2xl md:text-5xl font-bold uppercase tracking-tight text-[#2d2d2d] mb-6 md:mb-6 leading-tight">
              <T k="home.showcase2.title">Infosys Foundation Jayadeva Hospital Block, Bengaluru</T>
            </h2>
            <div className="w-[2px] h-8 md:h-12 bg-[#2d2d2d]/50 mb-6 md:mb-8"></div>

            <p className="text-base sm:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed mb-6 font-medium">
              <T k="home.showcase2.text1">We undertook the construction of the **Infosys Foundation Jayadeva Hospital Block** in **Bengaluru**. The state-of-the-art facility is designed to provide **world-class healthcare infrastructure**.</T>
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-[#2d2d2d] leading-relaxed font-medium">
              <T k="home.showcase2.text2">Our scope of work included the **complete civil and structural construction**, **specialized medical infrastructure integration**, **MEP services**, and **finishing works**, ensuring the highest standards of safety and quality.</T>
            </p>

            {/* View Project Pill Button */}
            <Link
              to={link}
              className="relative mt-6 md:mt-8 mb-4 md:mb-0 inline-flex items-center gap-3 sm:gap-4 pl-6 sm:pl-8 pr-2 py-2 w-fit rounded-full bg-[#2c52a1] hover:bg-[#1c1c1e] transition-colors duration-300 cursor-pointer z-40 group shadow-lg"
            >
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap">
                <T k="home.showcase2.button">View Project</T>
              </span>
              <LinkEdit value={link} onChange={setLink} />
              <span className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#2c52a1] shrink-0 transition-colors duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Bottom Right Vertical Image (Mobile Bottom) */}
          <div className="relative md:absolute md:bottom-40 md:right-10 w-full md:w-[20vw] h-[35vh] md:h-[55vh] z-0 order-3 md:order-none">

            <Img
              k="home.showcase2.image2"
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
