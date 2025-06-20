import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Dynamically import Three.js components to prevent SSR issues
const SpaceBackground = dynamic(() => import('@/components/three/SpaceBackground'), {
  ssr: false,
});

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-screen bg-space-dark text-white overflow-hidden">
      {/* Three.js Space Background */}
      <div className="fixed inset-0 z-0">
        <SpaceBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
