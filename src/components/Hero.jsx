import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative min-h-[100dvh] w-full pt-0 overflow-hidden flex flex-col justify-end pb-32 px-6 md:px-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2669" 
          alt="Clean technological architecture" 
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="flex flex-col gap-1">
            <span className="hero-elem font-sans font-bold text-5xl md:text-6xl text-textDark tracking-tight">
              Deploy the
            </span>
            <span className="hero-elem font-drama italic text-7xl md:text-[8rem] text-textDark leading-[0.9] -ml-1 mt-2">
              Intelligent Operations.
            </span>
          </h1>
          <p className="hero-elem mt-10 font-mono text-textLight text-lg md:text-xl max-w-xl leading-relaxed">
            Revenue-producing AI systems for the modern enterprise. Built once. Scaled indefinitely.
          </p>
          <div className="hero-elem mt-12">
            <Link to="/consult" className="btn-magnetic flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-sans font-semibold text-lg drop-shadow-lg w-fit transition-colors">
              <span className="relative z-10 flex items-center gap-2">Book a consultation <ArrowRight size={18} /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
