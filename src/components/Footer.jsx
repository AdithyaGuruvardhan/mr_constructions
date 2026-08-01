import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#18181b] text-white pt-24 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-16 lg:mb-24">
          
          {/* Left Side */}
          <div className="lg:w-1/2 flex flex-col justify-between mb-16 lg:mb-0">
            <div className="mb-20">
              <h2 className="text-3xl font-medium mb-10">Subscribe to our Newsletter!</h2>
              <div className="relative max-w-md border-b border-gray-500 pb-3 group">
                <input 
                  type="email" 
                  placeholder="Enter address" 
                  className="bg-transparent w-full text-gray-300 text-sm outline-none placeholder-gray-500 pr-10"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white group-hover:translate-x-1 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
              <div>
                <h4 className="text-gray-500 mb-4 font-medium">Head Office</h4>
                <p className="font-semibold text-gray-200 leading-relaxed text-sm">
                  No.16/1, 1st Main, 2nd Floor,<br/>
                  VR Layout, Basavanagudi,<br/>
                  Bangalore-560004 Karnataka
                </p>
              </div>
              <div>
                <h4 className="text-gray-500 mb-4 font-medium">Email Us</h4>
                <a href="mailto:mrcons.office@gmail.com" className="font-semibold text-gray-200 hover:text-white transition-colors text-sm">
                  mrcons.office@gmail.com
                </a>
              </div>
              <div>
                <h4 className="text-gray-500 mb-4 font-medium">Call Us</h4>
                <a href="tel:+919148581550" className="font-semibold text-gray-200 hover:text-white transition-colors text-sm whitespace-nowrap">
                  +91 9148581550 / 9148581560
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-5/12 flex flex-row justify-between lg:justify-end lg:gap-32">
            <ul className="space-y-5 text-2xl lg:text-3xl font-medium tracking-tight">
              <li><Link to="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link to="/#services" className="hover:text-gray-300 transition-colors">Services</Link></li>
              <li><Link to="/#portfolio" className="hover:text-gray-300 transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
            </ul>
            
            <ul className="space-y-6 text-sm font-medium pt-1.5">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Youtube</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Linkedin</a></li>
            </ul>
          </div>

        </div>

        {/* Large Logo */}
        <div className="mb-6 w-full overflow-hidden">
           {/* We use SVG text to ensure it scales perfectly and fills width like in the image */}
           <svg viewBox="0 0 1000 160" className="w-full h-auto fill-white">
             <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                   className="font-black" style={{ fontSize: '105px', letterSpacing: '-0.02em' }}>
               MR CONSTRUCTION
             </text>
           </svg>
        </div>
        
        {/* Bottom Links */}
        <div className="flex flex-col xl:flex-row flex-wrap gap-x-8 gap-y-4 text-[11px] text-gray-500 font-medium">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy policy</a>
          </div>
          <div className="xl:ml-auto flex gap-6">
            <span>MR Constructions</span>
            <span>Copyright &copy; {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
