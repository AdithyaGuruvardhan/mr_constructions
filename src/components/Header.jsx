import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-16 md:py-12 pointer-events-none">
      <div className="w-full max-w-7xl mx-auto pointer-events-auto relative">
        <div className="bg-[#878787]/90 backdrop-blur-md text-white py-3 px-4 md:px-8 rounded-xl w-full flex items-center justify-between shadow-lg">
          
          {/* Left - Hamburger */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="p-2 hover:bg-white/20 rounded-lg transition-colors flex flex-col gap-1.5 cursor-pointer z-10"
            aria-label="Menu"
          >
            <div className={`w-5 md:w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-5 md:w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 md:w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity pointer-events-auto">
            <img src="/mrc_full_length_logo.png" alt="MR Construction Logo" className="w-32 h-8 md:w-48 md:h-12 lg:w-56 lg:h-14 object-cover object-center brightness-0 invert" />
          </Link>

          {/* Right - Enquire Button */}
          <Link to="/contact" className="bg-white text-[#4b4b4b] px-3 md:px-6 py-1.5 md:py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-xs md:text-base cursor-pointer z-10">
            Enquire <span className="hidden sm:inline">Now</span>
          </Link>
        </div>

        {/* Dropdown Menu */}
        <div className={`absolute top-full left-0 mt-3 bg-white text-black rounded-xl shadow-xl w-full overflow-hidden py-4 z-50 transition-all origin-top ${menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'}`}>
          <Link to="/" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-3 hover:bg-gray-50 transition-colors font-medium text-[#4b4b4b] cursor-pointer text-lg">Home</Link>
          
          <Link to="/portfolio" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 pt-3 pb-2 hover:bg-gray-50 transition-colors font-bold text-[#2c52a1] cursor-pointer text-lg">Portfolio</Link>
          <div className="flex flex-col items-center pb-3">
            <Link to="/portfolio#commercial" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-1.5 hover:text-[#2c52a1] transition-colors font-medium text-gray-500 cursor-pointer text-sm">Commercial</Link>
            <Link to="/portfolio#education-institution" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-1.5 hover:text-[#2c52a1] transition-colors font-medium text-gray-500 cursor-pointer text-sm">Education</Link>
            <Link to="/portfolio#hospitals" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-1.5 hover:text-[#2c52a1] transition-colors font-medium text-gray-500 cursor-pointer text-sm">Hospitals</Link>
            <Link to="/portfolio#archaeological-developments" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-1.5 hover:text-[#2c52a1] transition-colors font-medium text-gray-500 cursor-pointer text-sm">Archaeological</Link>
            <Link to="/portfolio#metro-and-roads" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-1.5 hover:text-[#2c52a1] transition-colors font-medium text-gray-500 cursor-pointer text-sm">Metro & Roads</Link>
          </div>

          <Link to="/about" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-3 hover:bg-gray-50 transition-colors font-medium text-[#4b4b4b] cursor-pointer text-lg border-t border-gray-100">About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block w-full text-center px-6 py-3 hover:bg-gray-50 transition-colors font-bold text-[#4b4b4b] cursor-pointer text-lg">Contact Us</Link>
        </div>
      </div>
    </header>
  );
}
