export default function ProcessSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Left Column - Text and Main Image */}
        <div className="w-full lg:w-3/5 flex flex-col">
          <h2 className="text-3xl md:text-[2.75rem] font-medium text-[#2d2d2d] leading-tight mb-6">
            Meticulous Planning &<br /> Flawless Execution
          </h2>
          <p className="text-[#6b6b6b] text-lg mb-10 leading-relaxed max-w-xl">
            Our service range spans Design, Civil, Infrastructure, Finishing Works, and MEP (Mechanical, Electrical, Plumbing) services. Our core differentiators are affordability, on-time delivery, quality assurance, and deep sector experience—backed by a strong safety record.
          </p>
          
          {/* Cropped Building Plan Image */}
          <div className="w-full h-[280px] md:h-[350px] overflow-hidden rounded-[2rem] ">
            <img 
              src="/infosys_plan.webp" 
              alt="Building Blueprint" 
              className="w-full h-full object-cover object-[center_45%] scale-[1]"
            />
          </div>
        </div>

        {/* Right Column - Process Cards */}
        <div className="w-full lg:w-2/5 flex flex-col gap-5">
          
          {/* Card 1 */}
          <div className="bg-[#1e2025] rounded-[1.5rem] flex items-stretch p-3 shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 md:w-28 h-auto min-h-[90px] flex-shrink-0 bg-gray-800 relative rounded-xl overflow-hidden">
               <img src="/infosys_plan (1).webp" alt="Plan" className="absolute inset-0 w-full h-full object-cover object-center bg-white scale-[1.2]" />
            </div>
            <div className="p-4 md:px-6 flex flex-col justify-center">
              <h3 className="text-white font-medium text-lg mb-2">1. Strategic Design</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Comprehensive site analysis and detailed 3D architectural modeling.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1e2025] rounded-[1.5rem] flex items-stretch p-3 shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 md:w-28 h-auto min-h-[90px] flex-shrink-0 bg-gray-300 relative rounded-xl overflow-hidden">
               <img src="/infosys_top_view.webp" alt="Build" className="absolute inset-0 w-full h-full object-cover scale-[1.2]" />
            </div>
            <div className="p-4 md:px-6 flex flex-col justify-center">
              <h3 className="text-white font-medium text-lg mb-2">2. Structural Integrity</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Utilizing premium materials with advanced framing technology.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1e2025] rounded-[1.5rem] flex items-stretch p-3 shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 md:w-28 h-auto min-h-[90px] flex-shrink-0 bg-gray-300 relative rounded-xl overflow-hidden">
               <img src="/INFOSYS HUBLI29.webp" alt="Deliver" className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
            <div className="p-4 md:px-6 flex flex-col justify-center">
              <h3 className="text-white font-medium text-lg mb-2">3. Final Handover</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Rigorous quality inspections ensuring zero defects before move-in.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
