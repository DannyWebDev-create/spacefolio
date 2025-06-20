import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Initialize GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  video: string;
  demoUrl: string;
  repoUrl: string;
}

// Project data
const projects = [
  {
    id: 1,
    title: 'Ticket System',
    description: 'This is a simple ticket system built for testing and demonstration purposes. Users can create, track, and manage support tickets in a clean, user-friendly interface. Built with modern web technologies — perfect for showcasing full-stack skills. The backend has not yet been implemented on Vercel',
    tags: ['Next.js', 'JavaScript', 'React', 'Tailwind CSS'],
    image: '', // Fallback image if video doesn't load
    video: '/videos/ticket-system.mp4', // Path to your project video
    demoUrl: 'https://ticket-system-project.vercel.app/',
    repoUrl: 'https://github.com/DannyWebDev-create/ticket-system-project',
  },
  {
    id: 2,
    title: 'ZWST',
    description: "My biggest project yet. MERN stack app for managing second home tax. Handles large tax datasets with filtering, editing, and dynamic forms — built for performance and clarity. I'm not allowed to share this one, so enjoy the mystery!",
    tags: ['Node.js/Express.js', 'React', 'MySQL', 'JWT', 'NGINX', 'SSL'],
    image: '', // Fallback image if video doesn't load
    video: '/videos/zwst.mp4', // Path to your project video
    demoUrl: 'javascript:void(0)',
    repoUrl: 'javascript:void(0)',
  },
  {
    id: 3,
    title: 'Spacefolio',
    description: "You're already here. Welcome aboard the Spacefolio — a dashboard so advanced, it monitors itself in real time.",
    tags: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    image: '/videos/spacefolio.gif', // Fallback image if video doesn't load
    video: '/videos/spacefolio.mp4', // Path to your project video
    demoUrl: 'https://spacefolio-three.vercel.app/',
    repoUrl: 'https://github.com/DannyWebDev-create/spacefolio',
  },
  {
    id: 4,
    title: 'Doner Project',
    description: 'A small, fun project built in 2 days — a clicker game inspired by Cookie Clicker.',    
    tags: ['Next.js', 'TypeScript'],
    image: '', // Fallback image if video doesn't load
    video: '/videos/doner-project.mp4', // Path to your project video
    demoUrl: 'https://doner-project.vercel.app/',
    repoUrl: 'https://github.com/DannyWebDev-create/doner-project',
  },
];

// Project card component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
        },
      }
    );
  }, [index]);
  
  // Handlers for video pause/play on hover
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div 
      ref={cardRef}
      className="group glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-space-accent/20 hover:scale-[1.02]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-56 relative overflow-hidden bg-space-light">
        {/* Video Background */}
        {project.video && (
          <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full overflow-hidden">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                {...{
                  'webkit-playsinline': 'true',
                  'x5-playsinline': 'true'
                }}
                poster={project.image}
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload nofullscreen noremoteplayback"
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => e.preventDefault()}
                style={{
                  objectFit: 'cover',
                  pointerEvents: 'none' // Disable all mouse interactions with the video
                }}
              >
                <source src={project.video} type="video/mp4" />
                {/* Your browser does not support the video tag. */}
              </video>
              
              {/* Complete transparent overlay that blocks all controls while allowing group hover effects to pass through */}
              <div 
                className="absolute inset-0 z-10 group-hover:z-0" 
                style={{ background: 'transparent', pointerEvents: 'auto' }}
                onClick={(e) => e.preventDefault()}
              ></div>
              
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-space-accent/30 to-space-highlight/30 group-hover:opacity-70 transition-opacity"></div>
            </div>
          </div>
        )}
        
        {/* Overlay with links */}
        <div className="absolute inset-0 bg-space-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {project.demoUrl === 'javascript:void(0)' ? (
            <div className="px-4 py-2 bg-space-accent text-white rounded-full opacity-70">
              [REDACTED]
            </div>
          ) : (
            <a 
              href={project.demoUrl} 
              className="px-4 py-2 bg-space-accent text-white rounded-full hover:bg-space-highlight transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
          
          {project.repoUrl === 'javascript:void(0)' ? (
            <div className="px-4 py-2 border border-white text-white rounded-full opacity-70">
              [REDACTED]
            </div>
          ) : (
            <a 
              href={project.repoUrl} 
              className="px-4 py-2 border border-white text-white rounded-full hover:bg-white/20 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, tagIndex: number) => (
            <span 
              key={tagIndex}
              className="px-3 py-1 bg-space-light text-space-highlight text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my cosmic creations blending code, design, and interactivity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/DannyWebDev-create" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 border border-space-accent bg-transparent hover:bg-space-accent/20 text-white rounded-full transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>View More on GitHub</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-space-accent to-transparent opacity-30"></div>
    </section>
  );
};

export default ProjectsSection;
