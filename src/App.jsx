import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Portfolio from './pages/Portfolio'
import Commercial from './pages/Commercial'
import Education from './pages/Education'
import Hospitals from './pages/Hospitals'
import Temples from './pages/Temples'
import ProjectDetails from './pages/ProjectDetails'

function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#ff761f] selection:text-white flex flex-col">
      <ScrollToTop />
      <Header />
      
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
          <Route path="/portfolio/temples" element={<Temples />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
