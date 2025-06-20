import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  // Animation on component mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.6"
    )
    .fromTo(
      buttonsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.6"
    );
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Exploring the <span className="text-gradient glow">Universe</span> of Web Development
          </h1>
          
          <p 
            ref={subtitleRef} 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Crafting stellar digital experiences with cutting-edge technology
            and cosmic creativity.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#projects"
              className="px-8 py-3 bg-space-accent text-white rounded-full hover:bg-space-highlight hover:shadow-lg hover:shadow-space-accent/50 transition-all"
            >
              View Projects
            </Link>
            <Link 
              href="#contact"
              className="px-8 py-3 border border-space-accent bg-transparent hover:bg-space-accent/20 text-white rounded-full transition-all duration-300"
            >
              Contact Me
            </Link>
          </div>
          
          {/* Floating arrow animation */}
          <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animation-float">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-300 animation-pulse"
            >
              <path 
                d="M12 5L12 19M12 19L5 12M12 19L19 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-space-accent/20 blur-3xl animation-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-space-highlight/20 blur-3xl animation-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
