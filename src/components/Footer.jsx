import React from 'react';
import { Link } from 'react-router-dom';
import { T, Editable, useField, LinkEdit, AddItem, EditOnly } from '../content/editable';

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
  const [columns, setColumns] = useField('footer.columns', linkColumns);
  const [email] = useField('company.email', 'mrcons.office@gmail.com');
  const [phone] = useField('company.phone', '+91 9148581550 / 9148581560');
  const [enquireLink, setEnquireLink] = useField('footer.buttonLink', '/contact');

  const updateLink = (ci, li, patch) => setColumns(columns.map((col, i) => i !== ci ? col : { ...col, links: col.links.map((l, j) => (j === li ? { ...l, ...patch } : l)) }));
  const removeLink = (ci, li) => setColumns(columns.map((col, i) => i !== ci ? col : { ...col, links: col.links.filter((_, j) => j !== li) }));
  const addLink = (ci) => setColumns(columns.map((col, i) => i !== ci ? col : { ...col, links: [...col.links, { label: 'New link', href: '/' }] }));

  return (
    <footer className="w-full bg-[#16264c] text-white pt-16 sm:pt-20 md:pt-24 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">

          {/* Left Side */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              <T k="footer.tagline">Building Excellence™</T>
            </h4>

            <Link
              to={enquireLink}
              className="relative inline-flex items-center gap-3 pl-6 pr-2 py-2 w-fit rounded-full bg-white text-[#16264c] hover:bg-gray-200 transition-colors duration-300 cursor-pointer group shadow-lg mb-8"
            >
              <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                <T k="footer.button">Enquire Now</T>
              </span>
              <LinkEdit value={enquireLink} onChange={setEnquireLink} />
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#16264c] text-white shrink-0 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Right Side: Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 sm:gap-x-16 lg:gap-x-24">
            {columns.map((col, ci) => (
              <div key={ci}>
                <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
                  <Editable value={col.heading} onChange={v => setColumns(columns.map((c, i) => (i === ci ? { ...c, heading: v } : c)))} />
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link, li) => (
                    <li key={li} className="relative">
                      <Link to={link.href} className="text-xl md:text-2xl font-medium tracking-tight text-gray-100 hover:text-white transition-colors">
                        <Editable value={link.label} onChange={v => updateLink(ci, li, { label: v })} />
                      </Link>
                      <EditOnly>
                        <span className="ml-2 inline-flex gap-1 align-middle">
                          <LinkEdit value={link.href} onChange={v => updateLink(ci, li, { href: v })} className="!static" />
                          <button type="button" className="mrc-tool-btn !bg-red-600" onClick={() => removeLink(ci, li)}>✕</button>
                        </span>
                      </EditOnly>
                    </li>
                  ))}
                </ul>
                <AddItem label="Add link" className="mt-4" onAdd={() => addLink(ci)} />
              </div>
            ))}

            {/* Contact Info Column */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">
                <T k="footer.contactHeading">Contact</T>
              </h4>
              <div className="flex flex-col gap-4">
                <div>
                  <h5 className="text-blue-200/70 mb-1 text-xs font-medium"><T k="footer.addressLabel">Head Office</T></h5>
                  <p className="font-semibold text-gray-200 leading-relaxed text-sm">
                    <T k="footer.address">{'Ub Seer, 1st Floor, Southend Circle,\nNo. 12, Pattalamma Temple Rd, Basavanagudi,\nBengaluru, Karnataka 560004'}</T>
                  </p>
                </div>
                <div>
                  <h5 className="text-blue-200/70 mb-1 text-xs font-medium"><T k="footer.emailLabel">Email Us</T></h5>
                  <a href={`mailto:${email.trim()}`} className="font-semibold text-gray-200 hover:text-white transition-colors text-sm">
                    <T k="company.email">mrcons.office@gmail.com</T>
                  </a>
                </div>
                <div>
                  <h5 className="text-blue-200/70 mb-1 text-xs font-medium"><T k="footer.phoneLabel">Call Us</T></h5>
                  <a href={`tel:${phone.split('/')[0].replace(/[^\d+]/g, '')}`} className="font-semibold text-gray-200 hover:text-white transition-colors text-sm whitespace-nowrap">
                    <T k="company.phone">+91 9148581550 / 9148581560</T>
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
            <Link to="/" className="hover:text-white transition-colors"><T k="footer.bottomName">MR Constructions</T></Link>
          </div>

          <div className="flex-shrink-0">
            <span>Copyright &copy; {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
