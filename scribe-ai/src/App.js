import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import RecordPage from './RecordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
    </Router>
  );
}

export default App;