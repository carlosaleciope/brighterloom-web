import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Motif1 = () => (
  <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-[0.03] spin-slow text-textDark">
    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10" className="origin-center" style={{ animation: 'spin-reverse 30s linear infinite' }} />
    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const Motif2 = () => (
  <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-textDark-[0.05] overflow-hidden bg-textDark-[0.02] opacity-[0.4]">
    <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
    <div className="laser-line absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_20px_#E63B2E]"></div>
  </div>
);

const Motif3 = () => (
  <svg viewBox="0 0 400 200" className="w-[350px] md:w-[600px] opacity-[0.05] text-textDark">
    <path 
      className="ekg-path"
      d="M0,100 L150,100 L160,80 L175,150 L190,40 L205,120 L220,100 L400,100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const Protocol = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    // Inject keyframes for spin-reverse
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
    `;
    document.head.appendChild(style);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
        }
      });

      tl.to(cards[0], { scale: 0.9, filter: 'blur(20px)', opacity: 0.5, duration: 1 }, 0)
        .fromTo(cards[1], { yPercent: 100 }, { yPercent: 0, duration: 1 }, 0)
        
      tl.to(cards[0], { scale: 0.85, opacity: 0.2, duration: 1 }, 1)
        .to(cards[1], { scale: 0.9, filter: 'blur(20px)', opacity: 0.5, duration: 1 }, 1)
        .fromTo(cards[2], { yPercent: 100 }, { yPercent: 0, duration: 1 }, 1);

      // SVG Animations
      gsap.to('.spin-slow', { rotation: 360, duration: 40, repeat: -1, ease: 'none' });
      gsap.to('.laser-line', { y: 450, duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      
      gsap.set('.ekg-path', { strokeDasharray: 1000, strokeDashoffset: 1000 });
      gsap.to('.ekg-path', { strokeDashoffset: 0, duration: 3, repeat: -1, ease: 'power1.inOut' });

    }, container);
    
    return () => {
      ctx.revert();
      document.head.removeChild(style);
    };
  }, []);

  const steps = [
    {
      num: "01",
      title: "Diagnostic & Strategy",
      desc: "Analyzing your manual workflows to architect a custom revenue-producing AI system.",
      motif: <Motif1 />,
      bg: "bg-[#FAFAFA]"
    },
    {
      num: "02",
      title: "Intelligent Build",
      desc: "Replacing brittle processes with deterministic orchestration logic. Pure output.",
      motif: <Motif2 />,
      bg: "bg-[#F4F4F5]"
    },
    {
      num: "03",
      title: "Infinite Scale",
      desc: "Deploying the finished system globally. Build once, scale indefinitely without overhead.",
      motif: <Motif3 />,
      bg: "bg-[#EAEAEA]"
    }
  ];

  return (
    <section id="protocol" ref={container} className="relative h-screen w-full bg-background overflow-hidden border-t border-border/40">
      {steps.map((step, i) => (
        <div 
          key={i} 
          className={`protocol-card absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-6 ${step.bg}`}
          style={{ zIndex: i + 1, y: i === 0 ? 0 : '100%' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {step.motif}
          </div>
          
          <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
            <span className="font-mono text-accent text-sm md:text-base tracking-widest uppercase font-bold mb-6">Phase {step.num}</span>
            <h2 className="font-sans font-bold text-5xl md:text-7xl text-textDark tracking-tight mb-8">
              {step.title}
            </h2>
            <p className="font-sans text-lg md:text-xl text-textLight leading-relaxed max-w-xl">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Protocol;
