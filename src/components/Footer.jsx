import React from 'react';
import { Link } from 'react-router-dom';

const linkColumns = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' }
    ]
  },
  {
    heading: 'Portfolio',
    links: [
      { label: 'All Projects', href: '/portfolio' },
      { label: 'Hospitals', href: '/portfolio#hospitals' },
      { label: 'Commercial', href: '/portfolio#commercial' },
      { label: 'Educational Institutions', href: '/portfolio#educational-institutions' }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#16264c] text-white pt-16 sm:pt-20 md:pt-24 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">

          {/* Left Side */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              Building Excellence™
            </h4>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 pl-6 pr-2 py-2 w-fit rounded-full bg-white text-[#16264c] hover:bg-gray-200 transition-colors duration-300 cursor-pointer group shadow-lg mb-8"
            >
              <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                Enquire Now
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#16264c] text-white shrink-0 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Right Side: Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 sm:gap-x-16 lg:gap-x-24">
            {linkColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-xl md:text-2xl font-medium tracking-tight text-gray-100 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Info Column */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
                Contact
              </h4>
              <div className="flex flex-col gap-4">
                <div>
                  <h5 className="text-blue-200/70 mb-1 text-xs font-medium">Head Office</h5>
                  <p className="font-semibold text-gray-200 leading-relaxed text-sm">
                    Ub Seer, 1st Floor, Southend Circle,<br />
                    No. 12, Pattalamma Temple Rd, Basavanagudi,<br />
                    Bengaluru, Karnataka 560004
                  </p>
                </div>
                <div>
                  <h5 className="text-blue-200/70 mb-1 text-xs font-medium">Email Us</h5>
                  <a href="mailto:mrcons.office@gmail.com" className="font-semibold text-gray-200 hover:text-white transition-colors text-sm">
                    mrcons.office@gmail.com
                  </a>
                </div>
                <div>
                  <h5 className="text-blue-200/70 mb-1 text-xs font-medium">Call Us</h5>
                  <a href="tel:+919148581550" className="font-semibold text-gray-200 hover:text-white transition-colors text-sm whitespace-nowrap">
                    +91 9148581550 / 9148581560
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Giant Wordmark */}
        <div
          className="overflow-hidden h-14 sm:h-20 md:h-28 lg:h-32 mt-10 sm:mt-8 md:-mt-8"
          style={{ aspectRatio: '983 / 337' }}
        >
          <img src="/mrc_logo.png" alt="M R Constructions" className="w-full h-full object-cover object-center brightness-0 invert" />
        </div>

        {/* Bottom Links */}
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-2 text-[10px] sm:text-[11px] text-gray-400 font-medium items-center justify-center lg:justify-between w-full text-center mt-10 pt-6 border-t border-white/10">
          <div className="flex-shrink-0">
            <Link to="/" className="hover:text-white transition-colors">MR Constructions</Link>
          </div>

          <div className="flex-shrink-0">
            <span>Copyright &copy; {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
