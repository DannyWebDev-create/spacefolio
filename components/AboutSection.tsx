import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Initialize GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation on scroll
    if (typeof window === 'undefined') return;
    
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
    
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
    
    gsap.fromTo(
      skillsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  const skills = [
    { name: 'Node.js', level: 90 },
    { name: 'React.js', level: 95 },
    { name: 'Next.js', level: 95 },
    { name: 'Three.js', level: 75 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'Python', level: 75 },
    { name: 'JavaScript', level: 95 },
    { name: 'TypeScript', level: 75 },
    { name: 'SQL', level: 95 },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 glass relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div ref={textRef} className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Deniz - Fullstack Developer</h3>
            <p className="text-gray-300">
              I'm a fullstack developer with expertise in JavaScript, TypeScript, Python, and SQL. I create
              web applications with modern frameworks like React and Next.js while handling
              backend systems and databases.
            </p>
            <p className="text-gray-300">
              I also have strong system administration skills across Linux and Windows environments,
              managing servers, configuring networks, and implementing domain configurations.
            </p>
            <p className="text-gray-300">
              I continuously set goals to broaden my expertise by learning new languages and technologies across diverse fields.
            </p>
            <div className="flex gap-4">
              <a 
                href="#contact" 
                className="px-6 py-2 bg-space-accent text-white rounded-full hover:bg-space-highlight transition-colors"
              >
                Contact Me
              </a>
              <a 
                href="#" 
                className="px-6 py-2 border border-space-accent bg-transparent hover:bg-space-accent/20 text-white rounded-full transition-colors"
              >
                My Resume
              </a>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            {/* Stylized image placeholder - in a real project you would use an actual image */}
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-space-accent/30 to-space-highlight/30 rounded-full animation-pulse"></div>
              <div className="absolute inset-4 bg-space-dark rounded-full overflow-hidden">
                <Image 
                  src="/me/IMG_2075.jpg" 
                  alt="Deniz - Web Developer" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                  priority
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-space-accent rounded-full animation-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-space-highlight rounded-full animation-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Skills section */}
        <div ref={skillsRef} className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-space-light/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-space-highlight">{skill.level}%</span>
                </div>
                <div className="h-2 bg-space-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-space-accent to-space-highlight"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-space-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-space-highlight/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AboutSection;
