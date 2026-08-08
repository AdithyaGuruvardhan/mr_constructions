export default function AboutSection() {
  return (
    <section className="bg-white py-12 md:py-20 px-4 sm:px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-2">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 bg-[#f9f9f9] rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 flex flex-col justify-center shadow-sm border border-gray-100">
          
          {/* Header */}
          <div className="mb-6 md:mb-8 flex items-center space-x-4 md:space-x-6 text-xs md:text-sm font-semibold uppercase tracking-wider text-black opacity-80">
            <span>MR Construction</span>
            <div className="h-1 w-1 bg-black rounded-full"></div>
            <span>About Us</span>
          </div>
          
          {/* Main Text */}
          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-medium text-[#2d2d2d] leading-tight mb-4 md:mb-6">
            Building Excellence <br/> Since 2005
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg mb-8 md:mb-12 leading-relaxed max-w-lg">
            M R Constructions (MRC) is an ISO-certified construction and engineering company based in Basavanagudi, Bangalore. Over 17+ years, we've built a reputation for handling large, complex projects for both government and private clients, with 1000+ completed projects.
          </p>
          
          {/* Action Button */}
          <div className="mb-8 md:mb-12">
            <button className="group relative overflow-hidden bg-[#1e2025] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-medium text-base md:text-lg inline-flex items-center space-x-2 border border-transparent hover:border-[#ff761f]/30 transition-colors duration-300">            
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Read Our Story</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-all duration-300 group-hover:translate-x-1 text-white group-hover:text-[#ff761f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black mb-1">1000+</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-snug">Completed<br/>Projects</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black mb-1">17+</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-snug">Years of<br/>Experience</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm flex flex-col justify-center hidden lg:flex">
              <h3 className="text-3xl md:text-4xl font-medium text-black mb-1">900+</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-snug">Happy<br/>Clients</p>
            </div>
          </div>
          
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 min-h-[300px] sm:min-h-[400px] md:min-h-full relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
          <img 
            src="/commercial/infosys/INFOSYS HUBLI35.webp"
            alt="MR Construction Building" 
            className="absolute inset-0 w-full h-full object-cover object-[52%_center]"
          />
        </div>

      </div>
    </section>
  );
}
