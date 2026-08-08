import React, { useState, useRef } from 'react';

export default function Commercial() {
  const scrollContainerRef = useRef(null);
  const itemsRef = useRef([]);

  // drag to scroll functionality
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isDragging = useRef(false);

  const galleryImages = [
    "MRC SIRA DRONE_4.webp",
    "MRC sira 2S _8.webp",
    "SIRA SOLAR PLANT12.webp",
    "MRC sira 2S _42.webp",
    "SIRA SOLAR PLANT17.webp",
    "SIRA SOLAR PLANT5.webp"
  ];

  const updateGallery = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const center = scrollLeft + containerWidth / 2;

    const vw = window.innerWidth;
    const isLg = vw >= 1024;
    const isMd = vw >= 768 && vw < 1024;
    
    // We want a visual gap of 1.5vw on desktop and 2vw on mobile between the active and inactive items.
    // The active item expands by 17.5% (0.35/2) of its base width.
    // lg baseWidth = 18vw -> expansion = 3.15vw.  Total gap = 3.15 + 1.5 = 4.65vw
    // md baseWidth = 22vw -> expansion = 3.85vw.  Total gap = 3.85 + 1.5 = 5.35vw
    // sm baseWidth = 35vw -> expansion = 6.125vw. Total gap = 6.125 + 2.0 = 8.125vw
    const gapVw = isLg ? 4.65 : (isMd ? 5.35 : 8.125);
    const gapPx = vw * (gapVw / 100);

    itemsRef.current.forEach((item) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(center - itemCenter);
      
      // The exact distance between two item centers
      const maxDist = item.offsetWidth + gapPx;
      let progress = 1 - (distance / maxDist);
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      // Scale from 1 to 1.35
      const currentScale = 1 + (0.35 * progress);
      
      // Color from #d1d1d1 (rgb 209) to #e5e5e5 (rgb 229)
      const r = 209 + (20 * progress); 
      
      // GPU accelerated transform to prevent layout thrashing (lag)
      item.style.transform = `scale(${currentScale})`;
      item.style.zIndex = Math.round(progress * 10);
      item.children[0].style.backgroundColor = `rgb(${r}, ${r}, ${r})`;
    });
  };

  const handleScroll = () => {
    requestAnimationFrame(updateGallery);
  };

  React.useEffect(() => {
    updateGallery();
    window.addEventListener('resize', updateGallery);
    return () => window.removeEventListener('resize', updateGallery);
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    isDragging.current = false;
    scrollContainerRef.current.classList.add('cursor-grabbing');
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    scrollContainerRef.current.classList.remove('cursor-grabbing');
  };

  const handleMouseUp = () => {
    isDown.current = false;
    scrollContainerRef.current.classList.remove('cursor-grabbing');
    
    // Snap to closest if we were dragging
    if (isDragging.current) {
      snapToClosest();
    }
  };

  const snapToClosest = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(center - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    const targetItem = itemsRef.current[closestIndex];
    if (targetItem) {
      const targetScrollLeft = targetItem.offsetLeft + targetItem.offsetWidth / 2 - container.offsetWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    isDragging.current = true;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <div className="w-full flex flex-col">
      <div
        className="min-h-[75vh] md:min-h-[80vh] w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url('/commercial/sira%20solar%20plant/MRC%20sira%202S%20_8.webp')` }}
      >
        <div className="z-10 flex flex-col items-end mb-36 md:mb-50">
          <h1 className="text-6xl md:text-9xl font-bold text-white text-center drop-shadow-md">
            Sira Solar Plant
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white text-right drop-shadow-md mt-2 font-bold">
            MYSORE
          </p>
        </div>

        <div className="absolute bottom-8 left-8 md:bottom-16 md:left-92 text-white font-bold text-4xl md:text-8xl drop-shadow-md z-10">
          01
        </div>
      </div>

      <div className="w-full bg-white py-16 md:py-24 px-6 md:px-16 flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-12">

        {/* Mobile Overlapped Images (Visible only on mobile/tablet) */}
        <div className="flex lg:hidden relative w-full max-w-sm mx-auto h-64 md:h-80 mb-14">
          <img
            src="/commercial/sira%20solar%20plant/MRC%20sira%202S%20_14.webp"
            alt="Sira Solar Plant View 1"
            className="absolute top-0 left-4 md:left-8 w-44 md:w-56 h-auto object-cover rounded-xl shadow-lg z-10"
          />
          <img
            src="/commercial/sira%20solar%20plant/SIRA%20SOLAR%20PLANT11.webp"
            alt="Sira Solar Plant View 2"
            className="absolute top-24 md:top-32 right-12 md:right-8 w-44 md:w-56 h-auto object-cover rounded-xl shadow-lg z-20"
          />
        </div>

        {/* Left Image (Visible only on desktop) */}
        <div className="hidden lg:flex w-full lg:w-1/4 justify-center">
          <img
            src="/commercial/sira%20solar%20plant/MRC%20sira%202S%20_14.webp"
            alt="Sira Solar Plant View 1"
            className="w-full max-w-full aspect-[4000/5393] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Center Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6 md:gap-8">
          <p className="text-lg md:text-2xl text-black text-center max-w-5xl leading-relaxed font-medium">
            Spread across 218 acres in Sira Taluk, Tumkur District, this project reflects the scale and precision we bring to large infrastructure works.
          </p>
          <p className="text-lg md:text-2xl text-black text-center max-w-5xl leading-relaxed font-medium">
            Executed for Infosys Limited over 28 months, our scope covered everything from roads and water reservoirs to treatment systems and area development — bringing the site to life end to end. Here's a closer look at the numbers behind the project.
          </p>

          {/* Decorative Vertical Line */}
          <div className="w-[2px] h-10 md:h-14 bg-gray-500"></div>
        </div>

        {/* Right Image (Visible only on desktop) */}
        <div className="hidden lg:flex w-full lg:w-1/4 justify-center">
          <img
            src="/commercial/sira%20solar%20plant/SIRA%20SOLAR%20PLANT11.webp"
            alt="Sira Solar Plant View 2"
            className="w-full max-w-full aspect-[4000/5393] object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* 218 Acres Drone Section */}
      <div className="w-full bg-gray-50 flex flex-col md:flex-row justify-between gap-12 lg:gap-0 py-16 md:py-24 px-6 md:px-16 items-stretch">
        {/* Left Image & Overlay */}
        <div className="relative w-full lg:w-[55%]">
          <img 
            src="/commercial/sira%20solar%20plant/MRC%20SIRA%20DRONE_10.webp" 
            alt="Drone View of Sira Solar Plant 1" 
            className="w-full h-auto md:h-[60vh] lg:h-[65vh] object-cover rounded-3xl shadow-xl"
          />
          {/* Info Card Overlay (Inside Image) */}
          <div className="absolute top-4 right-4 md:top-12 md:right-12 bg-gray-50 p-6 md:p-8 shadow-lg rounded-3xl z-10 w-[calc(100%-2rem)] md:w-[360px] text-left hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg md:text-2xl font-bold text-[#1c1c1e] mb-1 md:mb-2">218 Acres</h3>
            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
              Total site area developed for the Infosys solar park at Sira Taluk
            </p>
          </div>
        </div>

        {/* Right Content (Text + Staggered Image) */}
        <div className="w-full lg:w-[38%] mt-8 md:mt-0 flex flex-col justify-end items-end">
          
          <div className="w-full flex flex-col sm:flex-row gap-6 mb-10">
            <div className="bg-[#2c2c2e] p-6 shadow-xl rounded-2xl flex-1 hover:-translate-y-2 transition-transform duration-300">
              <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2">12 km</h4>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Bitumen roads constructed to connect and support the entire site
              </p>
            </div>
            <div className="bg-[#2c2c2e] p-6 shadow-xl rounded-2xl flex-1 hover:-translate-y-2 transition-transform duration-300">
              <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2">3 nos</h4>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Underground Reservoirs built with a combined capacity of 630 KLD
              </p>
            </div>
          </div>

          <img 
            src="/commercial/sira%20solar%20plant/MRC%20SIRA%20DRONE_13.webp" 
            alt="Drone View of Sira Solar Plant 2" 
            className="w-full h-auto md:h-[40vh] lg:h-[35vh] object-cover rounded-3xl shadow-xl"
          />
        </div>
      </div>
      {/* Gallery Section */}
      <div className="w-full bg-white py-12 flex flex-col overflow-hidden">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-black mb-12 tracking-tighter leading-[1.1] pl-6 md:pl-16">
          <span className="font-light block">Project</span>
          <span className="font-medium block">Gallery</span>
        </h2>
        
        {/* Horizontal Scroll Container (Carousel) */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex items-center gap-[8.125vw] md:gap-[5.35vw] lg:gap-[4.65vw] overflow-x-auto py-16 md:py-24 w-full px-[32.5vw] md:px-[39vw] lg:px-[41vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
        >
          {galleryImages.map((img, index) => {
            return (
              <div 
                key={index} 
                ref={el => itemsRef.current[index] = el}
                className="flex-none w-[35vw] md:w-[22vw] lg:w-[18vw] transition-none origin-center relative"
              >
                <div className="w-full h-[25vh] md:h-[40vh] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#d1d1d1]">
                  <img 
                    src={`/commercial/sira%20solar%20plant/${img.replace(/ /g, "%20")}`}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable="false"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
