import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef(null);

  const handleGetStarted = () => {
    navigate('/record');
    console.log("Navigating to upload page...");
  };

  const handleSignUp = () => {
    navigate('/signup');
    console.log("Opening sign up...");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const videoPosition = videoRef.current.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (videoPosition < screenPosition) {
          videoRef.current.style.opacity = '1';
          videoRef.current.style.transform = 'translateY(0)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 left-0 right-0 p-4 flex justify-between items-center bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4">Scribe</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#features" className="hover:text-gray-400">Features</a></li>
              </ul>
          </nav>
        </div>
        <button onClick={toggleMenu} className="text-gray-100 focus:outline-none md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 text-gray-100 rounded-md shadow-lg z-20 md:hidden">
          <ul className="py-2">
            <li><a href="#features" className="block px-4 py-2 hover:bg-gray-700">Features</a></li>
            <li><a href="#billing" className="block px-4 py-2 hover:bg-gray-700">Billing</a></li>
          </ul>
        </div>
      )}
      <main>
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-5xl font-bold mb-6">Welcome to Scribe</h2>
          <p className="text-xl mb-8">Transform your audio into text with the power of AI</p>
          <div className="space-x-4">
            <button onClick={handleGetStarted} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition duration-300">
              Get Started
            </button>
            <button onClick={handleSignUp} className="bg-transparent border-2 border-gray-100 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 hover:text-gray-800 transition duration-300">
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className="bg-transparent border-2 border-gray-100 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 hover:text-gray-800 transition duration-300">
              Log In
            </button>
          </div>
        </section>
        
        <section id="features" className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-16">
          <h2 className="text-4xl font-bold mb-12">Features</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div 
                ref={videoRef}
                className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
              >
                <img src="/api/placeholder/640/360" alt="Video placeholder" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-2">Accurate Transcription</h3>
                <p>Our AI model provides industry-leading accuracy in transcribing audio content.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
                <p>Seamlessly integrate Scribe into your existing workflow with our robust API.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Plugin Install</h3>
                <p>A plugin that can be used during meetings or classes.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Other sections with similar color adjustments */}

      </main>
      <footer className="bg-gray-800 bg-opacity-90 p-4 text-center">
        <p>&copy; 2024 Scribe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
