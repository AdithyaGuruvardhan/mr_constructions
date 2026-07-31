import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#131b2c] text-white pt-24 pb-12 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-2">
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-none mb-6">
              M R <br/>Constructions
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
              Delivering excellence in construction and engineering for over 17 years. From state-of-the-art medical facilities to sacred heritage restorations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-widest mb-6 text-[#ff761f]">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-widest mb-6 text-[#ff761f]">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm md:text-base">
              <li>
                <strong>Address:</strong><br/>
                No 123, Buildcon Avenue, 4th Block,<br/>
                Bangalore, Karnataka 560001
              </li>
              <li>
                <strong>Phone:</strong><br/>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li>
                <strong>Email:</strong><br/>
                <a href="mailto:info@mrconstructions.com" className="hover:text-white transition-colors">info@mrconstructions.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-800 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} M R Constructions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
