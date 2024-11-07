import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Tech Weekly Podcast",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Scribe has revolutionized our podcast production workflow. What used to take hours now takes minutes, and the accuracy is impressive.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Professor",
      company: "Stanford University",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "As an educator, Scribe has been invaluable for making my lectures more accessible. The automatic transcription is remarkably accurate.",
      rating: 5
    },
    {
      name: "Lisa Martinez",
      role: "Project Manager",
      company: "Innovation Corp",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      quote: "We use Scribe for all our team meetings. It's made our documentation process so much more efficient and reliable.",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 left-0 right-0 p-4 flex justify-between items-center bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 href="#Scribe"className="text-3xl font-bold mr-4">Scribe</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#features" className="hover:text-gray-400">Features</a></li>
              <li><a href="#use-cases" className="hover:text-gray-400">Use Cases</a></li>
              <li><a href="#Testimonials" className="hover:text-gray-400">Testimonials</a></li>
              <li><a href="#billing" className="hover:text-gray-400">Billing</a></li>
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
        <section id="Scribe" className="min-h-screen flex flex-col justify-center items-center text-center px-4">
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

        <section id="use-cases" className="min-h-screen bg-gray-800 flex flex-col justify-center items-center text-center px-4 py-16">
          <h2 className="text-4xl font-bold mb-12">Use Cases</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition duration-300">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <p>Transform lecture recordings into searchable notes. Perfect for students and educators.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition duration-300">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-4">Business</h3>
              <p>Convert meeting recordings into accurate minutes. Ideal for teams and professionals.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition duration-300">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-semibold mb-4">Content Creation</h3>
              <p>Turn podcasts and interviews into text content. Perfect for content creators.</p>
            </div>
          </div>
        </section>

        <section id="Testimonials" className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-700 rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'fill-current text-yellow-500' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-gray-300">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-400">
              <span className="font-semibold text-xl">4.8</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                ))}
              </div>
              <span className="text-sm">from 500+ reviews</span>
            </div>
          </div>
        </div>
      </section>


        <section id="billing" className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-16">
          <h2 className="text-4xl font-bold mb-12">Simple, Transparent Pricing</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg hover:border-gray-500 transition duration-300">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-4">$9<span className="text-xl font-normal">/mo</span></div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5 hours of transcription
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Basic editing tools
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Email support
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition duration-300">
                Get Started
              </button>
            </div>
            
            <div className="bg-gray-800 border-2 border-blue-500 p-8 rounded-lg transform scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">POPULAR</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-4">$29<span className="text-xl font-normal">/mo</span></div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  20 hours of transcription
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced editing tools
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Get Started
              </button>
            </div>

            <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg hover:border-gray-500 transition duration-300">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-4">Custom</div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited transcription
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom integration
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  24/7 dedicated support
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
        
        

      </main>
      <footer className="bg-gray-800 bg-opacity-90 p-4 text-center">
        <p>&copy; 2024 Scribe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
