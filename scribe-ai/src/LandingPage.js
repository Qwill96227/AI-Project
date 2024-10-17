import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef(null);

  const handleGetStarted = () => {
    navigate('/record')
    console.log("Navigating to upload page...");
  };

  const handleSignUp = () => {
    navigate('/signup')
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
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-yellow-400 text-white">
      <header className="sticky top-0 left-0 right-0 p-4 flex justify-between items-center bg-green-500 bg-opacity-80 backdrop-filter backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4">Scribe</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#features" className="hover:text-gray-200">Features</a></li>
              <li><a href="#Use Cases" className="hover:text-gray-200">Use Cases</a></li>
              <li><a href="#billing" className="hover:text-gray-200">Billing</a></li>
               </ul>
          </nav>
        </div>
        <button onClick={toggleMenu} className="text-white focus:outline-none md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-green-600 text-white rounded-md shadow-lg z-20 md:hidden">
          <ul className="py-2">
            <li><a href="#features" className="block px-4 py-2 hover:bg-green-700">Features</a></li>
            <li><a href="#billing" className="block px-4 py-2 hover:bg-green-700">Billing</a></li>
          </ul>
        </div>
      )}
      <main>
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-5xl font-bold mb-6">Welcome to Scribe</h2>
          <p className="text-xl mb-8">Transform your audio into text with the power of AI</p>
          <div className="space-x-4">
            <button onClick={handleGetStarted} className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300">
              Get Started
            </button>
            <button onClick={handleSignUp} className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-green-500 transition duration-300">
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-green-500 transition duration-300">
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
                className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
              >
                <img src="/api/placeholder/640/360" alt="Video placeholder" className="w-full h-full object-cover" />
                {/* Replace the img tag with a video tag when you have the actual video */}
                {/* <video controls className="w-full h-full object-cover">
                  <source src="path_to_your_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
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
        <section id="use-cases" className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-16">
          <h2 className="text-4xl font-bold mb-12">Use Cases</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 text-left">
              <h3 className="text-2xl font-semibold mb-4">In the Classroom</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Transcribe lectures for students to review later</li>
                <li>Create accessible content for hearing-impaired students</li>
                <li>Generate notes from group discussions</li>
                </ul>
            </div>
            <div className="space-y-6 text-left">
              <h3 className="text-2xl font-semibold mb-4">In Meetings</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Capture meeting minutes automatically</li>
                <li>Create searchable archives of discussions</li>
                <li>Enable remote participants to follow along with live transcription</li>
                </ul>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-xl mb-6">Scribe AI transforms how you capture and utilize spoken information, making learning and collaboration more efficient and accessible than ever before.</p>
            <button onClick={handleGetStarted} className="bg-white text-green-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300">
              Try Scribe AI Today
            </button>
          </div>
        </section>
        
        <section id="billing" className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-16">
          <h2 className="text-4xl font-bold mb-12">Billing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-green-500 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <p className="text-4xl font-bold mb-4">$1.99<span className="text-sm font-normal">/month</span></p>
              <ul className="text-left mb-6">
                <li>✓ 100 minutes of transcription</li>
                <li>✓ Basic editing tools</li>
                <li>✓ Email support</li>
              </ul>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">Choose Plan</button>
            </div>
            <div className="bg-white text-green-500 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">$5.99<span className="text-sm font-normal">/month</span></p>
              <ul className="text-left mb-6">
                <li>✓ 500 minutes of transcription</li>
                <li>✓ Advanced editing tools</li>
                <li>✓ Priority email support</li>
                <li>✓ Custom vocabulary</li>
                <li>✓ Plugin Access</li>
              </ul>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">Choose Plan</button>
            </div>
            <div className="bg-white text-green-500 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-4">Custom</p>
              <ul className="text-left mb-6">
                <li>✓ Unlimited transcription</li>
                <li>✓ Full suite of editing tools</li>
                <li>✓ 24/7 phone support</li>
                <li>✓ API access</li>
                <li>✓ Custom integrations</li>
              </ul>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">Contact Sales</button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-green-500 bg-opacity-80 p-4 text-center">
        <p>&copy; 2024 Scribe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
