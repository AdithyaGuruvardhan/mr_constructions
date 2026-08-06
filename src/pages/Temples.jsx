import React from 'react';
import { Link } from 'react-router-dom';

export default function Temples() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-16 min-h-screen flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-orange-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-yellow-100 opacity-40 blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center w-full relative z-10">
        <Link to="/portfolio" className="inline-flex items-center text-sm font-semibold text-[#ff761f] mb-6 hover:text-orange-700 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Portfolio
        </Link>
        <h1 className="text-5xl md:text-7xl font-bold text-[#4b4b4b] mb-6 tracking-tight">Sacred <span className="text-[#ff761f]">Temples</span></h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Honoring tradition and spirituality through masterful construction. Our temple projects combine ancient architectural principles with modern engineering to create enduring spaces for devotion and community.
        </p>
        <button className="bg-[#ff761f] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e06515] transition-colors shadow-lg shadow-[#ff761f]/30">
          View Projects
        </button>
      </div>
    </div>
  );
}
