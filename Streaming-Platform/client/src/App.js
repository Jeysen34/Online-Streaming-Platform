import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage'; 
import AboutPage from './AboutPage'; 
import AuthPage from './AuthPage';

function App() {
  return (
    <Router>
      <Header />

      <Container fluid className="bg-dark text-white py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
