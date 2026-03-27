import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const splitText = (text) => {
  return text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden py-1 mr-[0.25em] -mb-[0.1em]">
      <span className="word-reveal inline-block translate-y-[120%]">{word}</span>
    </span>
  ));
};

const Philosophy = () => {
  const container = useRef(null);
  const parallaxBg = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(parallaxBg.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to('.word-reveal', {
        y: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={container} className="relative w-full py-40 md:py-52 bg-[#0E0E0E] overflow-hidden">
      <div 
        ref={parallaxBg}
        className="absolute top-[-20%] left-0 w-full h-[140%] opacity-[0.2] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 flex flex-col gap-24">
        <div className="max-w-2xl">
          <p className="font-mono text-accent uppercase tracking-wider text-sm mb-8 font-bold flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> The Manifesto
          </p>
          <h2 className="font-sans text-2xl md:text-3xl text-[#777777] font-medium leading-normal">
            {splitText('Most AI consulting focuses on: endless exploratory theory, generic wrapper products, and vendor lock-in.')}
          </h2>
        </div>
        
        <div className="max-w-4xl self-end text-left md:text-right">
          <h2 className="font-drama italic text-5xl md:text-7xl lg:text-[6rem] text-[#FFFFFF] leading-[1.05]">
            <span className="block mb-4 font-sans font-bold tracking-tight text-3xl md:text-4xl not-italic text-[#AAAAAA]">We focus on:</span>
            {splitText('Revenue-producing operations.')}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
