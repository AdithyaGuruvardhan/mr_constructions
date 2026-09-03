import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CardNav from './components/CardNav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Portfolio from './pages/Portfolio'
import Commercial from './pages/Commercial'
import Education from './pages/Education'
import Hospitals from './pages/Hospitals'
import ArchaeologicalDevelopments from './pages/ArchaeologicalDevelopments'
import ProjectDetails from './pages/ProjectDetails'
import Certificates from './pages/Certificates'

const navItems = [
  {
    label: 'Navigate',
    bgColor: '#f4f4f5',
    textColor: '#18181b',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' }
    ]
  },
  {
    label: 'Company',
    bgColor: '#e4e4e7',
    textColor: '#18181b',
    links: [
      { label: 'Safety', href: '/safety' },
      { label: 'Careers', href: '/careers' },
      { label: 'Awards', href: '/awards' },
      { label: 'Certificates', href: '/certificates' }
    ]
  },
  {
    label: 'Portfolio',
    bgColor: '#d4d4d8',
    textColor: '#18181b',
    twoCols: true,
    links: [
      { label: 'All Projects', href: '/portfolio' },
      { label: 'Hospitals', href: '/portfolio#hospitals' },
      { label: 'Commercial', href: '/portfolio#commercial' },
      { label: 'Archaeological Developments', href: '/portfolio#archaeological-developments' },
      { label: 'Educational Institutions', href: '/portfolio#educational-institutions' },
      { label: 'Roads & Infrastructure', href: '/portfolio#roads-&-infrastructure' },
      { label: 'Government Projects', href: '/portfolio#government-projects' },
      { label: 'Ongoing Projects', href: '/portfolio#ongoing-projects' }
    ]
  }
];

function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#2c52a1] selection:text-white flex flex-col">
      <ScrollToTop />
      <CardNav 
        logo="/mrc_blue_logo.png"
        logoAlt="MR Constructions Logo"
        items={navItems}
        baseColor="rgba(255, 255, 255, 0.95)"
        menuColor="#4b4b4b"
        buttonBgColor="#2c52a1"
        buttonTextColor="#fff"
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetails />} />
          <Route path="/portfolio/commercial" element={<Commercial />} />
          <Route path="/portfolio/education" element={<Education />} />
          <Route path="/portfolio/hospitals" element={<Hospitals />} />
          <Route path="/portfolio/archaeological-developments" element={<ArchaeologicalDevelopments />} />
          <Route path="/certificates" element={<Certificates />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
