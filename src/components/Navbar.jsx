import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          targets: navRef.current,
          className: 'scrolled'
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4">
      <nav 
        ref={navRef}
        className="flex items-center justify-between w-full max-w-6xl px-8 py-4 transition-all duration-500 rounded-[3rem] text-textDark/90 
                   [&.scrolled]:bg-background/85 [&.scrolled]:backdrop-blur-xl [&.scrolled]:border [&.scrolled]:border-border [&.scrolled]:shadow-[0_4px_30px_rgba(0,0,0,0.03)]
                   [&.scrolled]:text-textDark"
      >
        <div className="text-xl font-drama font-bold tracking-tight text-textDark flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          BRIGHTERLOOM
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-tight text-textLight">
          <a href="#features" className="hover-lift hover:text-textDark transition-colors">Systems</a>
          <a href="#philosophy" className="hover-lift hover:text-textDark transition-colors">Philosophy</a>
          <a href="#protocol" className="hover-lift hover:text-textDark transition-colors">Protocol</a>
        </div>

        <Link to="/consult" className="btn-magnetic flex items-center gap-2 px-6 py-2.5 bg-textDark text-background rounded-full font-sans font-medium text-sm">
          <span className="relative z-10 flex items-center gap-2">Consultation <ArrowRight size={14} /></span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
