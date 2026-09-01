import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificatesData } from '../data/certificatesData';
import {
  FaAward, FaLightbulb, FaChartLine, FaCogs, FaHandshake
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// Card-Based Performance Report Component
const PerformanceReportCards = ({ performance }) => {
  const criteria = [
    { title: 'Quality of Work', key: 'qualityOfWork', icon: <FaAward className="w-5 h-5" /> },
    { title: 'Resourcefulness', key: 'resourcefulness', icon: <FaLightbulb className="w-5 h-5" /> },
    { title: 'Financial Soundness', key: 'financialSoundness', icon: <FaChartLine className="w-5 h-5" /> },
    { title: 'Technical Proficiency', key: 'technicalProficiency', icon: <FaCogs className="w-5 h-5" /> },
    { title: 'General Behaviour', key: 'generalBehaviour', icon: <FaHandshake className="w-5 h-5" /> },
  ];

  const getRating = (value) => value || 'Outstanding';

  return (
    <div className="w-full mt-4 text-left">
      <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        Performance Report
      </h3>

      {/* Features Grid matching Home Page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {criteria.map((item, index) => {
          const isDark = index % 2 !== 0; // Odd indices are dark blue
          const rating = getRating(performance[item.key]);

          return (
            <div
              key={index}
              className={`relative ${isDark ? 'bg-[#2c52a1] text-white' : 'bg-gray-100 text-[#1c1c1e] shadow-sm'} p-5 sm:p-6 rounded-[1.5rem] hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between min-h-[140px] lg:min-h-[200px]`}
            >
              <div>
                <h3 className="text-base md:text-lg font-bold mb-2 leading-tight break-words" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {item.title}
                </h3>
                <p className={`${isDark ? 'text-blue-100' : 'text-gray-500'} text-xs font-medium`}>
                  Rated <span className="font-bold text-sm block mt-0.5">{rating}</span>
                </p>
              </div>

              {/* Icon at Bottom Right */}
              <div className="flex justify-end mt-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${isDark ? 'bg-white text-[#2c52a1]' : 'bg-[#1c1c1e] text-white'}`}>
                  {item.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Image Arc Gallery Component exactly matching the user screenshot
const ProjectImageArc = ({ certificateId }) => {
  // Dynamic image fetching based on the selected project ID
  const getProjectImages = (id) => {
    switch (id) {
      case 1: // Hospital Block
      case 7: // Kidwai OPD
      case 8: // Maternity Hospital
        return [
          '/hospital/Kidwai Cancer Hospital/MRC kidwai DRONE _2.webp',
          '/hospital/Kidwai Cancer Hospital/MRC KIDWAI 2S _43.webp',
          '/hospital/Kidwai Cancer Hospital/MRC kidwai DRONE _8.webp',
          '/hospital/Kidwai Cancer Hospital/MRC KIDWAI 2S _48.webp',
          '/hospital/Kidwai Cancer Hospital/KIDWA3.jpg'
        ];
      case 2: // Software Development Block
        return [
          '/commercial/infosys/INFOSYS HUBLI11.webp',
          '/commercial/infosys/INFOSYS HUBLI50.webp',
          '/commercial/infosys/INFOSYS HUBLI5.webp',
          '/commercial/infosys/INFOSYS HUBLI49.jpg',
          '/commercial/infosys/INFOSYS HUBLI47.webp'
        ];
      case 3: // STP
        return [
          '/commercial/lake/STP19.webp',
          '/commercial/lake/MYSORE STP drone_3.webp',
          '/commercial/lake/MYSORE STP drone_9.jpg',
          '/commercial/lake/infosys STP drone 1_19.JPG',
          '/commercial/lake/infosys STP drone 1_14.webp'
        ];
      case 4: // IIIT Dharwad
      case 6: // IIIT Trichy
        return [
          '/Education Institution/Indian Institute of Information Technology (IIIT), Dharwad/IIIT10.webp',
          '/Education Institution/Indian Institute of Information Technology (IIIT), Dharwad/IIIT11.webp',
          '/Education Institution/Indian Institute of Information Technology (IIIT), Dharwad/IIIT7.JPG',
          '/Education Institution/Indian Institute of Information Technology (IIIT), Dharwad/IIIT16.webp',
          '/Education Institution/Indian Institute of Information Technology (IIIT), Dharwad/IIIT14.JPG'
        ];
      case 5: // Asha Nivas
        return [
          '/hospital/Tata Memorial Centre Advanced Centr - Mumbai/MRC MUMBAI day 1_9.webp',
          '/hospital/Tata Memorial Centre Advanced Centr - Mumbai/MRC mumbai DRONE day 2_4.webp',
          '/hospital/Tata Memorial Centre Advanced Centr - Mumbai/MRC mumbai DRONE day 2_2.JPG',
          '/hospital/Tata Memorial Centre Advanced Centr - Mumbai/MRC mumbai DRONE day 2_4.JPG',
          '/hospital/Tata Memorial Centre Advanced Centr - Mumbai/MRC MUMBAI day 1_29.webp'
        ];
      case 9: // Hubli School
      case 10: // CBSC School
        return [
          '/Education Institution/Hubli School/HUBLI SCHOOL4.webp',
          '/Education Institution/Hubli School/HUBLI SCHOOL2.webp',
          '/Education Institution/Hubli School/HUBLI SCHOOL3.webp',
          '/Education Institution/Hubli School/infosys school in.jpg',
          '/Education Institution/Hubli School/HUBLI SCHOOL1.webp'
        ];
      default:
        return [
          '/Lake Development_vert.png',
          '/commercial/infosys/INFOSYS HUBLI11.webp',
          '/hubli_school_vert.webp',
          '/hospital.png',
          '/tall building.webp'
        ];
    }
  };

  const images = getProjectImages(certificateId);

  return (
    <div className="w-full relative mt-16 md:mt-32 mb-8 flex flex-col items-center overflow-visible">

      {/* 5 Images Arc Container */}
      <div className="relative flex justify-center items-center gap-6 md:gap-12 w-full max-w-[1400px] min-h-[300px] md:min-h-[500px]">

        {/* Far Left Image (partially visible in screenshot) */}
        <div className="hidden lg:block w-[120px] h-[180px] flex-shrink-0 transform -rotate-[18deg] translate-y-32 translate-x-12 opacity-80 z-10 shadow-lg">
          <img src={images[0]} className="w-full h-full object-cover rounded-md" alt="Gallery Far Left" />
        </div>

        {/* Left Image (Rotated Clockwise) */}
        <div className="w-[140px] sm:w-[180px] md:w-[220px] h-[180px] sm:h-[240px] md:h-[300px] flex-shrink-0 transform -rotate-[9deg] translate-y-8 translate-x-4 z-10 shadow-xl hover:scale-105 transition-transform duration-500">
          <img src={images[1]} className="w-full h-full object-cover rounded-md" alt="Gallery Left" />
        </div>

        {/* Center Image (Straight and slightly taller) */}
        <div className="w-[160px] sm:w-[220px] md:w-[260px] h-[220px] sm:h-[300px] md:h-[360px] flex-shrink-0 z-20 shadow-2xl hover:scale-105 transition-transform duration-500 transform -translate-y-4">
          <img src={images[2]} className="w-full h-full object-cover rounded-md" alt="Gallery Center" />
        </div>

        {/* Right Image (Rotated Counter-Clockwise) */}
        <div className="w-[140px] sm:w-[180px] md:w-[220px] h-[180px] sm:h-[240px] md:h-[300px] flex-shrink-0 transform rotate-[9deg] translate-y-8 -translate-x-4 z-10 shadow-xl hover:scale-105 transition-transform duration-500">
          <img src={images[3]} className="w-full h-full object-cover rounded-md" alt="Gallery Right" />
        </div>

        {/* Far Right Image (partially visible in screenshot) */}
        <div className="hidden lg:block w-[120px] h-[180px] flex-shrink-0 transform rotate-[18deg] translate-y-32 -translate-x-12 opacity-80 z-10 shadow-lg">
          <img src={images[4]} className="w-full h-full object-cover rounded-md" alt="Gallery Far Right" />
        </div>

      </div>
    </div>
  );
};

// "Code signing made easy" Style Card
const CleanCard = ({ certificate }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: cardRef.current, start: 'top 85%' } }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-[#fafafa] w-[85vw] max-w-[85vw] mx-auto rounded-[40px] p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center mb-16 relative overflow-hidden"
    >
      {/* Background Pattern similar to the 0/1 background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none font-mono text-[10px] leading-loose break-all p-4 text-center overflow-hidden">
        {'0 1 1 1 0 1 0 1 1 1 0 1 0 0 1 1 1 0 1 0 1 1 0 0 1 '.repeat(200)}
      </div>

      {/* Illustration Area */}
      <div className="relative w-64 h-40 mb-12 flex justify-center items-center z-10">
        {/* Main Document Body */}
        <div className="w-48 h-32 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-center relative">
          <div className="flex gap-1 absolute top-3 left-3">
            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          </div>
          {/* Signature Line */}
          <div className="mt-4 border-b-2 border-gray-300 w-24 h-8 relative">
            <svg className="absolute bottom-0 left-2 w-16 h-8 text-gray-800" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M10 40 Q 20 10 30 30 T 50 30 T 70 20 T 90 40" />
            </svg>
            <span className="absolute bottom-1 -left-4 text-gray-400 text-sm font-bold">x</span>
          </div>
        </div>

        {/* Seal Ribbon */}
        <div className="absolute -bottom-6 left-10 z-20 transform -rotate-12">
          <div className="w-16 h-16 bg-yellow-500 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-lg relative">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {/* Ribbons */}
            <div className="absolute top-12 left-1 w-4 h-8 bg-yellow-600 -z-10 transform skew-y-12 shadow-sm rounded-b-md"></div>
            <div className="absolute top-12 right-1 w-4 h-8 bg-yellow-600 -z-10 transform -skew-y-12 shadow-sm rounded-b-md"></div>
          </div>
        </div>

        {/* Pen */}
        <div className="absolute top-0 right-4 z-20 transform rotate-[35deg] drop-shadow-xl">
          <div className="w-6 h-32 bg-gray-100 rounded-full border border-gray-200 flex flex-col items-center justify-start overflow-hidden relative">
            <div className="w-full h-4 bg-gray-300"></div>
            <div className="w-full h-8 bg-blue-600 mt-2 flex items-center justify-center">
              <span className="text-[8px] text-white font-bold transform -rotate-90">MRC</span>
            </div>
            <div className="w-2 h-4 bg-gray-400 mt-auto mb-1 rounded-b-full"></div>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h2 className="text-[28px] font-bold text-gray-900 mb-6 z-10" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {certificate.projectName}
      </h2>
      <div className="z-10 mb-12 max-w-2xl mx-auto">
        <p className="text-[17px] text-gray-600 leading-relaxed mb-4">
          {certificate.description}
        </p>
        <p className="text-[17px] text-gray-600 leading-relaxed">
          Our highly guided execution ensures that {certificate.specifications.typeOfWork?.toLowerCase() || 'these'} projects of this scale—over {certificate.specifications.totalBuiltUpArea}—are delivered with peace of mind.
        </p>
      </div>

      {/* The Official Performance Report goes inside or below this card */}
      <div className="w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] z-10">
        <PerformanceReportCards performance={certificate.performance} />
      </div>

      {/* The Arc Image Gallery */}
      <div className="w-full z-10 mt-8">
        <ProjectImageArc certificateId={certificate.id} />
      </div>

    </div>
  );
};

// Summary Card for the Grid View
const CertificateSummaryCard = ({ certificate, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group bg-white border border-gray-100 rounded-[1.5rem] p-5 sm:p-8 hover:shadow-2xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between h-full text-left"
    >
      <div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-blue-600/20">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-[15px] sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-snug" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {certificate.projectName}
        </h3>
        <p className="text-gray-500 text-[11px] sm:text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
          {certificate.description}
        </p>
      </div>

      <div className="flex items-center text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors pt-4 border-t border-gray-100">
        View details
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
};

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Scroll to top when selecting a certificate
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCert]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto flex flex-col items-center">

        {selectedCert ? (
          <div className="w-[85vw] max-w-[85vw]">
            <button
              onClick={() => setSelectedCert(null)}
              className="mb-8 inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group bg-gray-50 px-4 py-2 rounded-full"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all projects
            </button>
            <CleanCard certificate={selectedCert} />
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Completed Projects</h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Explore our portfolio of successful projects and their official performance certificates. Select a project to view its details.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {certificatesData.map((cert) => (
                <CertificateSummaryCard
                  key={cert.id}
                  certificate={cert}
                  onClick={() => setSelectedCert(cert)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
