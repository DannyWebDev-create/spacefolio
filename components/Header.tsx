import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 glass' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gradient">
          <span className="font-mono">SPACE</span>FOLIO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#home" className="text-white hover:text-space-highlight transition-colors">
            Home
          </Link>
          <Link href="#about" className="text-white hover:text-space-highlight transition-colors">
            About
          </Link>
          <Link href="#projects" className="text-white hover:text-space-highlight transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="text-white hover:text-space-highlight transition-colors">
            Contact
          </Link>
          <a 
            href="#" 
            className="px-5 py-2 border border-space-accent bg-transparent hover:bg-space-accent/20 text-white rounded-full transition-all duration-300"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute w-full py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#home" 
              className="text-white hover:text-space-highlight transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#about" 
              className="text-white hover:text-space-highlight transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#projects" 
              className="text-white hover:text-space-highlight transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="#contact" 
              className="text-white hover:text-space-highlight transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <a 
              href="#" 
              className="px-5 py-2 border border-space-accent bg-transparent hover:bg-space-accent/20 text-white rounded-full transition-all duration-300 w-fit"
            >
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
