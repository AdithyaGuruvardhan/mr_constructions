import HeroScrollVideo from './components/HeroScrollVideo'
import AboutSection from './components/AboutSection'
import ProcessSection from './components/ProcessSection'
import PortfolioSection from './components/PortfolioSection'
import ClienteleSection from './components/ClienteleSection'
import ServicesSection from './components/ServicesSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import InspiringDesignSection from './components/InspiringDesignSection'
import ProjectShowcase from './components/ProjectShowcase'
import LakeDevelopmentShowcase from './components/LakeDevelopmentShowcase'
import HubliSchoolShowcase from './components/HubliSchoolShowcase'
import SchoolInfrastructureFocus from './components/SchoolInfrastructureFocus'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'

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

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Clientele Section */}
      <ClienteleSection />

      {/* Featured Project Showcase (Scroll Animation) */}
      <ProjectShowcase />

      <LakeDevelopmentShowcase />
      <HubliSchoolShowcase />
      <SchoolInfrastructureFocus />

      {/* Inspiring Design (Temple Layout) */}
      <InspiringDesignSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
