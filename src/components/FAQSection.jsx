import React, { useState } from 'react';

const faqs = [
  {
    question: "What types of construction projects do you specialize in?",
    answer: "We specialize in a wide range of projects including commercial buildings, educational institutions, heritage restorations, lake developments, and large-scale residential complexes. Our diverse portfolio demonstrates our capability to handle complex engineering challenges."
  },
  {
    question: "Do you handle both design and construction?",
    answer: "Yes, we offer comprehensive turnkey solutions. From initial architectural planning and structural design to the final execution and finishing, we manage the entire lifecycle of the project to ensure seamless delivery."
  },
  {
    question: "How do you ensure quality and safety on your sites?",
    answer: "Quality and safety are our highest priorities. We employ rigorous quality control protocols, use premium materials, and adhere to strict safety standards on all our sites. Regular audits and continuous training ensure a safe environment for everyone."
  },
  {
    question: "How can I request a quote or consultation for my project?",
    answer: "You can reach out to us via our contact form, email, or phone. Our team will schedule an initial consultation to understand your requirements, after which we will provide a detailed proposal and estimated timeline for your project."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-white pt-32 pb-16 md:pt-[14rem] md:pb-12 overflow-hidden font-sans">
      
      {/* Massive Background Watermark */}
      <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[8vw] leading-none font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-20 opacity-80 whitespace-nowrap">
          FAQs
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="w-[2px] h-16 md:h-20 bg-[#ff761f] mb-8"></div>
          <p className="text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl mx-auto">
            Find answers to common questions about our construction process, capabilities, and quality assurance.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 transition-all duration-300`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
              >
                <h3 className={`text-lg md:text-xl font-medium pr-8 transition-colors duration-300 ${openIndex === index ? 'text-[#ff761f]' : 'text-[#2d2d2d] group-hover:text-[#ff761f]'}`}>
                  {faq.question}
                </h3>
                <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${openIndex === index ? 'border-[#ff761f] bg-[#ff761f] text-white rotate-45' : 'border-gray-300 text-gray-500 group-hover:border-[#ff761f] group-hover:text-[#ff761f]'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed pr-12">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
