import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('vC1tIXjQaAJyZceO6');

// Initialize GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  
  // Animation on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
    
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.from_name || !formData.reply_to || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill out all fields.',
      });
      return;
    }

    setFormStatus({
      submitted: false,
      error: false,
      message: 'Sending your message...',
    });
    
    // Template parameters for the notification to you (website owner)
    const ownerNotificationParams = {
      from_name: formData.from_name,
      name: formData.from_name,
      reply_to: formData.reply_to,
      email: formData.reply_to, // This is needed for {{email}} in your Contact Us template
      message: formData.message,
      to_email: 'codedbydanny@gmail.com' // Your email to receive the contact notification
    };
    
    // First, send the notification to you
    emailjs.send(
      'service_pzshulq',
      'template_hrz535m', // Contact Us template (notification for you)
      ownerNotificationParams,
      'vC1tIXjQaAJyZceO6'
    )
    .then((result) => {
      console.log('Owner notification sent successfully:', result.text);
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thanks for your message! I\'ll get back to you soon.',
      });
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
        setFormData({ from_name: '', reply_to: '', message: '' });
      }
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    })
    .catch((error) => {
      console.error('Email sending failed:', error.text || error);
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Sorry, something went wrong. Please try again later.',
      });
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 glass relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" ref={headingRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Contact Me
            </h2>
            <p className="text-xl text-gray-300">
              Ready to launch your next project? Let's make something extraordinary together.
            </p>
          </div>
          
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="bg-space-light/30 p-8 rounded-xl backdrop-blur-sm"
          >
            {formStatus.message && (
              <div 
                className={`mb-6 p-4 rounded-lg text-center ${
                  formStatus.error 
                    ? 'bg-red-900/50 text-red-200 border border-red-700' 
                    : 'bg-green-900/50 text-green-200 border border-green-700'
                }`}
              >
                {formStatus.message}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-space-dark/50 border border-space-light rounded-lg focus:outline-none focus:ring-2 focus:ring-space-accent text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="reply_to"
                  value={formData.reply_to}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-space-dark/50 border border-space-light rounded-lg focus:outline-none focus:ring-2 focus:ring-space-accent text-white"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-space-dark/50 border border-space-light rounded-lg focus:outline-none focus:ring-2 focus:ring-space-accent text-white"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-space-accent text-white rounded-full hover:bg-space-highlight transition-colors flex items-center justify-center gap-2 group"
              disabled={formStatus.submitted}
            >
              {formStatus.submitted ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          {/* Alternative contact methods */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <a 
              href="mailto:codedbydanny@gmail.com" 
              className="p-6 bg-space-light/30 rounded-lg hover:bg-space-light/50 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-space-accent/20 rounded-full flex items-center justify-center group-hover:bg-space-accent/30 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
              <p className="text-gray-300">codedbydanny@gmail.com</p>
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-space-light/30 rounded-lg hover:bg-space-light/50 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-space-accent/20 rounded-full flex items-center justify-center group-hover:bg-space-accent/30 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">LinkedIn</h3>
              <p className="text-gray-300">Connect with me</p>
            </a>
            
            <a 
              href="https://github.com/DannyWebDev-create" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-space-light/30 rounded-lg hover:bg-space-light/50 transition-colors group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-space-accent/20 rounded-full flex items-center justify-center group-hover:bg-space-accent/30 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">GitHub</h3>
              <p className="text-gray-300">Check out my code</p>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-space-accent to-transparent opacity-30"></div>
      <div className="absolute -top-10 right-10 w-20 h-20 rounded-full bg-space-accent/20 blur-2xl animation-pulse"></div>
      <div className="absolute -bottom-10 left-10 w-32 h-32 rounded-full bg-space-highlight/20 blur-3xl animation-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default ContactSection;
