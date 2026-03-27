import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: "Strategic Discovery",
      desc: "Audit existing manual workflows and identify high-leverage AI opportunities.",
      price: "Assessment",
      features: ["Workflow Process Mapping", "ROI Feasibility Study", "Data Readiness Check", "Architecture Proposal"],
      cta: "Request Audit",
      pop: false
    },
    {
      name: "Intelligent Build",
      desc: "End-to-end development and deployment of revenue-producing AI systems.",
      price: "Custom",
      features: ["Deterministic Orchestration", "Custom LLM Integrations", "Security & Compliance Setup", "Zero-Hallucination Guardrails", "API & Webhook Hookups"],
      cta: "Start the Build",
      pop: true
    },
    {
      name: "Enterprise Partnership",
      desc: "Continuous scaling and infrastructure maintenance for global organizations.",
      price: "Retainer",
      features: ["Uncapped Global Scaling", "24/7 SLA Support", "Dedicated Engineers", "Continuous Model Fine-tuning"],
      cta: "Contact Sales",
      pop: false
    }
  ];

  return (
    <section id="pricing" ref={container} className="w-full py-32 px-6 md:px-16 bg-background relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-textDark tracking-tight">Engagement Models</h2>
          <p className="font-mono text-textLight mt-6 text-sm">From initial feasibility to global enterprise scaling.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`pricing-card flex flex-col p-8 rounded-[2rem] border ${plan.pop ? 'bg-textDark text-background border-textDark scale-100 md:scale-105 shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-10' : 'bg-surface border-border text-textDark'}`}
            >
              <h3 className="font-sans font-bold text-2xl">{plan.name}</h3>
              <p className={`font-sans text-[15px] mt-3 leading-relaxed ${plan.pop ? 'text-[#AAAAAA]' : 'text-textLight'}`}>
                {plan.desc}
              </p>
              
              <div className="mt-8 mb-8 pb-8 border-b border-opacity-10 border-current">
                <div className="font-mono text-[11px] uppercase tracking-wider font-bold mb-2">Investment</div>
                <div className="font-drama text-4xl">{plan.price}</div>
              </div>
              
              <ul className="flex flex-col gap-5 flex-1 mb-10">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check size={18} className={`shrink-0 mt-0.5 ${plan.pop ? 'text-accent' : 'text-textDark'}`} />
                    <span className="font-sans text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/consult" 
                className={`btn-magnetic w-full py-4 rounded-full font-sans font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-colors
                  ${plan.pop ? 'bg-accent text-white' : 'bg-background border border-border text-textDark hover:bg-black hover:text-white'}`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">{plan.cta} <ArrowRight size={16} /></span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
