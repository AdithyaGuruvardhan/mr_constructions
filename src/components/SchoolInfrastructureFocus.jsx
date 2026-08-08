import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SchoolInfrastructureFocus() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);

  useGSAP(() => {
    // Image container reveal mask from bottom to top
    gsap.fromTo(imageContainerRef.current, 
      { clipPath: "inset(100% 0% 0% 0%)" },
      { 
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtle scale down effect on the image itself
    gsap.fromTo(imageRef.current,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white text-[#2d2d2d] py-16 md:py-0 md:h-[80vh] lg:h-[90vh] w-full relative border-t border-gray-100">
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 px-6 md:px-12 lg:px-20 mx-auto max-w-[1800px]">
        
        {/* Left Column - Large Typography (Aligned to bottom end) */}
        <div className="w-full md:w-1/3 h-full flex flex-col justify-end z-10 order-1">
          <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] xl:text-[4rem] leading-[1.05] md:mb-2 lg:mb-4 font-light tracking-tight text-left">
            <span className="italic font-serif">INSPIRING</span><br />
            DESIGN<br />
            <span className="italic font-serif">WELLNESS-</span><br />
            FOCUSED<br />
            LEARNING
          </h2>
        </div>

        {/* Center Column - Image (Reduced size, vertically centered) */}
        <div className="w-full md:w-1/3 h-full flex items-center justify-center order-2 md:px-6">
          <div 
            ref={imageContainerRef}
            className="w-full h-[50vh] md:h-[75%] relative overflow-hidden flex-shrink-0 rounded-2xl shadow-sm"
          >
            <img 
              ref={imageRef}
              src="/hubli_school_vert.webp" 
              alt="School Infrastructure" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right Column - Text Description (Aligned to top) */}
        <div className="w-full md:w-1/3 h-full flex flex-col justify-start md:pt-8 lg:pt-18 md:pl-10 lg:pl-16 z-10 order-3">
          <div className="max-w-[280px] lg:max-w-[320px] space-y-8 text-sm md:text-base text-gray-500 font-light leading-relaxed">
            <p>
              Our approach to educational infrastructure reflects a commitment to excellence. From the timeless elegance of its architecture to the thoughtfully curated learning environments, the campus embodies a holistic approach to student well-being.
            </p>
            <p>
              Whether you're seeking a serene study retreat, a vibrant collaborative hub, or a space that fosters personal development, our infrastructure offers a robust foundation for success.
            </p>

            <div className="w-full flex justify-end mt-12 md:pr-4">
              {/* Small View Project Badge */}
              <Link to="/portfolio/e2" className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 group">
                <span className="absolute text-[8px] md:text-[9px] font-semibold uppercase tracking-widest text-[#2d2d2d] text-center z-10 group-hover:text-[#ff761f] transition-colors duration-300">
                  View<br />Project
                </span>
                <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
                  <path id="circlePathFocus" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
                  <text>
                    <textPath href="#circlePathFocus" startOffset="0" className="text-[9px] font-medium tracking-[0.18em] fill-[#2d2d2d]/60 uppercase">
                      EXPLORE • DISCOVER • EXPLORE • DISCOVER
                    </textPath>
                  </text>
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
