import React from 'react';
import { T, EditableImg, useList, ItemTools, AddImageItem } from '../content/editable';

const logosRow1 = [
  { src: '/clients/infosys.webp', alt: 'Infosys' },
  { src: '/clients/namma_metro.webp', alt: 'Namma Metro' },
];

const logosRow2 = [
  { src: '/clients/Infosys%20Foundation.png', alt: 'Infosys Foundation' },
  { src: '/clients/elcita.webp', alt: 'Elcita' },
  { src: '/clients/elcia.webp', alt: 'Elcia' },
];

const logosRow3 = [
  { src: '/clients/aqua.png', alt: 'Aqua' },
  { src: '/clients/deshpande.png', alt: 'Deshpande' },
  { src: '/clients/gail.png', alt: 'GAIL' },
  { src: '/clients/ntpc.png', alt: 'NTPC' },
  { src: '/clients/pc.png', alt: 'PC' },
  { src: '/clients/jvhvb.png', alt: 'Jvhvb' },
];

const logosRow4 = [
  { src: '/clients/bsr-infratech.webp', alt: 'BSR Infratech' },
  { src: '/clients/ramakrishna-sevashrama-pavagada.webp', alt: 'Ramakrishna Sevashrama Pavagada' },
  { src: '/clients/murthy%20fouyndation.png', alt: 'Murthy Foundation' },
];

const allLogos = [...logosRow1, ...logosRow2, ...logosRow3, ...logosRow4];

export default function ClienteleSection() {
  const logos = useList('home.clientele.logos', allLogos);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden w-full flex flex-col items-center">

      <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
        {/* Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-[2.75rem] font-medium text-[#2c52a1] mb-4 leading-tight">
            <T k="home.clientele.title">Trusted By Leaders</T>
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg max-w-2xl mx-auto">
            <T k="home.clientele.subtitle">The prominent organizations that have entrusted us with their landmark projects.</T>
          </p>
        </div>
      </div>

      {/* Desktop View: Full-width wrapping rows (3 per row on tablet, 6 on desktop), with any partial last row centered */}
      <div className="hidden md:flex w-full flex-wrap justify-center gap-6 lg:gap-8 px-6 lg:px-10">
        {logos.items.map((logo, index) => (
          <div
            key={`logo-${index}`}
            className="relative w-[calc((100%-3rem)/3)] lg:w-[calc((100%-10rem)/6)] h-32 bg-[#e2e2e2] rounded-[1.5rem] flex items-center justify-center p-2 shadow-sm overflow-hidden transition-transform hover:scale-105"
          >
            <ItemTools list={logos} index={index} className="top-1 right-1" />
            <EditableImg src={logo.src} onChange={v => logos.update(index, { src: v })} folder="clients" alt={logo.alt} className="w-full h-full object-contain filter transition-all duration-300" />
          </div>
        ))}
        <AddImageItem label="Add logo" folder="clients" className="h-32" onAdd={url => logos.add({ src: url, alt: 'Client logo' })} />
      </div>

      {/* Mobile View: Static Flex Grid */}
      <div className="flex md:hidden w-full px-6 flex-wrap justify-center gap-3">
        {logos.items.map((logo, index) => (
          <div
            key={`mobile-${index}`}
            className="w-[calc(50%-0.5rem)] h-24 bg-[#e2e2e2] rounded-[1rem] flex items-center justify-center p-1 shadow-sm overflow-hidden"
          >
            <EditableImg src={logo.src} onChange={v => logos.update(index, { src: v })} folder="clients" alt={logo.alt} className="w-full h-full object-contain scale-125" />
          </div>
        ))}
      </div>
    </section>
  );
}
