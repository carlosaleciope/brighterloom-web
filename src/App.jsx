import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NoiseOverlay = () => (
  <div className="noise-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Consultation from './components/Consultation';
import { Routes, Route } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null, info: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { this.setState({ info }); }
  render() {
    if (this.state.hasError) return <div className="p-8 bg-[#111] text-red-400 font-mono min-h-screen w-full overflow-auto z-[999] relative">
      <h1 className="text-2xl mb-4 font-bold">React Crash</h1>
      <div className="mb-4 text-white">{String(this.state.error)}</div>
      <pre className="text-xs text-red-300 whitespace-pre-wrap">{this.state.info?.componentStack}</pre>
    </div>;
    return this.props.children;
  }
}

function App() {
  return (
    <div className="min-h-screen relative">
      <NoiseOverlay />
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <Pricing />
            <Footer />
          </>
        } />
        <Route path="/consult" element={<Consultation />} />
      </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
