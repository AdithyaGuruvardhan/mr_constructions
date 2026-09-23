import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectData } from '../data/projectsData';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = getProjectData(id);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  // Single-row galleries (and grids with showAllGallery) show every image; otherwise the grid caps at 6
  const lightboxImages = project ? (project.singleRowGallery || project.showAllGallery ? project.galleryImages : project.galleryImages.slice(0, 6)) : [];

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') { setSelectedIndex(null); setZoomScale(1); }
      if (e.key === 'ArrowRight') { 
        setSelectedIndex(prev => (prev < lightboxImages.length - 1 ? prev + 1 : 0)); 
        setZoomScale(1); 
      }
      if (e.key === 'ArrowLeft') { 
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : lightboxImages.length - 1)); 
        setZoomScale(1); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, lightboxImages.length]);

  if (!project) {
    return <div className="text-center p-20 text-2xl">Project Not Found</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <div
        className="min-h-[75vh] md:min-h-[95vh] w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url('${project.heroBg}')` }}
      >
        <div className="z-10 w-full px-6 flex justify-center mt-20 mb-8 md:mt-0 md:mb-50">
          <div className="flex flex-col items-end w-fit max-w-[95vw] md:max-w-[85vw] lg:max-w-[1100px] xl:max-w-[1200px]">
            <h1 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-bold text-white text-center drop-shadow-md leading-[1.1]">
              {project.title}
            </h1>
            {project.location && (
              <p className="text-xl md:text-2xl lg:text-3xl text-white text-right drop-shadow-md mt-2 md:mt-4 font-bold uppercase mr-8 md:mr-32">
                {project.location}
              </p>
            )}
          </div>
        </div>

        <div className="absolute bottom-8 left-8 md:bottom-16 md:left-92 text-white font-bold text-4xl md:text-8xl drop-shadow-md z-10">
          {project.number}
        </div>
      </div>

      {(project.introText1 || project.introText2 || project.images) && (
        <div className="w-full bg-white py-8 md:py-24 px-6 md:px-16 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12">
  
          {/* Mobile Overlapped Images (Visible only on mobile/tablet) */}
          {project.images && (
            <div className="flex lg:hidden relative w-full max-w-sm mx-auto h-[220px] md:h-80 mb-2 md:mb-14 mt-4 md:mt-0">
              <img
                src={project.images.mobile1}
                alt={`${project.title} View 1`}
                className="absolute top-0 left-2 sm:left-4 md:left-8 w-40 md:w-56 h-auto object-cover rounded-xl shadow-lg z-10"
              />
              <img
                src={project.images.mobile2}
                alt={`${project.title} View 2`}
                className="absolute top-20 md:top-32 right-6 sm:right-12 md:right-8 w-40 md:w-56 h-auto object-cover rounded-xl shadow-lg z-20"
              />
            </div>
          )}
  
          {/* Left Image (Visible only on desktop) */}
          {project.images && (
            <div className="hidden lg:flex w-full lg:w-1/4 justify-center">
              <img
                src={project.images.desktopLeft}
                alt={`${project.title} View 1`}
                className="w-full max-w-full aspect-[4/5] object-cover rounded-xl shadow-lg"
              />
            </div>
          )}
  
          {/* Center Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6 md:gap-8">
            <p className="text-lg md:text-2xl text-black text-center max-w-5xl leading-relaxed font-medium">
              {project.introText1}
            </p>
            <p className="text-lg md:text-2xl text-black text-center max-w-5xl leading-relaxed font-medium">
              {project.introText2}
            </p>
  
            {/* Decorative Vertical Line */}
            <div className="w-[2px] h-10 md:h-14 bg-gray-500"></div>
          </div>
  
          {/* Right Image (Visible only on desktop) */}
          {project.images && (
            <div className="hidden lg:flex w-full lg:w-1/4 justify-center">
              <img
                src={project.images.desktopRight}
                alt={`${project.title} View 2`}
                className="w-full max-w-full aspect-[4/5] object-cover rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      )}

      {/* Drone/Stat Section */}
      {/* Drone/Stat Section */}
      {project.droneSection && (
        <div className="w-full bg-gray-50 flex flex-col md:flex-row justify-between gap-12 lg:gap-0 py-16 md:py-24 px-6 md:px-16 items-stretch">
          {/* Left Image & Overlay */}
          <div className="relative w-full lg:w-[55%] flex flex-col-reverse md:block">
            <img
              src={project.droneSection.img1}
              alt="Drone View 1"
              className="w-full h-auto md:h-[60vh] lg:h-[65vh] object-cover rounded-3xl shadow-xl"
            />
            {/* Info Card Overlay (Inside Image on Desktop, Above on Mobile) */}
            <div className="relative mb-6 md:mb-0 md:absolute md:top-8 md:right-8 bg-gray-50 p-6 md:p-6 shadow-lg rounded-3xl z-10 w-full md:w-[360px] text-left hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg md:text-xl font-bold text-[#1c1c1e] mb-1 md:mb-2">{project.droneSection.cardTitle}</h3>
              <p className="text-gray-500 text-sm md:text-sm font-medium leading-relaxed">
                {project.droneSection.cardDesc}
              </p>
            </div>
          </div>
  
          {/* Right Content (Text + Staggered Image) */}
          <div className="w-full lg:w-[38%] mt-8 md:mt-0 flex flex-col justify-end items-end">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {project.droneSection.stats.map((stat, idx) => (
                <div key={idx} className="bg-[#2c2c2e] p-6 shadow-xl rounded-2xl flex-1 hover:-translate-y-2 transition-transform duration-300">
                  <h4 className="text-2xl lg:text-xl font-bold text-white mb-2">{stat.title}</h4>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
  
            <img
              src={project.droneSection.img2}
              alt="Drone View 2"
              className="w-full h-auto md:h-[40vh] lg:h-[35vh] object-cover rounded-3xl shadow-xl"
            />
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <div className="w-full bg-white py-12 flex flex-col overflow-hidden">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-black mb-12 md:mb-20 tracking-tighter leading-[1.1] pl-6 md:px-16 max-w-[1600px] mx-auto w-full">
          <span className="font-light block">Project</span>
          <span className="font-medium block">Gallery</span>
        </h2>

        {project.groupedGallery ? (
          <div className="w-full pb-12">
            <div className="flex flex-col items-center gap-16 md:gap-24 px-4 md:px-16 w-full mx-auto">
              {project.groupedGallery.map((group, groupIdx) => (
                <div key={groupIdx} className="flex flex-col w-full gap-6">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1c1c1e] text-center md:text-left ml-2 tracking-tight">
                    {group.title}
                  </h3>
                  <div className="flex flex-nowrap items-center gap-4 md:gap-10 lg:gap-[4.5vw]">
                    {group.images.map((img, imgIdx) => {
                      const absIndex = groupIdx * 2 + imgIdx;
                      return (
                        <div
                          key={imgIdx}
                          onClick={() => { setSelectedIndex(absIndex); setZoomScale(1); }}
                          className="flex-none cursor-pointer rounded-[1rem] md:rounded-[2rem] shadow-xl group overflow-hidden bg-[#d1d1d1] transition-transform duration-300 hover:scale-[1.02] w-[42vw] sm:w-[45vw] md:w-[44vw] lg:w-[43vw] xl:w-[42vw] h-[25vh] sm:h-[35vh] md:h-[50vh] lg:h-[60vh] opacity-95 hover:opacity-100 z-10 hover:z-20 hover:shadow-2xl"
                        >
                          <img
                            src={img}
                            alt={`${group.title} View ${imgIdx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : project.singleRowGallery ? (
          <div className="w-full overflow-x-auto hide-scrollbar pb-12">
            <div className="flex flex-nowrap items-center gap-4 md:gap-10 lg:gap-[4.5vw] px-4 md:px-16 w-max mx-auto">
              {project.galleryImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => { setSelectedIndex(index); setZoomScale(1); }}
                  className="flex-none cursor-pointer rounded-[1rem] md:rounded-[2rem] shadow-xl group overflow-hidden bg-[#d1d1d1] transition-transform duration-300 hover:scale-[1.05] w-[45vw] md:w-[22vw] lg:w-[18vw] h-[25vh] md:h-[35vh] lg:h-[40vh] opacity-95 hover:opacity-100 z-10 hover:z-20 hover:shadow-2xl"
                >
                  <img
                    src={img}
                    alt={`Gallery View ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 md:gap-20 items-center px-2 md:px-16 w-full max-w-[1600px] mx-auto pb-12">
            {Array.from({ length: Math.ceil(lightboxImages.length / 3) }, (_, i) =>
              lightboxImages.slice(i * 3, i * 3 + 3)
            ).map((rowImages, rowIndex) => (
              <div key={rowIndex} className="flex flex-row items-center justify-center gap-2 md:gap-10 lg:gap-[4.5vw] w-full">
                {rowImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => { setSelectedIndex(rowIndex * 3 + index); setZoomScale(1); }}
                    className="flex-none cursor-pointer rounded-[1rem] md:rounded-[2rem] shadow-xl group overflow-hidden bg-[#d1d1d1] transition-transform duration-300 hover:scale-[1.05] w-[28vw] md:w-[22vw] lg:w-[18vw] h-[22vh] md:h-[35vh] lg:h-[40vh] opacity-95 hover:opacity-100 z-10 hover:z-20 hover:shadow-2xl"
                  >
                    <img
                      src={img}
                      alt={`Gallery View ${rowIndex * 3 + index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md transition-opacity duration-300"
          onClick={() => { setSelectedIndex(null); setZoomScale(1); }}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white text-4xl md:text-5xl hover:text-gray-300 z-[10000] leading-none transition-colors"
            onClick={() => { setSelectedIndex(null); setZoomScale(1); }}
            aria-label="Close modal"
          >
            &times;
          </button>
          
          {/* Zoom Controls */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 flex gap-4 z-[10000]">
            <button 
              className="bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl font-bold transition-colors"
              onClick={(e) => { e.stopPropagation(); setZoomScale(prev => Math.min(prev + 0.5, 3)); }}
              title="Zoom In"
            >
              +
            </button>
            <button 
              className="bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl font-bold transition-colors"
              onClick={(e) => { e.stopPropagation(); setZoomScale(prev => Math.max(prev - 0.5, 1)); }}
              title="Zoom Out"
            >
              -
            </button>
          </div>

          {/* Previous Button */}
          <button 
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl md:text-7xl z-[10000] transition-colors p-4"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex(prev => (prev > 0 ? prev - 1 : lightboxImages.length - 1)); 
              setZoomScale(1); 
            }}
          >
            &#8249;
          </button>

          {/* Next Button */}
          <button 
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl md:text-7xl z-[10000] transition-colors p-4"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex(prev => (prev < lightboxImages.length - 1 ? prev + 1 : 0)); 
              setZoomScale(1); 
            }}
          >
            &#8250;
          </button>

          {/* Image Container with Scroll/Pan support if zoomed */}
          <div 
            className="w-full h-full flex items-center justify-center overflow-auto hide-scrollbar"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={lightboxImages[selectedIndex]} 
              alt="Fullscreen View" 
              className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
