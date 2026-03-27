import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Terminal, Calendar, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ShufflerCard = () => {
  const [order, setOrder] = useState([0, 1, 2]);
  const statuses = [
    { label: "AI System Deployed", value: "$42k MRR Generated" },
    { label: "Revenue Pipeline Active", value: "Conversion +34%" },
    { label: "Model Trained", value: "Accuracy 99.8%" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setOrder(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[240px] w-full flex items-end justify-center pb-8 border border-border rounded-[2rem] bg-surface overflow-hidden group">
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Activity size={18} className="text-textDark" />
        <span className="font-mono text-xs font-semibold tracking-tight uppercase">Revenue Systems</span>
      </div>
      
      <div className="relative w-full max-w-[80%] h-[100px]">
        {statuses.map((status, index) => {
          const position = order.indexOf(index);
          let y = 0, scale = 1, opacity = 1, zIndex = 30;
          if (position === 1) { y = -14; scale = 0.94; opacity = 0.7; zIndex = 20; }
          if (position === 2) { y = -28; scale = 0.88; opacity = 0.4; zIndex = 10; }

          return (
            <div 
              key={index}
              className="absolute top-0 left-0 w-full bg-background border border-border p-4 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between"
              style={{
                transform: `translateY(${y}px) scale(${scale})`,
                opacity,
                zIndex,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="text-[11px] font-mono text-textLight">{status.label}</div>
              <div className="text-sm font-sans font-bold mt-1 text-accent tracking-tight">{status.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState("");
  const fullText = "Replacing manual workflows...\nInjecting intelligent ops...\nOptimizing output 400x.\nOperations scaled.";
  
  useEffect(() => {
    let index = 0;
    let timer;
    const type = () => {
      setText(fullText.slice(0, index));
      index++;
      if (index <= fullText.length) {
        timer = setTimeout(type, Math.random() * 40 + 20);
      } else {
        setTimeout(() => {
          index = 0;
          type();
        }, 4000);
      }
    };
    timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[240px] w-full flex flex-col justify-between p-6 rounded-[2rem] bg-textDark overflow-hidden shadow-xl">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-background">
          <Terminal size={18} />
          <span className="font-mono text-[11px] font-semibold tracking-tight uppercase">Intelligent Ops</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">Live Feed</span>
        </div>
      </div>
      
      <div className="flex-1 mt-6 text-[#F5F3EE] font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {text}<span className="inline-block w-[6px] h-[14px] bg-accent align-middle ml-[2px] animate-pulse"></span>
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const container = useRef(null);
  const cursorRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      const targetCell = container.current.querySelector('.day-wed');
      
      const containerRect = container.current.getBoundingClientRect();
      const cellRect = targetCell.getBoundingClientRect();
      const btnRect = btnRef.current.getBoundingClientRect();
      
      const cellX = cellRect.left - containerRect.left + cellRect.width / 2;
      const cellY = cellRect.top - containerRect.top + cellRect.height / 2;
      const btnX = btnRect.left - containerRect.left + btnRect.width / 2;
      const btnY = btnRect.top - containerRect.top + btnRect.height / 2;

      tl.set(cursorRef.current, { x: 200, y: 180, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: cellX, y: cellY, duration: 0.8, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to(targetCell, { backgroundColor: '#E63B2E', color: '#FFFFFF', borderColor: '#E63B2E', duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: btnX, y: btnY, duration: 0.7, ease: 'power2.inOut', delay: 0.2 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to(btnRef.current, { scale: 0.95, duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(btnRef.current, { scale: 1, duration: 0.1 }, "<")
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to(targetCell, { backgroundColor: 'transparent', color: '#111111', borderColor: 'transparent', duration: 0.3, delay: 0.8 });
    }, container);

    return () => ctx.revert();
  }, []);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={container} className="relative h-[240px] w-full flex flex-col p-6 border border-border rounded-[2rem] bg-surface overflow-hidden">
      <div className="flex items-center gap-2 mb-8">
        <Calendar size={18} className="text-textDark" />
        <span className="font-mono text-[11px] font-semibold tracking-tight uppercase">Scale Protocol</span>
      </div>

      <div className="flex justify-between items-center w-full px-2">
        {days.map((d, i) => (
          <div 
            key={i} 
            className={`w-7 h-7 rounded-sm flex items-center justify-center font-mono text-[11px] font-bold text-textDark border ${i === 3 ? 'day-wed border-transparent' : 'border-transparent'}`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="mt-auto self-end">
        <button ref={btnRef} className="px-5 py-[6px] bg-background border border-border text-textDark rounded-lg shadow-sm font-sans text-xs font-bold w-[90px]">
          Deploy
        </button>
      </div>

      <div ref={cursorRef} className="absolute top-0 left-0 z-50 pointer-events-none drop-shadow-md" style={{ marginLeft: '-8px', marginTop: '-8px' }}>
        <MousePointer2 size={24} className="text-textDark fill-background" />
      </div>
    </div>
  );
};

const Features = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={container} className="w-full py-24 px-6 md:px-16 bg-background relative z-20 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-textDark tracking-tight">Functional Artifacts</h2>
          <p className="font-mono text-textLight mt-4 max-w-xl text-sm">Systems engineered for maximum impact. No decorations, pure output.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="feature-card flex flex-col gap-5">
            <ShufflerCard />
            <div className="px-1">
              <h3 className="font-sans font-bold text-xl tracking-tight">Deploy Revenue Systems</h3>
              <p className="font-sans text-[15px] pt-1 leading-relaxed text-textLight">Generate measurable returns with AI integrations modeled on high-conversion algorithms.</p>
            </div>
          </div>
          
          <div className="feature-card flex flex-col gap-5">
            <TypewriterCard />
            <div className="px-1">
              <h3 className="font-sans font-bold text-xl tracking-tight">Intelligent Operations</h3>
              <p className="font-sans text-[15px] pt-1 leading-relaxed text-textLight">Replace manual, brittle workflows with precise, code-driven orchestration logic.</p>
            </div>
          </div>
          
          <div className="feature-card flex flex-col gap-5">
            <SchedulerCard />
            <div className="px-1">
              <h3 className="font-sans font-bold text-xl tracking-tight">Scale Indefinitely</h3>
              <p className="font-sans text-[15px] pt-1 leading-relaxed text-textLight">Build the architecture once. Push it to production. Let it operate globally without overhead.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
