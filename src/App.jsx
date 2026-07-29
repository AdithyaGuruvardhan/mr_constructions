import HeroScrollVideo from './components/HeroScrollVideo'
import AboutSection from './components/AboutSection'
import ProcessSection from './components/ProcessSection'
import PortfolioSection from './components/PortfolioSection'
import ClienteleSection from './components/ClienteleSection'
import ServicesSection from './components/ServicesSection'
import ProjectShowcase from './components/ProjectShowcase'
import LakeDevelopmentShowcase from './components/LakeDevelopmentShowcase'
import HubliSchoolShowcase from './components/HubliSchoolShowcase'

function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#ff761f] selection:text-white">
      {/* The Scroll-Driven Video Hero */}
      <HeroScrollVideo />

      {/* About Section */}
      <AboutSection />

      {/* Process / Execution Section */}
      <ProcessSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Portfolio / Works Section */}
      {/* <PortfolioSection /> */}

      {/* Clientele Section */}
      <ClienteleSection />

      {/* Featured Project Showcase (Scroll Animation) */}
      <ProjectShowcase />

      <LakeDevelopmentShowcase />
      <HubliSchoolShowcase />

      {/* Outro section */}
      <section className="h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white border-t border-gray-100">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#2d2d2d]">
          Ready to start your project?
        </h2>
        <button className="px-8 py-4 bg-[#ff761f] text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-lg cursor-pointer">
          Contact Us
        </button>
      </section>
    </div>
  )
}

export default App
