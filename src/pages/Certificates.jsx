import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificatesData } from '../data/certificatesData';
import { projectsData } from '../data/projectsData';
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

// Full-screen Image Viewer Modal with zoom + navigation
const ImageViewerModal = ({ images, activeIndex, onClose, onNext, onPrev }) => {
  const [zoom, setZoom] = useState(1);

  // Reset zoom whenever the viewed image changes
  useEffect(() => {
    setZoom(1);
  }, [activeIndex]);

  // Keyboard support: Escape to close, arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.5, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
        aria-label="Close"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Zoom Controls */}
      <div
        className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={zoomOut}
          disabled={zoom <= 1}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={zoomIn}
          disabled={zoom >= 4}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Prev Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
        aria-label="Next image"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center overflow-auto p-4 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[activeIndex]}
          alt={`Certificate view ${activeIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-300 select-none"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
};

// Image Arc Gallery Component exactly matching the user screenshot
const ProjectImageArc = ({ certificateId }) => {
  // Pull one image from EVERY project to create a massive, identical gallery for all certificates
  const baseImages = Object.values(projectsData)
    .map(project => project.galleryImages?.[0] || project.heroBg)
    .filter(Boolean);

  // Duplicate the array multiple times to create a large enough off-screen buffer
  // so the infinite carousel doesn't leave "holes" when items wrap around on large desktop screens.
  const getProjectImages = () => [...baseImages, ...baseImages, ...baseImages, ...baseImages];

  const images = getProjectImages();

  // Use state to track the active center index for the carousel
  const [activeIndex, setActiveIndex] = useState(Math.floor(images.length / 2));

  // Modal state for the full-screen image viewer (indexes into baseImages)
  const [viewerIndex, setViewerIndex] = useState(null);

  // Auto-play the carousel to continuously move right to left
  useEffect(() => {
    if (viewerIndex !== null) return; // Pause auto-play while viewing full-screen
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2500); // Shift every 2.5 seconds
    return () => clearInterval(interval);
  }, [images.length, activeIndex, viewerIndex]); // Adding activeIndex resets the timer on manual click

  const openViewer = (index) => {
    setViewerIndex(index % baseImages.length);
  };

  const closeViewer = () => setViewerIndex(null);

  const showNext = () => {
    setViewerIndex((prev) => (prev + 1) % baseImages.length);
  };

  const showPrev = () => {
    setViewerIndex((prev) => (prev - 1 + baseImages.length) % baseImages.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full relative mt-0 mb-0 flex flex-col items-center overflow-visible">
      {/* Mobile Gallery Grid: 3 columns, wraps into as many rows as needed */}
      <div className="grid grid-cols-3 gap-2 w-full sm:hidden">
        {baseImages.map((img, index) => (
          <div
            key={index}
            onClick={() => openViewer(index)}
            className="aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm cursor-pointer"
          >
            <img src={img} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
          </div>
        ))}
      </div>

      {/* Flat Carousel Container (tablet & desktop) — breaks out of CleanCard's own padding (exact negative margins, not viewport units, so it stays reliably centered), with a narrower centered "stage" inside it so the arrows have real space of their own outside the images */}
      <div className="hidden sm:block self-stretch relative -mx-2 sm:-mx-8 md:-mx-16">
        <div className="relative mx-auto w-[90%] sm:w-[88%] md:w-[85%] lg:w-[82%] flex justify-center items-center h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
          {images.map((img, index) => {
            const N = images.length;
            let offset = index - activeIndex;

            // Normalize offset for a continuous circular carousel effect
            if (offset > N / 2) offset -= N;
            if (offset < -N / 2) offset += N;

            const absOffset = Math.abs(offset);

            // Flat translation for all screen sizes with a 15% gap (115% center-to-center)
            const gapMultiplier = 115;
            const translateXPct = (offset * gapMultiplier) - 50;

            // Uniform size and aspect ratio for all images on all screens
            const aspectClass = "sm:aspect-[4/3] lg:aspect-[3/2]";
            const widthClass = "sm:w-[35%] md:w-[28%] lg:w-[22%]";

            // Fade out items that are far off-screen
            let opacityClass = "opacity-100 pointer-events-auto";
            if (absOffset > 3) opacityClass = "opacity-0 pointer-events-none";

            return (
              <div
                key={index}
                onClick={() => openViewer(index)}
                className={`absolute left-1/2 top-1/2 ${widthClass} ${aspectClass} ${opacityClass} rounded-2xl overflow-hidden transition-transform duration-700 hover:brightness-110 shadow-sm border border-gray-100 cursor-pointer`}
                style={{
                  transform: `translate(${translateXPct}%, -50%)`,
                  zIndex: 10 - absOffset
                }}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows: live in the gutter outside the image stage, never over the photos */}
        <button
          onClick={handlePrev}
          className="absolute left-0 sm:left-1 md:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-[#1c1c1e] text-[#1c1c1e] hover:bg-[#2c52a1] hover:border-[#2c52a1] hover:text-white transition-all duration-300 flex items-center justify-center group cursor-pointer focus:outline-none"
          aria-label="Previous image"
        >
          <svg className="w-3 h-3 md:w-5 md:h-5 transform rotate-180 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 sm:right-1 md:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-[#1c1c1e] text-[#1c1c1e] hover:bg-[#2c52a1] hover:border-[#2c52a1] hover:text-white transition-all duration-300 flex items-center justify-center group cursor-pointer focus:outline-none"
          aria-label="Next image"
        >
          <svg className="w-3 h-3 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>

      {viewerIndex !== null && (
        <ImageViewerModal
          images={baseImages}
          activeIndex={viewerIndex}
          onClose={closeViewer}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
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
      className="w-full mx-auto rounded-3xl md:rounded-[40px] pt-2 pb-6 px-2 sm:p-8 md:p-16 flex flex-col items-center text-center mb-0 relative"
    >
      {/* Title Area */}
      <div className="z-10 mt-0 mb-6 sm:mb-2 sm:-mt-12 lg:-mt-16 max-w-4xl mx-auto px-2">
        <h2 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.2] md:leading-[1.1] font-serif">
          {certificate.projectName}
        </h2>
      </div>

      {/* The Arc Image Gallery in the center */}
      <div className="w-full z-10 mb-2 mt-0 lg:mt-2">
        <ProjectImageArc certificateId={certificate.id} />
      </div>

      {/* Detailed Information Grid */}
      <div className="w-full z-10 mb-12 mt-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Client & Donor */}
          <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#2c52a1] tracking-wider uppercase mb-4">Client Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Client</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.client}</p>
                <p className="text-gray-600 text-xs mt-1">{certificate.location}</p>
              </div>
              {certificate.donor?.name && certificate.donor.name !== "N/A" && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Donor</p>
                  <p className="text-gray-900 font-medium text-sm">{certificate.donor.name}</p>
                  <p className="text-gray-600 text-xs mt-1">{certificate.donor.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Financials */}
          <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#2c52a1] tracking-wider uppercase mb-4">Financials</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Work Order Value</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.financials?.workOrderValue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Cost On Completion</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.financials?.costOnCompletion}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Compensation Levied</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.financials?.compensationLevied}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#2c52a1] tracking-wider uppercase mb-4">Timeline</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Date of Start</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.timeline?.dateOfStart}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Stipulated Completion</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.timeline?.stipulatedCompletion}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Actual Completion</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.timeline?.actualCompletion}</p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#2c52a1] tracking-wider uppercase mb-4">Specifications</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Type of Work</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.specifications?.typeOfWork}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Built-Up Area</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.specifications?.totalBuiltUpArea}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Height</p>
                  <p className="text-gray-900 font-medium text-sm">{certificate.specifications?.maximumHeight}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Basements</p>
                  <p className="text-gray-900 font-medium text-sm">{certificate.specifications?.basements}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Storeys</p>
                <p className="text-gray-900 font-medium text-sm">{certificate.specifications?.storeys}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 bg-gray-50/80 rounded-2xl p-6 md:p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-bold text-[#2c52a1] tracking-wider uppercase mb-4">Project Description</h3>
          <p className="text-[16px] text-gray-700 leading-relaxed mb-4">
            {certificate.description}
          </p>
          <p className="text-[16px] text-gray-700 leading-relaxed italic">
            "Our highly guided execution ensures that {certificate.specifications?.typeOfWork?.toLowerCase() || 'these'} projects of this scale—over {certificate.specifications?.totalBuiltUpArea || 'the stipulated area'}—are delivered with absolute peace of mind."
          </p>
        </div>
      </div>

      {/* The Official Performance Report goes inside or below this card */}
      <div className="w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] z-10">
        <PerformanceReportCards performance={certificate.performance} />
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
        <p className="hidden sm:block text-gray-500 text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
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
    <div className="min-h-screen bg-white pt-32 pb-2 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="w-full mx-auto flex flex-col items-center">

        {selectedCert ? (
          <div className="w-full lg:w-[96vw] lg:max-w-[96vw]">
            <button
              onClick={() => setSelectedCert(null)}
              className="mb-4 sm:mb-8 inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group bg-gray-50 px-4 py-2 rounded-full"
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
              <h1 className="text-4xl font-bold text-gray-900">Completed Projects</h1>
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
