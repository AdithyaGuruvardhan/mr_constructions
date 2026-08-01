import HeroScrollVideo from '../components/HeroScrollVideo'
import AboutSection from '../components/AboutSection'
import ProcessSection from '../components/ProcessSection'
import PortfolioSection from '../components/PortfolioSection'
import ClienteleSection from '../components/ClienteleSection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import InspiringDesignSection from '../components/InspiringDesignSection'
import ProjectShowcase from '../components/ProjectShowcase'
import LakeDevelopmentShowcase from '../components/LakeDevelopmentShowcase'
import HubliSchoolShowcase from '../components/HubliSchoolShowcase'
import SchoolInfrastructureFocus from '../components/SchoolInfrastructureFocus'
import FAQSection from '../components/FAQSection'
import TestimonialsSection from '../components/TestimonialsSection'

export default function Home() {
  return (
    <div className="w-full">
      {/* The Scroll-Driven Video Hero */}
      <HeroScrollVideo />

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Process / Execution Section */}
      <ProcessSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Clientele Section */}
      <section id="clients">
        <ClienteleSection />
      </section>

      {/* Featured Project Showcase (Scroll Animation) */}
      <section id="portfolio">
        <ProjectShowcase />
        <LakeDevelopmentShowcase />
        <HubliSchoolShowcase />
        <SchoolInfrastructureFocus />
      </section>

      {/* Inspiring Design (Temple Layout) */}
      <InspiringDesignSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}
