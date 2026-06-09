import React from 'react';
import Header from './Header';
// 1. Import HomeTwo here
import HomeTwo from './HomeTwo'; 
import build from '../assets/building.svg'; 

// Import the service icons
import service1 from '../assets/service.png';
import service2 from '../assets/service 2.png';
import service3 from '../assets/service 3.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #1a1a1a 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <Header />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 md:px-16 lg:px-24 pt-40 pb-16 lg:pt-32 lg:pb-0">
        
        {/* Left Side: Typography & Call to Action */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center space-y-6 lg:space-y-8 mt-12 lg:mt-0 order-2 lg:order-1">
          
          {/* Main Heading matched exactly to Figma Specs */}
          <h1 
            className="text-4xl md:text-6xl lg:text-[107px] font-normal leading-[1.04] tracking-[-0.04em] text-white" 
            style={{ fontFamily: '"EB Garamond", Garamond, serif' }}
          >
            Design. Build.<br />Interior. All In<br />
            {/* The span "One Place." has different font, weight, and is italicized */}
            <span 
              className="font-medium italic" 
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              One Place.
            </span>
          </h1>

          {/* APPLIED GLOBAL: font-jakarta */}
          <p className="text-gray-400 max-w-lg text-sm md:text-base leading-relaxed font-light font-jakarta">
            Sina Structural Plan is the zenith of prestigious designer Sina Sadeddin's times of involvement making excellent private homes. Established in 2004.
          </p>
          
          {/* APPLIED GLOBAL: font-garamond */}
          <button className="bg-[#007b80] hover:bg-[#006064] text-white py-3 px-8 rounded-sm transition-all duration-300 flex items-center group shadow-lg font-garamond text-lg font-normal tracking-wide">
            Contact Now 
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>

        {/* Right Side: Building SVG */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end order-1 lg:order-2">
          <img
            src={build}
            alt="Wireframe Building"
            className="w-full max-w-md lg:max-w-2xl object-contain drop-shadow-2xl"
          />
        </div>
      </main>

      {/* Our Services Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-20 bg-black">
        {/* APPLIED GLOBAL: font-grotesk */}
        <h2 className="text-3xl lg:text-4xl font-grotesk text-white mb-12">Our Services</h2>
        
        {/* Grid layout with dividers matching the Figma boundaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#1a1a1a] divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a]">
          
          {/* Service 1: Architectural Design */}
          <div className="p-8 lg:p-12 hover:bg-[#0a0a0a] transition-colors duration-300">
            <img src={service1} alt="Architectural Design Icon" className="h-10 w-10 mb-8 object-contain" />
            {/* APPLIED GLOBAL: font-grotesk */}
            <h3 className="text-xl font-medium text-white mb-4 font-grotesk">Architectural Design</h3>
            {/* APPLIED GLOBAL: font-jakarta */}
            <p className="text-gray-400 text-[15px] leading-relaxed font-jakarta">
              Our architectural design ethos integrates innovation, sustainability, and client satisfaction from inception to realization. Our architectural design ethos integrates innovation, sustainability, and client satisfaction from inception to realization.
            </p>
          </div>

          {/* Service 2: Interior Design */}
          <div className="p-8 lg:p-12 hover:bg-[#0a0a0a] transition-colors duration-300">
            <img src={service2} alt="Interior Design Icon" className="h-10 w-10 mb-8 object-contain" />
            {/* APPLIED GLOBAL: font-grotesk */}
            <h3 className="text-xl font-medium text-white mb-4 font-grotesk">Interior Design</h3>
            {/* APPLIED GLOBAL: font-jakarta */}
            <p className="text-gray-400 text-[15px] leading-relaxed font-jakarta">
              Elevate your interior spaces with our bespoke design service tailored to your unique style and needs. Our architectural design ethos integrates innovation, sustainability, and client satisfaction from inception to realization.
            </p>
          </div>

          {/* Service 3: Build */}
          <div className="p-8 lg:p-12 hover:bg-[#0a0a0a] transition-colors duration-300">
            <img src={service3} alt="Build Icon" className="h-10 w-10 mb-8 object-contain" />
            {/* APPLIED GLOBAL: font-grotesk */}
            <h3 className="text-xl font-medium text-white mb-4 font-grotesk">Build</h3>
            {/* APPLIED GLOBAL: font-jakarta */}
            <p className="text-gray-400 text-[15px] leading-relaxed font-jakarta">
              From landscaping to architectural detailing, our exterior design service crafts outdoor spaces that captivate. Our architectural design ethos integrates innovation, sustainability, and client satisfaction from inception to realization.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Add HomeTwo right after the Services section finishes */}
      <HomeTwo />
      
    </div>
  );
};

export default Home;