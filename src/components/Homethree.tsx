import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// IMPORT THE SVG AS A REACT COMPONENT
import FooterBuilding from '../assets/Footerbg.svg?react'; 

import logo from '../assets/BLEND.png';
import fbIcon from '../assets/fb.png';
import igIcon from '../assets/ib.png';
import inIcon from '../assets/lb.png';

// Mock data for the testimonials
const testimonialsData = [
  {
    id: 1,
    name: 'Jane Doe',
    text: 'Working with BLEND was an absolute pleasure. Their team not only understood our vision but exceeded our expectations in every aspect. From conceptualization to execution, they demonstrated unparalleled professionalism, creativity, and attention to detail. Our project in New York City is now a testament to their expertise and commitment to excellence.',
  },
  {
    id: 2,
    name: 'John Smith',
    text: 'The architectural solutions provided by BLEND completely transformed our workspace. The attention to natural light and ergonomic flow was exactly what we needed. Highly recommend their dedicated and innovative team for any modern commercial project.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    text: 'From start to finish, the BLEND team was incredible. They respected our budget constraints while still delivering a world-class design that leaves everyone who visits absolutely speechless. We look forward to our next collaboration.',
  },
];

const HomeThree: React.FC = () => {
  // State to track the active testimonial
  const [currentIndex, setCurrentIndex] = useState(0);

  // SCROLL OBSERVER REFS
  const footerSvgContainerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // STEP 1: The Observer - Just waits for the user to scroll down
  useEffect(() => {
    const container = footerSvgContainerRef.current;
    if (!container || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true); // Tell React we are ready
          observer.disconnect(); // Stop observing
        }
      },
      { threshold: 0.2 } 
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [hasAnimated]);

  // STEP 2: The Drawing Magic
  useEffect(() => {
    if (!hasAnimated) return;

    const timer = setTimeout(() => {
      const container = footerSvgContainerRef.current;
      const svg = container?.querySelector('.footer-building-svg');
      if (!svg) return;

      const shapes = svg.querySelectorAll('path, line, polyline, rect, polygon, circle');
      
      shapes.forEach((shape, index) => {
        const element = shape as SVGGeometryElement;
        
        const length = element.getTotalLength ? element.getTotalLength() : 1500;

        element.style.strokeDasharray = `${length}`;
        element.style.strokeDashoffset = `${length}`;

        // === LIGHTNING FAST SPEED ADJUSTMENTS HERE ===
        element.animate([
          { strokeDashoffset: length },
          { strokeDashoffset: 0 }
        ], {
          duration: 300, 
          delay: index * 6, 
          fill: 'forwards',
          easing: 'ease-out' 
        });
      });
    }, 50); 

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  // Functions to handle arrow clicks
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full flex flex-col">
      
      <style>{`
        .footer-building-svg {
          display: block;
        }

        /* Specifically increasing stroke thickness without forcing fill to none */
        .footer-building-svg path, 
        .footer-building-svg line, 
        .footer-building-svg rect,
        .footer-building-svg polyline,
        .footer-building-svg polygon,
        .footer-building-svg circle {
           stroke-width: 1.5px !important; /* Increase this to 2px if you want thicker lines */
        }

        .footer-building-svg:not(.animated) path,
        .footer-building-svg:not(.animated) line,
        .footer-building-svg:not(.animated) rect,
        .footer-building-svg:not(.animated) polyline,
        .footer-building-svg:not(.animated) polygon,
        .footer-building-svg:not(.animated) circle {
           stroke-dasharray: 5000;
           stroke-dashoffset: 5000;
        }
      `}</style>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="relative w-full bg-[#F2F1EE] py-24 px-6 md:px-16 lg:px-24 overflow-hidden min-h-[80vh] flex flex-col justify-center border-t border-[#D8D8D8]">
        
        {/* Background Vertical Grid Lines */}
        <div className="absolute inset-0 z-0 flex items-center justify-center px-6 md:px-16 lg:px-24 pointer-events-none">
          <div className="w-full max-w-8xl h-full flex justify-between">
            <div className="w-[1px] h-full bg-[#D8D8D8]"></div>
            <div className="w-[1px] h-full bg-[#D8D8D8]"></div>
            <div className="w-[1px] h-full bg-[#D8D8D8]"></div>
            <div className="w-[1px] h-full bg-[#D8D8D8]"></div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-8xl mx-auto">
          {/* Section Title */}
          <h2 className="text-4xl md:text-[2.75rem] font-grotesk font-medium text-black mb-10 tracking-tight">
            Testimonials
          </h2>

          {/* Testimonial Card - Fixed Height applied here */}
          <div className="bg-white p-10 md:p-14 lg:p-16 shadow-sm w-full lg:w-2/3 mb-10 border border-[#E5E5E5] h-[380px] md:h-[320px] lg:h-[300px] flex flex-col justify-between transition-all duration-500 ease-in-out overflow-hidden">
            <p className="text-[#666666] text-[15px] md:text-base leading-[1.8] font-light mb-12 font-jakarta">
              {testimonialsData[currentIndex].text}
            </p>
            <p className="text-black font-semibold text-base font-jakarta">
              {testimonialsData[currentIndex].name}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevClick}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors duration-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <button 
              onClick={handleNextClick}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300 focus:outline-none shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="w-full bg-[#000000] text-white flex flex-col relative overflow-hidden font-sans">
        
        {/* Top Half: CTA & Building Illustration - Removed the border-b from here! */}
        <div className="relative w-full px-6 md:px-16 lg:px-24 pt-20 pb-0 lg:pt-28 flex flex-col lg:flex-row items-end justify-between">
          
          {/* Left Side: Text & Button */}
          <div className="relative z-10 w-full lg:w-[40%] flex flex-col items-start pb-16 lg:pb-24 shrink-0">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-garamond font-normal text-[#FFFFFF] mb-8 leading-tight tracking-wide">
              Ready to transform<br />your space?
            </h2>
            <Link to="/contact" className="bg-[#007b80] hover:bg-[#006064] text-[#FFFFFF] font-garamond font-normal text-lg tracking-wide py-3 px-8 rounded-sm transition-all duration-300 flex items-center group w-fit">
              Contact Now 
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Right Side: Building Illustration Container attached to Ref */}
          <div 
            ref={footerSvgContainerRef} 
            className="relative z-0 w-full lg:w-[60%] flex justify-end items-end h-full mt-10 lg:mt-0"
          >
            {/* The SVG Component - Increased Width and Origin */}
            <FooterBuilding 
              className={`footer-building-svg w-full lg:w-[130%] object-contain object-bottom translate-y-[1px] transform origin-bottom-right opacity-70 ${hasAnimated ? 'animated' : ''}`}
            />
          </div>
        </div>

        {/* Middle Half: Logo, Description & Socials - Added border-t here to properly separate sections */}
        <div className="w-full px-6 md:px-16 lg:px-24 py-16 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-b border-[#222222]">
          
          {/* Logo & Text Block */}
          <div className="flex flex-col items-start max-w-md mb-10 md:mb-0">
            <img src={logo} alt="BLEND Logo" className="h-8 md:h-10 mb-6 object-contain" />
            <p className="text-[#FFFFFF] text-[15px] leading-relaxed font-light font-jakarta">
              Discover Inspired Architectural Solutions Tailored to Your Unique Style and Needs.
            </p>
          </div>

          {/* Social Icons Block */}
          <div className="flex items-center gap-5">
            <a href="#" className="w-12 h-12 rounded-full border border-[#333333] flex items-center justify-center hover:border-gray-400 hover:bg-[#111111] transition-all duration-300 group">
              <img src={fbIcon} alt="Facebook" className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-[#333333] flex items-center justify-center hover:border-gray-400 hover:bg-[#111111] transition-all duration-300 group">
              <img src={igIcon} alt="Instagram" className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-[#333333] flex items-center justify-center hover:border-gray-400 hover:bg-[#111111] transition-all duration-300 group">
              <img src={inIcon} alt="LinkedIn" className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Bottom Half: Copyright Area */}
        <div className="w-full py-8 flex items-center justify-center bg-black">
          <p className="text-[#555555] text-sm font-light tracking-wide font-jakarta">
            © 2026 Blend Builds. All rights reserved.
          </p>
        </div>

      </footer>
    </div>
  );
};

export default HomeThree;