import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactUs() {
  return (
    <div className="relative w-full min-h-screen bg-white text-[#2d2d2d] pt-42 md:pt-[18rem] pb-20 font-sans overflow-hidden">

      {/* Massive Background Watermark */}
      <div className="absolute top-28 md:top-32 left-1/2 transform -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[12vw] md:text-[8vw] leading-none font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-50 opacity-80 whitespace-nowrap">
          GET IN TOUCH
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8 flex flex-col items-center">
          <div className="w-[2px] h-12 md:h-20 bg-[#ff761f] mb-8"></div>
          <p className="text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl mx-auto">
            Ready to bring your vision to life? Contact M R Constructions today. Our team is ready to assist you with your next landmark project.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">

          {/* Contact Information (Dark Card matching screenshot) */}
          <div className="bg-[#1c1c1e] rounded-[2rem] p-8 md:p-16 flex flex-col lg:flex-row justify-between shadow-2xl relative overflow-hidden gap-12 lg:gap-16 min-h-[500px]">
            {/* Decorative bottom text */}
            <div className="absolute -bottom-6 left-0 w-full flex gap-4 text-[#2a2a2c] font-bold text-5xl md:text-7xl lg:text-8xl uppercase whitespace-nowrap select-none pointer-events-none">
              <span>GET IN TOUCH</span>
            </div>

            <div className="relative z-10 flex flex-col lg:w-5/12 justify-start lg:pt-4">
              <h2 className="text-white text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.2] tracking-tight">
                Building Excellence <br /> For Your Next <br /> Landmark Project
              </h2>
              <Link to="/portfolio" className="mt-6 md:mt-8 flex items-center text-white/60 hover:text-white text-xs md:text-sm font-medium gap-2 transition-colors cursor-pointer w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                Explore More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 md:gap-6 lg:w-7/12 justify-center w-full">
              {/* Pill 1: Location */}
              <div className="bg-white rounded-[2rem] p-2 pr-4 md:p-2.5 md:pr-8 flex items-center justify-between hover:bg-gray-50 transition-colors w-full group cursor-pointer shadow-sm">
                <div className="flex items-center gap-3 md:gap-4 w-full">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-700 self-start mt-0.5 md:mt-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="flex flex-col py-1 md:py-2">
                    <span className="text-[#1a1a1a] font-medium text-sm md:text-base">M R Constructions</span>
                    <span className="text-gray-500 text-[11px] md:text-sm leading-snug mt-1 md:mt-0.5">No.16/1, 1st Main, 2nd Floor, VR Layout, Basavanagudi, Bangalore-560004 Karnataka</span>
                  </div>
                </div>
                <div className="text-gray-400 ml-2 md:ml-4 flex-shrink-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform self-start mt-2 md:mt-4">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path></svg>
                </div>
              </div>

              {/* Pill 2: Email */}
              <div className="bg-white rounded-[2rem] md:rounded-full p-2 pr-4 md:p-2.5 md:pr-8 flex items-center justify-between hover:bg-gray-50 transition-colors w-full group cursor-pointer shadow-sm">
                <div className="flex items-center gap-3 md:gap-4 w-full">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-700">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="flex flex-col py-1 md:py-0">
                    <span className="text-[#1a1a1a] font-medium text-sm md:text-base flex items-center gap-2">Email Address</span>
                    <span className="text-gray-500 text-[11px] md:text-sm mt-0.5">mrcons.office@gmail.com</span>
                  </div>
                </div>
                <div className="text-gray-400 ml-2 md:ml-4 flex-shrink-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path></svg>
                </div>
              </div>

              {/* Pill 3: Phone */}
              <div className="bg-white rounded-[2rem] md:rounded-full p-2 pr-4 md:p-2.5 md:pr-8 flex items-center justify-between hover:bg-gray-50 transition-colors w-full group cursor-pointer shadow-sm">
                <div className="flex items-center gap-3 md:gap-4 w-full">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-700">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div className="flex flex-col py-1 md:py-0">
                    <span className="text-[#1a1a1a] font-medium text-sm md:text-base flex items-center gap-2">Phone Number</span>
                    <span className="text-gray-500 text-[11px] md:text-sm mt-0.5">+91 9148581550 / 9148581560</span>
                  </div>
                </div>
                <div className="text-gray-400 ml-2 md:ml-4 flex-shrink-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-200 p-8 md:p-16 rounded-[2rem] border border-gray-200 flex flex-col lg:flex-row justify-between w-full gap-12 lg:gap-16 relative overflow-hidden">
            
            {/* Decorative bottom text */}
            <div className="absolute -bottom-6 left-0 w-full flex gap-4 text-gray-300/70 font-bold text-5xl md:text-7xl lg:text-8xl uppercase whitespace-nowrap select-none pointer-events-none">
              <span>GET IN TOUCH</span>
            </div>

            {/* Left Side: Text */}
            <div className="relative z-10 lg:w-5/12 flex flex-col justify-start -mt-2 lg:-mt-8">
              <h2 className="text-3xl md:text-4xl lg:text-8xl font-normal text-[#2d2d2d] mb-4 md:mb-6 leading-[0.9] tracking-tight">
                Send us a <span className="font-light italic">Message</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg">
                Fill out the form below and our team will get back to you as soon as possible to discuss your project.
              </p>
            </div>

            {/* Right Side: Form */}
            <div className="relative z-10 lg:w-7/12 w-full">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 pl-4">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="bg-white border border-gray-300 rounded-[2rem] px-6 py-4 text-[#2d2d2d] focus:outline-none focus:border-[#ff761f] focus:ring-1 focus:ring-[#ff761f] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 pl-4">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-white border border-gray-300 rounded-[2rem] px-6 py-4 text-[#2d2d2d] focus:outline-none focus:border-[#ff761f] focus:ring-1 focus:ring-[#ff761f] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 pl-4">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    className="bg-white border border-gray-300 rounded-[2rem] px-6 py-4 text-[#2d2d2d] focus:outline-none focus:border-[#ff761f] focus:ring-1 focus:ring-[#ff761f] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 pl-4">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Write your message here..."
                    className="bg-white border border-gray-300 rounded-[2rem] px-6 py-5 text-[#2d2d2d] focus:outline-none focus:border-[#ff761f] focus:ring-1 focus:ring-[#ff761f] transition-all resize-none"
                  ></textarea>
                </div>
                <button className="bg-[#ff761f] text-white font-bold text-lg py-4 rounded-[2rem] mt-4 hover:bg-[#e66a1c] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
