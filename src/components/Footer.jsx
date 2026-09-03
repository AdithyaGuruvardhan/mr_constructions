import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#2c2d3c] text-white pt-24 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-16 lg:mb-24">

          {/* Left Side */}
          <div className="lg:w-1/2 flex flex-col justify-between mb-16 lg:mb-0">
            <div className="mb-20">
              <img src="/mrc_logo.png" alt="M R Constructions Logo" className="w-64 h-24 md:w-80 md:h-32 lg:w-96 lg:h-40 object-cover object-center brightness-0 invert" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
              <div>
                <h4 className="text-gray-500 mb-4 font-medium">Head Office</h4>
                <p className="font-semibold text-gray-200 leading-relaxed text-sm">
                  No.16/1, 1st Main, 2nd Floor,<br />
                  VR Layout, Basavanagudi,<br />
                  Bengaluru-560004 Karnataka
                </p>
              </div>
              <div>
                <h4 className="text-gray-500 mb-4 font-medium">Email Us</h4>
                <a href="mailto:mrcons.office@gmail.com" className="font-semibold text-gray-200 hover:text-white transition-colors text-sm">
                  mrcons.office@gmail.com
                </a>
              </div>
              <div>
                <h4 className="text-gray-500 mb-4 font-medium">Call Us</h4>
                <a href="tel:+919148581550" className="font-semibold text-gray-200 hover:text-white transition-colors text-sm whitespace-nowrap">
                  +91 9148581550 / 9148581560
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-5/12 flex justify-center lg:justify-end items-start mt-8 lg:mt-0">
            <div className="grid grid-cols-[auto_auto] gap-x-16 md:gap-x-24 lg:gap-x-32 gap-y-5 lg:gap-y-6 items-baseline text-left">
              <Link to="/" className="text-2xl lg:text-3xl font-medium tracking-tight hover:text-gray-300 transition-colors">Home</Link>
              <Link to="/safety" className="text-sm font-medium hover:text-gray-300 transition-colors">Safety</Link>

              <Link to="/about" className="text-2xl lg:text-3xl font-medium tracking-tight hover:text-gray-300 transition-colors">About Us</Link>
              <Link to="/careers" className="text-sm font-medium hover:text-gray-300 transition-colors">Careers</Link>

              <Link to="/portfolio" className="text-2xl lg:text-3xl font-medium tracking-tight hover:text-gray-300 transition-colors">Portfolio</Link>
              <Link to="/awards" className="text-sm font-medium hover:text-gray-300 transition-colors">Awards</Link>

              <Link to="/contact" className="text-2xl lg:text-3xl font-medium tracking-tight hover:text-gray-300 transition-colors">Contact</Link>
              <Link to="/certificates" className="text-sm font-medium hover:text-gray-300 transition-colors">Certificates</Link>
            </div>
          </div>

        </div>



        {/* Bottom Links */}
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-2 text-[10px] sm:text-[11px] text-gray-500 font-medium items-center justify-center lg:justify-between w-full text-center mt-6 lg:mt-0">
          <div className="flex-shrink-0">
            <Link to="/" className="hover:text-gray-300 transition-colors">MR Constructions</Link>
          </div>

          <div className="flex-shrink-0">
            <span className="italic">Designed and developed by <a href="https://www.buzziwah.com/" target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white transition-colors underline decoration-white/30 hover:decoration-white/80 underline-offset-2 font-semibold">Buzziwah</a> 💜</span>
          </div>

          <div className="flex-shrink-0">
            <span>Copyright &copy; {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
