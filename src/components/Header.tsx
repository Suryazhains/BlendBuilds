import React, { useState } from 'react';
import logo from '../assets/BLEND.png'; 
import contactIcon from '../assets/contact.png'; 

const Header: React.FC = () => {
  // State to control the mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll handler (Fixed the "cut" issue)
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Close mobile menu if it's open
    setIsMobileMenuOpen(false);

    // Find the section and scroll to it with pixel-perfect alignment
    const element = document.getElementById(sectionId);
    if (element) {
      // scrollIntoView with block: 'start' aligns the element perfectly to the top of the viewport
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
        {/* Logo */}
        <div 
          className="flex-shrink-0 cursor-pointer" 
          onClick={(e) => scrollToSection(e as any, 'home')}
        >
          <img src={logo} alt="BLEND Logo" className="h-6 md:h-8 w-auto object-contain" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 lg:space-x-12 text-sm text-gray-400 font-medium items-center">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors duration-300">Home</a>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors duration-300">Services</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors duration-300">Projects</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors duration-300">About</a>
        </nav>

        {/* Contact Link (Desktop) */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="inline-block transition-opacity duration-300 hover:opacity-80"
          >
            <img src={contactIcon} alt="Contact" className="h-5 md:h-6 w-auto object-contain" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white focus:outline-none transition-colors duration-300 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            /* Close (X) Icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger Icon */
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
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-block transition-opacity duration-300 hover:opacity-80"
            >
              <img src={contactIcon} alt="Contact" className="h-6 w-auto object-contain" />
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
};

export default Header;