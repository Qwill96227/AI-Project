import React, { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    console.log("Get Started clicked");
  };

  const handleSignUp = () => {
    console.log("Sign Up clicked");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white relative">
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Scribe</h1>
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
      
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white text-purple-600 rounded-md shadow-lg">
          <ul className="py-2">
            <li><button className="block px-4 py-2 hover:bg-purple-100 w-full text-left">Features</button></li>
            <li><button className="block px-4 py-2 hover:bg-purple-100 w-full text-left">Team</button></li>
            <li><button className="block px-4 py-2 hover:bg-purple-100 w-full text-left">Plugin Install</button></li>
          </ul>
        </div>
      )}
      
      <main className="text-center z-10">
        <h2 className="text-5xl font-bold mb-6">Welcome to Scribe</h2>
        <p className="text-xl mb-8">Transform your audio and video into text with the power of AI</p>
        <div className="space-x-4">
          <button 
            onClick={handleGetStarted}
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </button>
          <button 
            onClick={handleSignUp}
            className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </main>
      
      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p>&copy; 2024 Scribe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
