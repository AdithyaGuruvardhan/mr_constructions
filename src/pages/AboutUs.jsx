import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const cardsRef = useRef(null);
  const sectionRef = useRef(null);
  const pointsRef = useRef(null);

  useGSAP(() => {
    // 1. Container comes in when section is reached
    gsap.from(cardsRef.current, {
      y: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Triggers before it gets pinned
        toggleActions: "play none none reverse"
      }
    });

    // 2. Points scrub in while section is pinned
    gsap.from(pointsRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 5%",
        end: "+=100%",
        pin: true,
        scrub: 1,
      }
    });
  });

  return (
    <div className="relative w-full min-h-screen bg-white text-[#2d2d2d] pb-0 font-sans overflow-hidden">

      {/* Layered Parallax Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[90vh] flex items-center justify-center overflow-hidden mb-12 md:mb-20 bg-[#e0e0e0]">

        {/* Background Image Layer */}
        <img
          src="/bg.webp"
          alt="Background Skyline"
          className="absolute inset-0 w-full h-full object-cover object-[50%_70%] z-0"
        />

        {/* Sandwiched Text Layer */}
        <h1 className="relative z-10 text-[18vw] md:text-[16vw] leading-none font-bold uppercase tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-[#2052a1]/40 to-transparent opacity-80 select-none -translate-y-12 md:-translate-y-26 drop-shadow-md">
          ABOUT US
        </h1>

        {/* Foreground Image Layer */}
        <img
          src="/fg.webp"
          alt="Foreground Building"
          className="absolute inset-0 w-full h-full object-cover object-[50%_70%] z-20 pointer-events-none"
        />

        {/* Fade to white at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-38 bg-gradient-to-t from-white to-transparent z-30 pointer-events-none"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-30">

        {/* Capabilities Inline Image Section */}
        <div className="flex justify-center mb-24 md:mb-32 w-full">
          <p className="text-md md:text-2xl lg:text-3xl text-[#2d2d2d] leading-relaxed md:leading-relaxed max-w-5xl text-center font-normal tracking-wide">
            We cover the full construction value chain - <br className="hidden lg:block" />
            design management, civil construction,{' '}
            infrastructure, finishing, and<br /> MEP -{' '}
            backed by experienced teams and modern methods,<br /> delivering practical, efficient, long-lasting builds.
          </p>
        </div>

        {/* M Ramesh Reddy Section */}
        <div className="w-full relative z-30 mb-24 md:mb-32">
          <div className="bg-[#1c1c1e] rounded-[2rem] p-8 md:p-16 flex flex-col-reverse lg:flex-row justify-between shadow-2xl relative overflow-hidden gap-12 lg:gap-16 items-center">
            {/* Decorative bottom text */}
            <div className="absolute -bottom-6 left-0 w-full flex gap-4 text-[#2a2a2c] font-bold text-5xl md:text-7xl lg:text-8xl uppercase whitespace-nowrap select-none pointer-events-none">
              <span>THE VISIONARY</span>
            </div>

            <div className="relative z-10 flex flex-col lg:w-6/12 justify-center">
              <h2 className="text-white text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.2] tracking-tight mb-6 md:mb-8">
                M Ramesh Reddy
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                M Ramesh Reddy’s journey is defined by hard work, determination, and an unwavering commitment to excellence. Born in Nangali, Karnataka, into a humble family, he began his career as a civil contractor and steadily built M R Constructions into a trusted leader in the industry. A pivotal milestone in his career came in 2012 when he became a vendor for Infosys, leading to an inspiring meeting with the renowned Smt. Sudha Murty. Today, his visionary leadership continues to drive M R Constructions toward new heights of engineering and operational success.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col lg:w-5/12 justify-end w-full self-end -mb-8 md:-mb-16 pt-8 md:pt-0">
              <div className="w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-square rounded-t-[1.5rem] md:rounded-t-[1.5rem] rounded-b-none overflow-hidden shadow-lg border-t border-l border-r border-white/10">
                <img src="/ramesh_reddy.png" alt="M Ramesh Reddy" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>
        </div>

        {/* Smt. Sudha Murty Section */}
        <div className="w-full relative z-30 mb-24 md:mb-32">
          <div className="bg-[#1c1c1e] rounded-[2rem] p-8 md:p-16 flex flex-col-reverse lg:flex-row-reverse justify-between shadow-2xl relative overflow-hidden gap-12 lg:gap-16 items-center">
            {/* Decorative bottom text */}
            <div className="absolute -bottom-6 right-0 w-full flex justify-end gap-4 text-[#2a2a2c] font-bold text-5xl md:text-7xl lg:text-8xl uppercase whitespace-nowrap select-none pointer-events-none">
              <span>THE INSPIRATION</span>
            </div>

            <div className="relative z-10 flex flex-col lg:w-6/12 justify-center">
              <h2 className="text-white text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.2] tracking-tight mb-6 md:mb-8">
                Smt. Sudha Murty
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium mb-4">
                Smt. Sudha Murty is a renowned author, philanthropist, educator, and social worker known for her simplicity and dedication to serving society. Through her work in education, healthcare, rural development, and social welfare, she has contributed to meaningful change across India.
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                Her writing has inspired generations with stories rooted in kindness, humility, compassion, and life lessons. Her journey reflects a deep commitment to empowering communities and creating a positive and lasting impact on society.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col lg:w-5/12 justify-end w-full self-end -mb-8 md:-mb-16 pt-8 md:pt-0">
              <div className="w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-square rounded-t-[1.5rem] md:rounded-t-[1.5rem] rounded-b-none overflow-hidden shadow-lg border-t border-l border-r border-white/10">
                <img src="/sudha_murthy.png" alt="Smt. Sudha Murty" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>

        {/* Engineered for Performance / Vision & Mission Section */}
        <div className="flex flex-col mb-24">

          {/* Top Full Width Text & CTA */}
          <div className="w-full flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-[#2d2d2d] uppercase">
              OUR COMMITMENT
            </div>
            <p className="text-2xl md:text-3xl lg:text-[2rem] text-[#4a4a4a] leading-tight mb-8 max-w-5xl">
              At MRC, excellence goes beyond the structures we build - it's in the confidence we inspire. Our commitment to safety, transparency, and engineering integrity forges enduring relationships with every client and partner.
            </p>

            <button className="flex items-center justify-between bg-[#2c52a1] text-white px-2 py-2 rounded-full w-44 hover:bg-[#2c2d3c] transition-colors shadow-lg">
              <span className="pl-4 text-sm font-medium tracking-wide">Get in touch</span>
              <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </button>
          </div>

          {/* Cards & Image Row */}
          <div className="flex flex-col lg:flex-row items-end gap-6 md:gap-8">

            {/* Left: Logo & Vision/Mission Cards */}
            <div className="flex flex-col gap-6 w-full lg:w-1/2">
              
              <div className="w-48 md:w-64 lg:w-72 h-16 md:h-20 lg:h-24 overflow-hidden relative mt-4 md:mt-0 opacity-10">
                <img src="/mrc_logo.png" alt="MRC Logo" className="absolute top-1/2 left-0 w-full -translate-y-1/2 invert" />
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">

              {/* Vision Card */}
              <div className="bg-[#2c52a1]/75 rounded-[2rem] p-6 md:p-8 flex-1 flex flex-col hover:bg-[#2c52a1]/80 transition-colors">
                <div className="bg-white text-[#2c52a1] w-10 h-10 rounded-full flex items-center justify-center mb-6 shadow-sm text-lg">
                  ✦
                </div>
                <h4 className="text-md font-bold uppercase tracking-wider text-white mb-3">Vision</h4>
                <p className="text-md text-white/80 leading-relaxed font-medium">
                  To shape the built environment through engineering excellence, responsible construction practices, and enduring partnerships that stand the test of time.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-[#2c52a1]/75 rounded-[2rem] p-6 md:p-8 flex-1 flex flex-col hover:bg-[#2c52a1]/80 transition-colors">
                <div className="bg-white text-[#2c52a1] w-10 h-10 rounded-full flex items-center justify-center mb-6 shadow-sm text-lg">
                  ✧
                </div>
                <h4 className="text-md font-bold uppercase tracking-wider text-white mb-3">Mission</h4>
                <p className="text-md text-white/80 leading-relaxed font-medium">
                  To deliver construction solutions that combine technical expertise, operational excellence, and uncompromising quality.
                </p>
              </div>

            </div>
            </div>

            {/* Right: Image */}
            <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden h-[400px] lg:h-[550px] shadow-lg">
              <img src="/infosys_hubli.webp" alt="Engineering Excellence" className="absolute inset-0 w-full h-full object-cover" />
            </div>

          </div>
        </div>
      </div>

      {/* Why MRC Section - Layered Parallax Layout */}
      <div ref={sectionRef} className="relative w-[95vw] md:w-[90vw] max-w-[1800px] mx-auto rounded-[1.5rem] md:rounded-[3rem] overflow-hidden min-h-[920px] sm:min-h-[800px] lg:min-h-[800px] mb-24 shadow-2xl flex flex-col justify-start bg-[#e6e4e0] z-30 pb-32 lg:pb-0">

          {/* Layer 1: Background Image */}
          <img src="/temple_bg.png" alt="Archaeological Site Background" className="absolute inset-0 w-full h-full object-cover object-[50%_100%] z-0" />

          {/* Layer 2: Content (Title and Cards) */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-start justify-between px-4 sm:px-8 md:px-16 pt-8 md:pt-12 lg:pt-16 gap-6 md:gap-8">

            {/* Left: Hero Title */}
            <div className="w-full lg:w-5/12 flex flex-col items-start z-10">
              <h2 className="text-5xl sm:text-6xl md:text-[5.5rem] font-medium text-[#f2f2f2] leading-[0.9] tracking-tighter uppercase w-full">
                Why MRC
              </h2>
              <div className="ml-1 sm:ml-2 mt-4 flex flex-row flex-wrap gap-2 md:gap-4 uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs font-bold items-center">
                 <span className="bg-white text-[#2d2d2d] px-5 py-2.5 rounded-full shadow-md">Excellence</span>
                 <span className="bg-white text-[#2d2d2d] px-5 py-2.5 rounded-full shadow-md">Quality</span>
                 <span className="bg-white text-[#2d2d2d] px-5 py-2.5 rounded-full shadow-md">Trust</span>
              </div>
            </div>

            {/* Right: The Cards inside a beautiful glass/white container */}
            <div ref={cardsRef} className="w-full lg:w-7/12 bg-white/95 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl relative lg:-mr-8 z-10 flex flex-col border border-white/20 mt-2 lg:mt-0 h-auto lg:min-h-[700px] pb-24 sm:pb-32 md:pb-40 lg:pb-16">
              <h3 className="text-md sm:text-md md:text-4xl text-[#2d2d2d] font-bold mb-5 md:mb-8 leading-tight">Uncompromising standards & precision</h3>

              {/* The 8 points in a 2-col grid */}
              <div ref={pointsRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6">
                {[
                  "Two Decades of Proven Expertise",
                  "ISO-Certified Quality Systems",
                  "End-to-End Construction Capabilities",
                  "Government & Private Sector Experience",
                  "Precision-Driven Project Management",
                  "Design, Civil, Infrastructure, Finishing & MEP Excellence",
                  "Safety-Led Execution",
                  "Timely Delivery. Lasting Value"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start md:items-center gap-3 md:gap-4">
                    <span className="text-[#2052a1] shrink-0 text-xs md:text-base mt-1 md:mt-0">✦</span>
                    <span className="text-[#2d2d2d] font-bold text-sm md:text-lg leading-snug md:leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Layer 3: Foreground Image */}
          <img src="/temple_fg.png" alt="Archaeological Site Foreground" className="absolute inset-0 w-full h-full object-cover object-[50%_100%] pointer-events-none z-20" />
        </div>

        {/* Core Values & Ethics Section (Full Width) */}
        <div className="relative w-full overflow-hidden min-h-[800px] lg:min-h-[900px] flex flex-col justify-center bg-gray-900 z-30">
          
          {/* Background Image */}
          <img 
            src="/commercial/infosys/INFOSYS%20HUBLI50.webp" 
            alt="Infosys Hubli Background" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
          
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>

          <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 py-24">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              
              {/* Column 1: Title & Card 2 */}
              <div className="flex flex-col justify-between gap-12 lg:gap-32">
                <div className="text-white pt-4">
                  <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tighter uppercase drop-shadow-lg">
                    Core Values <br className="hidden lg:block"/> & Ethics
                  </h2>
                  <div className="mt-8 w-24 h-1 bg-[#cca164]"></div>
                </div>
                
                <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/20 hover:bg-white transition-colors duration-300">
                  <div className="text-sm md:text-xl text-[#1a1a1a] font-medium leading-relaxed space-y-2">
                    <p>
                      We are committed to maintaining the highest standards of professionalism, ethics, and transparency across all aspects of our business.
                    </p>
                    <p>
                      Our reputation has been earned through consistent delivery, uncompromising quality, and a client-centric approach that fosters lasting relationships built on trust.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2: Card 1 */}
              <div className="flex flex-col justify-center lg:pt-32">
                <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/20 hover:bg-white transition-colors duration-300">
                  <div className="text-sm md:text-xl text-[#1a1a1a] font-medium leading-relaxed space-y-2">
                    <p>
                      At MRC Construction Company, our foundation is built on the enduring principles of quality, integrity, and unwavering commitment.
                    </p>
                    <p>
                      These values were established by our founder, Mr.&nbsp;M.&nbsp;Ramesh Reddy, and are upheld in every project we undertake.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 3: Card 3 */}
              <div className="flex flex-col justify-end lg:pb-12">
                <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/20 hover:bg-white transition-colors duration-300">
                  <div className="text-sm md:text-xl text-[#1a1a1a] font-medium leading-relaxed space-y-2">
                    <p>
                      Integrity is not merely a principle we follow—it is the cornerstone of every decision we make.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

    </div>
  );
}
