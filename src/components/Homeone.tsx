import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HomeTwo from './HomeTwo'; 

// Assets
import logo from '../assets/BLEND.png'; 
import contactIcon from '../assets/contact.png'; 
import service1 from '../assets/service.png';
import service2 from '../assets/service 2.png';
import service3 from '../assets/service 3.png';

// Import your 3 hero background images here
import heroBg1 from '../assets/backgoruncover.png';
import heroBg2 from '../assets/Backgrounccover2.png'; 
import heroBg3 from '../assets/Backgrouncover3.png'; 

const backgroundImages = [heroBg1, heroBg2, heroBg3];

// ==========================================
// HEADER COMPONENT
// ==========================================
const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start', 
      });
    }
  };

  return (
    <header className="w-full font-rubik absolute top-0 left-0 z-50">
      {/* Main Top Navigation Bar */}
      <div className="w-full flex items-center justify-between pt-10 pb-6 px-6 md:px-16 lg:px-24 relative z-50">
        <div className="flex-shrink-0 cursor-pointer" onClick={(e) => scrollToSection(e as any, 'home')}>
          <img src={logo} alt="BLEND Logo" className="h-6 md:h-8 w-auto object-contain" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 lg:space-x-12 text-sm text-gray-200 font-medium items-center">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors duration-300">Home</a>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors duration-300">Services</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors duration-300">Projects</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors duration-300">About</a>
        </nav>

        {/* Contact Link (Desktop) */}
        <div className="hidden md:block">
          <a href="/contact" className="inline-block transition-opacity duration-300 hover:opacity-80">
            <img src={contactIcon} alt="Contact" className="h-5 md:h-6 w-auto object-contain" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-gray-200 hover:text-white focus:outline-none transition-colors duration-300 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden absolute top-0 left-0 w-full bg-[#0a0a0a] border-b border-[#1a1a1a] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'
        }`}
        style={{ paddingTop: '100px', paddingBottom: '30px' }} 
      >
        <nav className="flex flex-col items-center space-y-6 text-base text-gray-400 font-normal">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors duration-300 w-full text-center py-2">Home</a>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors duration-300 w-full text-center py-2">Services</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors duration-300 w-full text-center py-2">Projects</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors duration-300 w-full text-center py-2">About</a>
          <div className="pt-4 border-t border-[#1a1a1a] w-[50%] flex justify-center">
            <a href="/contact" className="inline-block transition-opacity duration-300 hover:opacity-80">
              <img src={contactIcon} alt="Contact" className="h-6 w-auto object-contain" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

// ==========================================
// HOME COMPONENT
// ==========================================
const Home: React.FC = () => {
  // Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(backgroundImages.length - 1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Services Scroll Animation State
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Stop initial animation on first page load
  useEffect(() => {
    const timeout = setTimeout(() => setIsInitialLoad(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Slider Navigation Function
  const nextSlide = () => {
    setPrevImageIndex(currentImageIndex);
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  const goToSlide = (index: number) => {
    if (index === currentImageIndex) return;
    setPrevImageIndex(currentImageIndex);
    setCurrentImageIndex(index);
  };

  // Background Slider Effect (Auto-play every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Scroll Observer for the Services Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.2 } 
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden">

      <Header />

      {/* Hero Section */}
      <main className="relative flex flex-col items-start justify-center lg:justify-end min-h-screen px-6 md:px-16 lg:px-24 pb-20 lg:pb-24 overflow-hidden border-b-2 border-[#1a1a1a]" id="home">
        
        {/* Layered Overlap Slider - Premium Slow Parallax Reveal */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          {backgroundImages.map((img, idx) => {
            const isCurrent = idx === currentImageIndex;
            const isPrev = idx === prevImageIndex;
            
            // Layout Positioning configurations:
            // Current stays at 0%. Old image pushes left to -30%. Unused wait at 100%.
            let translateValue = '100%';
            if (isCurrent) translateValue = '0%';
            else if (isPrev) translateValue = '-30%';

            return (
              <div
                key={idx}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${img})`,
                  zIndex: isCurrent ? 20 : isPrev ? 10 : 0,
                  transform: `translateX(${translateValue})`,
                  // Symmetrical ease-in-out (slow start, fast middle, slow end)
                  transition: !isInitialLoad ? 'transform 2000ms cubic-bezier(0.60, 0, 0.45, 0.60)' : 'none',
                }}
              />
            );
          })}
        </div>
        
        {/* Typography Content (Left Side) */}
        <div className="relative z-10 w-full lg:w-2/3 flex flex-col items-start space-y-8 mt-auto drop-shadow-2xl">
          <h1 
            className="text-4xl md:text-6xl lg:text-[90px] font-normal leading-[1.04] tracking-[-0.04em] text-white whitespace-nowrap" 
            style={{ fontFamily: '"EB Garamond", Garamond, serif', textShadow: '2px 4px 10px rgba(0,0,0,0.5)' }}
          >
            Design. Build. Interior.<br/>
            <span 
              className="font-medium" 
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              All In <span className="italic"> One Place.</span>
            </span>
          </h1>
          
          <Link to="/contact" className="bg-[#007b80] hover:bg-[#006064] text-white py-3 px-8 rounded-sm transition-all duration-300 flex items-center group shadow-lg font-garamond text-lg font-normal tracking-wide w-fit">
            Contact Now 
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Minimalist Slide Indicators (Bottom Right Dots) */}
        <div className="hidden md:flex absolute bottom-12 right-12 lg:bottom-16 lg:right-24 z-20 items-center space-x-3">
          {backgroundImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                idx === currentImageIndex 
                  ? 'w-4 h-4 border border-[#007b80]' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {idx === currentImageIndex && (
                <div className="w-1.5 h-1.5 bg-[#007b80] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </main>

      {/* Our Services Section */}
      <section className="relative z-10 bg-black overflow-hidden" id="services">
        <div className="py-12 lg:py-16 px-6 md:px-16 lg:px-24 flex items-center">
          <h2 className="text-3xl lg:text-4xl font-grotesk text-white">Our Services</h2>
        </div>
        
        <div className="w-full border-y-2 border-[#1a1a1a]">
          <div 
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1a1a1a] border-x-2 border-[#1a1a1a] mx-6 md:mx-16 lg:mx-24"
          >
            {/* Box 1 */}
            <div className={`relative group p-8 lg:p-12 transition-all duration-1000 ease-out min-h-[450px] lg:min-h-[550px] flex flex-col justify-start transform ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} delay-[200ms]`}>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-200 pointer-events-none"></div>
              <div className="relative z-10">
                <img src={service1} alt="Architectural Design Icon" className="h-12 w-12 mb-8 object-contain" />
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-6 font-grotesk tracking-wide">Architectural Design</h3>
                <p className="text-gray-400 text-base lg:text-[17px] leading-relaxed font-jakarta">
                  Our architectural design ethos integrates innovation, sustainability, and client satisfaction from inception to realization.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className={`relative group p-8 lg:p-12 transition-all duration-1000 ease-out min-h-[450px] lg:min-h-[550px] flex flex-col justify-start transform ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} delay-[800ms]`}>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-200 pointer-events-none"></div>
              <div className="relative z-10">
                <img src={service2} alt="Interior Design Icon" className="h-12 w-12 mb-8 object-contain" />
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-6 font-grotesk tracking-wide">Interior Design</h3>
                <p className="text-gray-400 text-base lg:text-[17px] leading-relaxed font-jakarta">
                  Elevate your interior spaces with our bespoke design service tailored to your unique style and needs.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className={`relative group p-8 lg:p-12 transition-all duration-1000 ease-out min-h-[450px] lg:min-h-[550px] flex flex-col justify-start transform ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} delay-[1400ms]`}>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-200 pointer-events-none"></div>
              <div className="relative z-10">
                <img src={service3} alt="Build Icon" className="h-12 w-12 mb-8 object-contain" />
                <h3 className="text-2xl lg:text-3xl font-medium text-white mb-6 font-grotesk tracking-wide">Build</h3>
                <p className="text-gray-400 text-base lg:text-[17px] leading-relaxed font-jakarta">
                  From landscaping to architectural detailing, our exterior design service crafts outdoor spaces that captivate.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <HomeTwo />
      
    </div>
  );
};

export default Home;