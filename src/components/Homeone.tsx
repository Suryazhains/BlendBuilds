import React, { useEffect } from 'react';
import Header from './Header';
import HomeTwo from './HomeTwo'; 

// Import the SVG as a React component
import Building from '../assets/Building.svg?react'; 

// Import the service icons
import service1 from '../assets/service.png';
import service2 from '../assets/service 2.png';
import service3 from '../assets/service 3.png';

// Import the background cover image
import heroBg from '../assets/BackgorundCover.png';

const Home: React.FC = () => {

  // THIS IS THE MAGIC: It measures every exact line and draws it like a video.
  useEffect(() => {
    const svg = document.querySelector('.building-svg');
    if (!svg) return;

    // Grab every single line, path, and shape inside the SVG
    const shapes = svg.querySelectorAll('path, line, polyline, rect');
    
    shapes.forEach((shape, index) => {
      const element = shape as SVGGeometryElement;
      
      // 1. Measure the exact mathematical length of this specific line
      const length = element.getTotalLength ? element.getTotalLength() : 1000;

      // 2. Set the dash array to match the exact length
      element.style.strokeDasharray = `${length}`;
      element.style.strokeDashoffset = `${length}`;

      // 3. Animate it perfectly.
      // Every line takes 2 seconds to draw, and the start times are staggered.
      element.animate([
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ], {
        duration: 2000, 
        delay: index * 200, // Staggers the drawing line-by-line
        fill: 'forwards',
        easing: 'ease-in-out'
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden">
      
      {/* INLINE CSS: We only handle colors here now, JavaScript handles the animation */}
      <style>{`
        .building-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .building-svg path, 
        .building-svg line, 
        .building-svg rect,
        .building-svg polyline {
          fill: none !important;
          stroke: #ffffff !important; /* The color of the lines */
          stroke-width: 0.3px !important; /* Thickness */
        }
      `}</style>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #1a1a1a 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <Header />

      {/* Hero Section */}
      <main className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 md:px-16 lg:px-24 pt-40 pb-16 lg:pt-32 lg:pb-0 overflow-hidden">
        
        {/* Absolute Background Image */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none z-0"
          style={{ 
            backgroundImage: `url(${heroBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        ></div>
        
        {/* Left Side: Typography */}
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-start justify-center space-y-6 lg:space-y-8 mt-12 lg:mt-0 order-2 lg:order-1">
          
          <h1 
            className="text-4xl md:text-6xl lg:text-[107px] font-normal leading-[1.04] tracking-[-0.04em] text-white" 
            style={{ fontFamily: '"EB Garamond", Garamond, serif' }}
          >
            Design. Build.<br />Interior. All In<br />
            <span 
              className="font-medium italic" 
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              One Place.
            </span>
          </h1>

          <p className="text-gray-400 max-w-lg text-sm md:text-base leading-relaxed font-light font-jakarta">
            Sina Structural Plan is the zenith of prestigious designer Sina Sadeddin's times of involvement making excellent private homes. Established in 2004.
          </p>
          
          <button className="bg-[#007b80] hover:bg-[#006064] text-white py-3 px-8 rounded-sm transition-all duration-300 flex items-center group shadow-lg font-garamond text-lg font-normal tracking-wide">
            Contact Now 
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>

        {/* Right Side: Building SVG */}
        <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center lg:justify-end order-1 lg:order-2 h-[400px] lg:h-[600px]">
          <Building className="building-svg w-full max-w-md lg:max-w-2xl object-contain drop-shadow-2xl" />
        </div>
      </main>

      {/* Our Services Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-20 bg-black">
        <h2 className="text-3xl lg:text-4xl font-grotesk text-white mb-12">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#1a1a1a] divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a]">
          
          <div className="p-8 lg:p-12 hover:bg-[#0a0a0a] transition-colors duration-300">
            <img src={service1} alt="Architectural Design Icon" className="h-10 w-10 mb-8 object-contain" />
            <h3 className="text-xl font-medium text-white mb-4 font-grotesk">Architectural Design</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed font-jakarta">
              Our architectural design ethos integrates innovation, sustainability, and client satisfaction from inception to realization.
            </p>
          </div>

          <div className="p-8 lg:p-12 hover:bg-[#0a0a0a] transition-colors duration-300">
            <img src={service2} alt="Interior Design Icon" className="h-10 w-10 mb-8 object-contain" />
            <h3 className="text-xl font-medium text-white mb-4 font-grotesk">Interior Design</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed font-jakarta">
              Elevate your interior spaces with our bespoke design service tailored to your unique style and needs.
            </p>
          </div>

          <div className="p-8 lg:p-12 hover:bg-[#0a0a0a] transition-colors duration-300">
            <img src={service3} alt="Build Icon" className="h-10 w-10 mb-8 object-contain" />
            <h3 className="text-xl font-medium text-white mb-4 font-grotesk">Build</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed font-jakarta">
              From landscaping to architectural detailing, our exterior design service crafts outdoor spaces that captivate.
            </p>
          </div>

        </div>
      </section>

      <HomeTwo />
      
    </div>
  );
};

export default Home;