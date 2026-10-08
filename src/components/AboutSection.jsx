import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, Editable, useList, useImages, ItemTools, AddItem, ImagesButton } from '../content/editable';

const CAROUSEL_IMAGES = [
  "/commercial/infosys/INFOSYS HUBLI19.webp",
  "/Lake Development_vert (1).webp",
  "/Education Institution/CBSE ENGLISH MEDIUM HIGH SCHOOL- Shivanahalli/MRC shivanahalli 2S 22_40.webp",
  "/hospital/Kidwai Cancer Hospital/MRC kidwai DRONE _8.webp",
  "/temple/Melukote Kalayani/MELKOTE KALYANI17.webp"
];

const DEFAULT_STATS = [
  { value: '125+', label: 'Completed\nProjects' },
  { value: '20+', label: 'Years of\nExperience' },
  { value: '100+', label: 'Happy\nClients' },
];

export default function AboutSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useImages('home.about.carousel', CAROUSEL_IMAGES);
  const stats = useList('home.about.stats', DEFAULT_STATS);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section className="bg-white py-12 md:py-20 px-4 sm:px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-2">

        {/* Left Content */}
        <div className="w-full md:w-1/2 bg-[#f9f9f9] rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 flex flex-col justify-center shadow-sm border border-gray-100">

          {/* Header */}
          <div className="mb-6 md:mb-8 flex items-center space-x-4 md:space-x-6 text-xs md:text-sm font-semibold uppercase tracking-wider text-black opacity-80">
            <span><T k="home.about.label1">MR Construction</T></span>
            <div className="h-1 w-1 bg-black rounded-full"></div>
            <span><T k="home.about.label2">About Us</T></span>
          </div>

          {/* Main Text */}
          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-medium text-[#2d2d2d] leading-tight mb-4 md:mb-6">
            <T k="home.about.title">{'Building Excellence\nSince 2005'}</T>
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg mb-8 md:mb-12 leading-relaxed max-w-lg">
            <T k="home.about.text">{"M R Constructions (MRC) is an ISO-certified construction and engineering company based in Basavanagudi, Bengaluru.\nOver 20+ years, we've built a reputation for handling large, complex projects for both government and private clients,\nwith 125+ completed projects."}</T>
          </p>

          {/* Action Button */}
          <div className="mb-8 md:mb-12">
            <button
              onClick={() => navigate('/about')}
              className="group relative overflow-hidden bg-[#2c52a1] text-black px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-medium text-base md:text-lg inline-flex items-center space-x-2 transition-transform hover:scale-105 duration-300 shadow-sm">
              <span className="relative z-10 text-white"><T k="home.about.button">Read Our Story</T></span>
              <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-all duration-300 group-hover:translate-x-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {stats.items.map((stat, i) => (
              <div key={i} className={`relative bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm flex flex-col justify-center ${i === 2 ? 'hidden lg:flex' : ''}`}>
                <ItemTools list={stats} index={i} className="-top-3 right-1" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black mb-1"><Editable value={stat.value} onChange={v => stats.update(i, { value: v })} /></h3>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-snug"><Editable value={stat.label} onChange={v => stats.update(i, { label: v })} /></p>
              </div>
            ))}
            <AddItem label="Add stat" onAdd={() => stats.add({ value: '0+', label: 'New\nStat' })} />
          </div>

        </div>

        {/* Right Image Carousel */}
        <div className="w-full md:w-1/2 min-h-[300px] sm:min-h-[400px] md:min-h-full relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 bg-[#e5e5e5]">
          <ImagesButton images={carouselImages} onChange={setCarouselImages} label="Edit slideshow" className="top-4 left-4" />
          {carouselImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`MR Construction Building ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 w-full h-full object-cover object-[52%_center] transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
