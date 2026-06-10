import React, { useRef, useEffect } from 'react';

// Image Imports
import about from '../assets/AboutusBack.png';
import portfolio1 from '../assets/AboutusBack.png'; 
import portfolio2 from '../assets/AboutusBack.png';
import portfolio3 from '../assets/AboutusBack.png';

// Import HomeThree (Ensure the actual file on your disk is named exactly HomeThree.tsx)
import HomeThree from './Homethree';

const HomeTwo: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<number | null>(null);

  // START AUTO SCROLL
  const startAutoScroll = () => {
    if (autoScrollTimer.current) {
      window.clearInterval(autoScrollTimer.current);
    }
    autoScrollTimer.current = window.setInterval(() => {
      scroll('right');
    }, 3000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollTimer.current) {
        window.clearInterval(autoScrollTimer.current);
      }
    };
  }, []);

  // SEAMLESS INFINITE LOOP LOGIC
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { current } = scrollRef;
    
    // Find the width of one card to know exactly how far to scroll
    const cardElement = current.querySelector('.portfolio-card') as HTMLElement;
    const cardWidth = cardElement?.clientWidth || 800;
    const gap = 32; // gap-8 equals 32px
    const itemWidth = cardWidth + gap;

    if (direction === 'right') {
      current.scrollBy({ left: itemWidth, behavior: 'smooth' });

      // Wait for smooth scroll to finish, then snap back if at the end
      setTimeout(() => {
        if (current.scrollLeft >= (itemWidth * 3) - 10) {
          current.scrollTo({ left: current.scrollLeft - (itemWidth * 3), behavior: 'auto' });
        }
      }, 600);
      
    } else {
      if (current.scrollLeft <= 0) {
        current.scrollTo({ left: itemWidth * 3, behavior: 'auto' });
        setTimeout(() => {
          current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }, 50);
      } else {
        current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }
  };

  // MANUAL CLICK HANDLER
  const handleManualScroll = (direction: 'left' | 'right') => {
    // Stop auto-scrolling when user clicks
    if (autoScrollTimer.current) {
      window.clearInterval(autoScrollTimer.current);
    }
    
    // Perform the scroll
    scroll(direction);
    
    // Restart auto-scroll after 6 seconds of inactivity
    setTimeout(() => {
      startAutoScroll();
    }, 6000);
  };

  return (
    <div className="bg-white text-black w-full pb-0 overflow-hidden relative z-50">
      
      {/* ===== ABOUT US & STATS COMBINED SECTION ===== */}
      <div className="w-full bg-[#f4f5f5] relative">
        
        {/* Subtle Background Vertical Grid Lines */}
        <div className="absolute inset-0 z-0 flex justify-between px-4 md:px-8 lg:px-12 pointer-events-none opacity-50 max-w-[1440px] mx-auto">
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-px h-full bg-gray-200"></div>
          <div className="hidden md:block w-px h-full bg-gray-200"></div>
        </div>

        {/* Main Content Container */}
        <section id="about" className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-24 lg:pt-32 relative z-10">
          
          {/* Top Part: Image and Text Box */}
          <div className="relative flex flex-col lg:flex-row items-center justify-start mb-8 lg:mb-10">
            
            {/* Image Container */}
            <div className="w-full lg:w-[65%] relative z-0">
              <img 
                src={about} 
                alt="About Us Architecture" 
                className="w-full h-[300px] md:h-[450px] lg:h-[600px] object-cover "
              />
            </div>

            {/* Overlapping White Text Box */}
            <div className="w-full lg:w-[75%] xl:w-[70%] lg:absolute lg:right-0 lg:top-[18%] bg-white p-12 md:p-20 lg:p-24 z-10 mt-[-40px] lg:mt-0 shadow-sm border border-gray-100">
              <h2 className="text-3xl md:text-5xl font-grotesk mb-6 text-black">
                About Us
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px] md:text-base font-light font-jakarta">
                We believe in the power of architecture and design to shape the way we 
                live, work, and interact with the world around us. With a passion for 
                innovation and a dedication to excellence, we strive to push boundaries, 
                challenge conventions, and create spaces that inspire and endure.
              </p>
            </div>

          </div>

          {/* Bottom Part: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 text-center relative z-10">
            <div className="flex flex-col items-center justify-center py-10 lg:py-12">
              <h3 className="text-4xl md:text-[44px] font-grotesk font-medium mb-3 text-black">3000+</h3>
              <p className="text-gray-400 text-sm tracking-wide font-jakarta">Successful Projects</p>
            </div>
            <div className="flex flex-col items-center justify-center py-10 lg:py-12">
              <h3 className="text-4xl md:text-[44px] font-grotesk font-medium mb-3 text-black">2500+</h3>
              <p className="text-gray-400 text-sm tracking-wide font-jakarta">Happy Clients</p>
            </div>
            <div className="flex flex-col items-center justify-center py-10 lg:py-12">
              <h3 className="text-4xl md:text-[44px] font-grotesk font-medium mb-3 text-black">100%</h3>
              <p className="text-gray-400 text-sm tracking-wide font-jakarta">Clients Satisfactions</p>
            </div>
          </div>

        </section>
      </div>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section id="projects" className="max-w-[1540px] mx-auto pt-16 lg:pt-28 pb-20 bg-white relative z-10">
        
        {/* Portfolio Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 px-4 md:px-6 lg:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-grotesk mb-4 text-black">Our Portfolio</h2>
            <p className="text-gray-500 text-[15px] font-light leading-relaxed font-jakarta">
              Dive into our diverse portfolio of architectural marvels, each a testament 
              to our commitment to innovation, creativity, and excellence.
            </p>
          </div>
          
          {/* Arrow Navigation */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button 
              onClick={() => handleManualScroll('left')}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors outline-none focus:outline-none cursor-pointer active:scale-95"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
            </button>
            <button 
              onClick={() => handleManualScroll('right')}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors outline-none focus:outline-none cursor-pointer active:scale-95"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M19 12l-7 7M19 12l-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-8 px-4 md:px-6 lg:px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {/* ----- ORIGINAL ITEMS ----- */}
          <div className="portfolio-card shrink-0 w-[90vw] md:w-[650px] lg:w-[800px] h-[250px] md:h-[340px] lg:h-[400px] bg-[#eaeaea] overflow-hidden">
            <img src={portfolio1} alt="Portfolio Project 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="portfolio-card shrink-0 w-[90vw] md:w-[650px] lg:w-[800px] h-[250px] md:h-[340px] lg:h-[400px] bg-[#eaeaea] overflow-hidden">
            <img src={portfolio2} alt="Portfolio Project 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="portfolio-card shrink-0 w-[90vw] md:w-[650px] lg:w-[800px] h-[250px] md:h-[340px] lg:h-[400px] bg-[#eaeaea] overflow-hidden">
            <img src={portfolio3} alt="Portfolio Project 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          {/* ----- CLONED ITEMS ----- */}
          <div className="portfolio-card shrink-0 w-[90vw] md:w-[650px] lg:w-[800px] h-[250px] md:h-[340px] lg:h-[400px] bg-[#eaeaea] overflow-hidden">
            <img src={portfolio1} alt="Portfolio Project 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="portfolio-card shrink-0 w-[90vw] md:w-[650px] lg:w-[800px] h-[250px] md:h-[340px] lg:h-[400px] bg-[#eaeaea] overflow-hidden">
            <img src={portfolio2} alt="Portfolio Project 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="portfolio-card shrink-0 w-[90vw] md:w-[650px] lg:w-[800px] h-[250px] md:h-[340px] lg:h-[400px] bg-[#eaeaea] overflow-hidden">
            <img src={portfolio3} alt="Portfolio Project 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          
          <div className="shrink-0 w-4 lg:w-8" aria-hidden="true"></div>
        </div>
      </section>

      {/* ===== HOME THREE RENDERED HERE ===== */}
      <HomeThree />

    </div>
  );
};

export default HomeTwo;