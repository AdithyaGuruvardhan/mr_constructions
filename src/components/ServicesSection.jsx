import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServicesSection() {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const serviceItems = [
    { id: 1, title: 'Commercial', projects: 'Delivering modern office spaces, retail environments, and state-of-the-art commercial complexes.', image: '/sira_solar.webp', link: '/portfolio#commercial' },
    { id: 2, title: 'Education Institute', projects: 'Building inspiring learning environments, from educational institutions to advanced research campuses.', image: '/hubli_school_vert.webp', link: '/portfolio#education-institution' },
    { id: 3, title: 'Hospitals', projects: 'Constructing specialized healthcare facilities, clinics, and multi-specialty hospitals with precision.', image: '/hospital.webp', link: '/portfolio#hospitals' },
    { id: 4, title: 'Archaeological Developments', projects: 'Preserving historical heritage and developing archaeological sites with traditional architectural integrity.', image: '/melukote_temple.webp', link: '/portfolio#archaeological-developments' },
    { id: 5, title: 'Metro and Roads', projects: 'Developing critical transportation infrastructure including metro lines and road networks for seamless connectivity.', image: '/building.webp', link: '/portfolio#metro-and-roads' },
  ];

  const handleMouseDown = (e) => {
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    if (Math.abs(x - startX) > 5) {
      setIsDragging(true);
    }
    const walk = (x - startX) * 1.5; // Natural scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (link, e) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    navigate(link);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const scrollLeftBtn = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-20 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        
        {/* Title */}
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-[2.75rem] font-medium text-[#2c52a1] mb-4">Services</h2>
          <p className="text-[#6b6b6b] text-lg max-w-2xl">
            Explore our diverse range of services across various sectors.
          </p>
        </div>

        {/* Draggable/Scrollable Container */}
        <div className="bg-[#2c2d3c]/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 w-full overflow-hidden shadow-sm">
          
          <div 
            ref={scrollRef}
            className={`flex gap-6 overflow-x-auto pb-4 ${isDown ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', scrollBehavior: isDown ? 'auto' : 'smooth' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {serviceItems.map((item) => (
              <div 
                key={item.id} 
                onClick={(e) => handleCardClick(item.link, e)}
                className="relative w-[280px] md:w-[360px] h-[400px] md:h-[500px] flex-shrink-0 rounded-[1.5rem] overflow-hidden group shadow-lg bg-gray-300 cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/2 to-transparent pointer-events-none"></div>
                
                {/* Text */}
                <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none z-10">
                  <h3 className="text-white text-2xl font-medium tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-sm line-clamp-3">
                    {item.projects}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}} />

        </div>

        {/* Scroll Buttons */}
        <div className="w-full flex justify-end mt-8 gap-4">
          <button 
            onClick={scrollLeftBtn}
            className="w-14 h-14 rounded-full bg-[#1e2025] hover:bg-[#2c52a1] transition-colors duration-300 text-white flex items-center justify-center shadow-lg group cursor-pointer"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:-translate-x-1">arrow_left</span>
          </button>
          
          <button 
            onClick={scrollRight}
            className="w-14 h-14 rounded-full bg-[#1e2025] hover:bg-[#2c52a1] transition-colors duration-300 text-white flex items-center justify-center shadow-lg group cursor-pointer"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:translate-x-1">arrow_right</span>
          </button>
        </div>

      </div>
    </section>
  );
}
