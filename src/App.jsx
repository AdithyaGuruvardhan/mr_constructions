import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'

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
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
