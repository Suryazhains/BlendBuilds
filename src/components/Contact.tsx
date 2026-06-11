import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/BLEND.png'; 
import contactBg from '../assets/ConactBackofdun.png'; 
import contactIcon from '../assets/ContactBalck.png';

const Contact: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    description: ''
  });
  const [mobileError, setMobileError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'mobile') {
      setMobileError('');
    }
  };

  const validateMobile = (number: string) => {
    const mobileRegex = /^\+?[0-9]{10,15}$/;
    return mobileRegex.test(number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMobile(formData.mobile)) {
      setMobileError('Please enter a valid mobile number (10-15 digits).');
      return;
    }
    console.log('Form submitted securely:', formData);
    alert('Thank you! Your inquiry has been submitted.');
    setFormData({ name: '', mobile: '', email: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden">
      
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='waves' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50' fill='none' stroke='black' stroke-width='1'/%3E%3Cpath d='M0 70 Q 25 45, 50 70 T 100 70' fill='none' stroke='black' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23waves)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
      ></div>

      {/* ===== NAVBAR ===== */}
      <header className="w-full font-rubik relative z-50">
        <div className="w-full flex items-center justify-between pt-10 pb-6 px-6 md:px-16 lg:px-24">
          
          <HashLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex-shrink-0 cursor-pointer">
            <img src={logo} alt="BLEND Logo" className="h-6 md:h-8 w-auto object-contain" />
          </HashLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12 text-sm text-black font-medium items-center">
            <HashLink smooth to="/#home" className="hover:text-gray-500 transition-colors duration-300">Home</HashLink>
            <HashLink smooth to="/#services" className="hover:text-gray-500 transition-colors duration-300">Services</HashLink>
            <HashLink smooth to="/#projects" className="hover:text-gray-500 transition-colors duration-300">Projects</HashLink>
            <HashLink smooth to="/#about" className="hover:text-gray-500 transition-colors duration-300">About</HashLink>
          </nav>

          <div className="hidden md:flex flex-col items-center">
            <HashLink to="/contact" className="inline-block transition-opacity duration-300 hover:opacity-80">
              <img src={contactIcon} alt="Contact" className="h-6 md:h-7 w-auto object-contain" />
            </HashLink>
            
          </div>

          <button 
            className="md:hidden text-black focus:outline-none z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          className={`md:hidden absolute top-0 left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-in-out shadow-lg z-40 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'
          }`}
          style={{ paddingTop: '100px', paddingBottom: '30px' }} 
        >
          <nav className="flex flex-col items-center space-y-6 text-base text-black font-medium">
            <HashLink smooth to="/#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-500 transition-colors w-full text-center py-2">Home</HashLink>
            <HashLink smooth to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-500 transition-colors w-full text-center py-2">Services</HashLink>
            <HashLink smooth to="/#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-500 transition-colors w-full text-center py-2">Projects</HashLink>
            <HashLink smooth to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-500 transition-colors w-full text-center py-2">About</HashLink>
            <div className="pt-4 border-t border-gray-200 w-[50%] flex flex-col items-center">
              <HashLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-block transition-opacity duration-300 hover:opacity-80">
                <img src={contactIcon} alt="Contact" className="h-7 w-auto object-contain" />
              </HashLink>
              <div className="w-full max-w-[80px] h-[2px] bg-black mt-1.5"></div>
            </div>
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTACT FORM SECTION ===== */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-5 pb-4 lg:pt-5 lg:pb-6 flex flex-col items-center justify-center">
        
        <div className="text-center mb-6">
          <h1 className={`text-4xl md:text-5xl font-normal font-garamond mb-2 transform transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-100`}>
            Contact Us
          </h1>
          <p className={`text-gray-500 text-sm md:text-base font-light font-jakarta transform transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-200`}>
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-3">
          <div className={`flex flex-col transform transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-300`}>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 font-jakarta">Name:</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe" 
              required
              className="w-full bg-[#f8f9fa] border-none rounded-md px-4 py-2 text-black font-jakarta placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007b80] transition-shadow shadow-sm"
            />
          </div>

          <div className={`flex flex-col transform transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-400`}>
            <label htmlFor="mobile" className="text-sm font-medium text-gray-700 mb-1 font-jakarta">Mobile Number:</label>
            <input 
              type="tel" 
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="+91 98765 86258" 
              required
              className={`w-full bg-[#f8f9fa] border-none rounded-md px-4 py-2 text-black font-jakarta placeholder-gray-400 focus:outline-none focus:ring-2 transition-shadow shadow-sm ${mobileError ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-[#007b80]'}`}
            />
            {mobileError && <span className="text-red-500 text-xs mt-1 font-jakarta">{mobileError}</span>}
          </div>

          <div className={`flex flex-col transform transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-500`}>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 font-jakarta">Email:</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com" 
              required
              className="w-full bg-[#f8f9fa] border-none rounded-md px-4 py-2 text-black font-jakarta placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007b80] transition-shadow shadow-sm"
            />
          </div>

          <div className={`flex flex-col transform transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-600`}>
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 font-jakarta">Inquiry Description:</label>
            <textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your inquiry..." 
              rows={3}
              required
              className="w-full bg-[#f8f9fa] border-none rounded-md px-4 py-2 text-black font-jakarta placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007b80] transition-shadow shadow-sm resize-none"
            ></textarea>
          </div>

          <div className={`pt-2 transform transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-[700ms]`}>
            <button 
              type="submit" 
              className="w-full bg-[#006064] hover:bg-[#004d50] text-white font-medium text-lg font-jakarta py-3 rounded-md transition-colors duration-300 shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Contact;