import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#2c2d3c] text-white pt-24 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-16 lg:mb-24">

          {/* Left Side */}
          <div className="lg:w-1/2 flex flex-col justify-between mb-16 lg:mb-0">
            <div className="mb-20">
              <img src="/mrc_logo.png" alt="M R Constructions Logo" className="w-64 h-24 md:w-80 md:h-32 lg:w-96 lg:h-40 object-cover object-center brightness-0 invert" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
              <div>
                <h4 className="text-gray-500 mb-4 font-medium">Head Office</h4>
                <p className="font-semibold text-gray-200 leading-relaxed text-sm">
                  No.16/1, 1st Main, 2nd Floor,<br />
                  VR Layout, Basavanagudi,<br />
                  Bengaluru-560004 Karnataka
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
              <li><Link to="/portfolio" className="hover:text-gray-300 transition-colors">Portfolio</Link></li>
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



        {/* Bottom Links */}
        <div className="flex flex-col xl:flex-row flex-wrap gap-y-6 text-[11px] text-gray-500 font-medium items-start xl:items-center justify-between w-full">
          <div className="flex flex-wrap gap-x-6 gap-y-2 w-full xl:w-1/3 xl:justify-start">
            <Link to="/" className="hover:text-gray-300 transition-colors">MR Constructions</Link>
          </div>

          <div className="w-full xl:w-1/3 flex justify-start xl:justify-center">
            <span className="italic">Designed and developed by <a href="https://www.buzziwah.com/" target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white transition-colors underline decoration-white/30 hover:decoration-white/80 underline-offset-2 font-semibold">Buzziwah</a> 💜</span>
          </div>

          <div className="flex gap-6 w-full xl:w-1/3 justify-start xl:justify-end">
            <span>Copyright &copy; {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
