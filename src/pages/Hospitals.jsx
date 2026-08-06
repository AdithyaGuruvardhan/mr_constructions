import React from 'react';
import { Link } from 'react-router-dom';

export default function Hospitals() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-16 min-h-screen flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-red-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-rose-100 opacity-40 blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center w-full relative z-10">
        <Link to="/portfolio" className="inline-flex items-center text-sm font-semibold text-red-600 mb-6 hover:text-red-800 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Portfolio
        </Link>
        <h1 className="text-5xl md:text-7xl font-bold text-[#4b4b4b] mb-6 tracking-tight">Healthcare <span className="text-red-600">Facilities</span></h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Constructing state-of-the-art hospitals and healthcare centers with precision and care. We build facilities that support advanced medical technologies and prioritize patient comfort and safety.
        </p>
        <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">
          View Projects
        </button>
      </div>
    </div>
  );
}
