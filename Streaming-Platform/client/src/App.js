import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import Selection from "./components/Selection";
import Authentication from "./components/Authentication";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Header />

      <Container fluid className="bg-dark text-white py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/selection/:id" element={<Selection />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
