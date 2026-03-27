import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0E0E0E] text-[#F5F3EE] pt-24 pb-8 px-6 md:px-16 rounded-t-[3rem] md:rounded-t-[4rem] relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="font-drama font-bold text-3xl tracking-tight text-white">BRIGHTERLOOM</h2>
            <p className="font-sans text-sm text-[#888888] max-w-sm leading-relaxed">
              We deploy revenue-producing AI systems, replacing manual workflows with intelligent, scalable operations.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 w-max mt-4 bg-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#CCCCCC]">System Operational</span>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-8 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#666666] mb-2 font-bold">Platform</h4>
            <a href="#features" className="font-sans text-sm text-[#AAAAAA] hover:text-white transition-colors">Systems</a>
            <a href="#philosophy" className="font-sans text-sm text-[#AAAAAA] hover:text-white transition-colors">Manifesto</a>
            <a href="#protocol" className="font-sans text-sm text-[#AAAAAA] hover:text-white transition-colors">Protocol</a>
          </div>
          
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#666666] mb-2 font-bold">Company</h4>
            <a href="#" className="font-sans text-sm text-[#AAAAAA] hover:text-white transition-colors">About</a>
            <a href="#" className="font-sans text-sm text-[#AAAAAA] hover:text-white transition-colors">Careers</a>
            <a href="#pricing" className="font-sans text-sm text-[#AAAAAA] hover:text-white transition-colors">Engagement</a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[#666666]">
            &copy; {new Date().getFullYear()} Brighterloom. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-[11px] text-[#555555] hover:text-[#AAAAAA]">Privacy Policy</a>
            <a href="#" className="font-mono text-[11px] text-[#555555] hover:text-[#AAAAAA]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
