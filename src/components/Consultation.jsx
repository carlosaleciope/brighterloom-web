import React, { useState, useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, Calendar, Clock, CheckCircle2 } from 'lucide-react';

const Consultation = () => {
  const navigate = useNavigate();
  const container = useRef(null);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    details: ''
  });
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useLayoutEffect(() => {
    // Scroll to top when mounted
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.from('.consult-elem', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, [step]);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const times = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM', '10:00 PM'];
  
  const generateDates = () => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      result.push({
        num: nextDate.getDate(),
        dayStr: nextDate.toLocaleDateString('en-US', { weekday: 'short' }),
        monthStr: nextDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        fullStr: nextDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
    }
    return result;
  };
  const dates = generateDates();

  return (
    <div ref={container} className="min-h-screen bg-background relative selection:bg-accent selection:text-white pb-32">
      {/* Mini Nav */}
      <nav className="w-full px-6 md:px-16 py-8 flex justify-between items-center absolute top-0 left-0 z-50">
        <Link to="/" className="text-xl font-drama font-bold tracking-tight text-textDark flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          BRIGHTERLOOM
        </Link>
        <Link to="/" className="font-mono text-sm font-bold text-textLight hover:text-textDark transition-colors flex items-center gap-2">
          <ArrowLeft size={16} /> Return
        </Link>
      </nav>

      <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Col: Copy */}
        <div className="flex flex-col">
          <span className="consult-elem font-mono text-xs uppercase tracking-widest text-[#888] font-bold mb-6">Discovery Phase</span>
          <h1 className="consult-elem font-sans font-bold text-5xl md:text-7xl text-textDark tracking-tight leading-[1.05] mb-8">
            Initiate the <br/><span className="font-drama italic font-normal text-6xl md:text-[5.5rem] leading-[0.9]">Deployment.</span>
          </h1>
          <p className="consult-elem font-sans text-lg text-textLight leading-relaxed max-w-md">
            Schedule a high-level architectural review. We will audit your current manual workflows and determine the exact feasibility of substituting them with revenue-producing AI systems.
          </p>
          
          <div className="consult-elem mt-16 p-8 bg-surface rounded-[2rem] border border-border">
            <h3 className="font-sans font-bold text-lg mb-4">What to expect:</h3>
            <ul className="space-y-4 font-sans text-sm text-textDark">
              <li className="flex gap-3"><CheckCircle2 size={18} className="text-accent shrink-0" /> 45-minute technical review</li>
              <li className="flex gap-3"><CheckCircle2 size={18} className="text-accent shrink-0" /> Workflow identification & bottleneck analysis</li>
              <li className="flex gap-3"><CheckCircle2 size={18} className="text-accent shrink-0" /> Immediate feasibility rating</li>
            </ul>
          </div>
        </div>

        {/* Right Col: Booking Form */}
        <div className="consult-elem bg-white border border-border shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
          
          {step === 1 && (
            <div className="flex flex-col h-full animate-in fade-in">
              <h2 className="font-sans font-bold text-3xl tracking-tight mb-2">Select a Schedule</h2>
              <p className="font-sans text-sm text-textLight mb-10">All times in Eastern Standard Time (EST).</p>
              
              <div className="mb-8">
                <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-textDark mb-4">
                  <Calendar size={14} /> {dates[0].monthStr}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                  {dates.map((d, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all
                        ${selectedDate?.num === d.num ? 'border-accent bg-accent text-white shadow-lg scale-105' : 'border-border bg-surface text-textDark hover:border-[#aaa]'}`}
                    >
                      <span className="font-mono text-[10px] uppercase opacity-80">{d.dayStr}</span>
                      <span className="font-sans font-bold text-xl">{d.num}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-textDark mb-4">
                  <Clock size={14} /> Available Slots
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {times.map((t, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 rounded-lg border font-mono text-xs font-bold transition-all
                        ${selectedTime === t ? 'border-textDark bg-textDark text-white shadow-md' : 'border-border bg-transparent text-textDark hover:bg-surface'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <button 
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-magnetic w-full py-4 bg-accent text-white rounded-full font-sans font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  <span className="relative z-10 flex gap-2">Continue <ArrowRight size={16} /></span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col h-full animate-in fade-in">
              <button onClick={() => setStep(1)} className="text-textLight hover:text-textDark font-mono text-xs flex gap-1 items-center mb-6 transition-colors w-max">
                <ArrowLeft size={12} /> Back
              </button>
              <h2 className="font-sans font-bold text-3xl tracking-tight mb-2">Business Details</h2>
              <p className="font-sans text-sm text-textLight mb-8">Tell us about your organization and current workflows.</p>
              
              <form onSubmit={handleNext} className="flex flex-col gap-5 flex-1">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-textDark">Full Name *</label>
                    <input required className="px-4 py-3 rounded-xl border border-border bg-surface font-sans text-sm focus:outline-none focus:border-textDark transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-textDark">Company Name *</label>
                    <input required className="px-4 py-3 rounded-xl border border-border bg-surface font-sans text-sm focus:outline-none focus:border-textDark transition-colors" placeholder="Acme Corp" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-textDark">Work Email *</label>
                    <input required type="email" className="px-4 py-3 rounded-xl border border-border bg-surface font-sans text-sm focus:outline-none focus:border-textDark transition-colors" placeholder="jane@acme.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase text-textDark">Phone Number *</label>
                    <input required type="tel" className="px-4 py-3 rounded-xl border border-border bg-surface font-sans text-sm focus:outline-none focus:border-textDark transition-colors" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-6">
                  <label className="font-mono text-[10px] font-bold uppercase text-textDark">Current Workflow Bottlenecks</label>
                  <textarea rows={4} className="px-4 py-3 rounded-xl border border-border bg-surface font-sans text-sm focus:outline-none focus:border-textDark transition-colors resize-none" placeholder="We currently parse 5,000 PDFs a month manually..." />
                </div>

                <div className="mt-auto">
                  <button type="submit" className="btn-magnetic w-full py-4 bg-textDark text-background rounded-full font-sans font-bold text-sm flex justify-center items-center gap-2">
                    <span className="relative z-10 flex gap-2 w-full justify-center">Confirm Allocation <ArrowRight size={16} /></span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center text-center h-full py-12 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-sans font-bold text-3xl tracking-tight mb-4">Deployment Initiated.</h2>
              <p className="font-sans text-[15px] text-textLight mb-8 max-w-sm">
                Your consultation has been locked into the system. You will receive an encrypted calendar invite momentarily.
              </p>
              <div className="p-4 bg-surface rounded-xl border border-border flex flex-col gap-1 min-w-[200px] mb-12 text-left">
                <span className="font-mono text-[10px] font-bold text-textLight uppercase">Time Slot</span>
                <span className="font-sans font-bold text-textDark">{selectedDate?.fullStr} @ {selectedTime}</span>
              </div>
              
              <Link to="/" className="font-mono text-xs font-bold text-textDark border-b border-textDark pb-1 hover:text-accent hover:border-accent transition-colors">
                Return to Directory
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Consultation;
