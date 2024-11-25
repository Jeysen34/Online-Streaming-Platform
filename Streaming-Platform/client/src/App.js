import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import Selection from "./components/Selection";

function App() {
  return (
    <Router>
      <Header />

      <Container fluid className="bg-dark text-white py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/selection" element={<Selection />} />
        </Routes>
        <div className="App">
          <div className="AuthenticationTitle">
            <h1>Authentication</h1>
          </div>
          <div className="container">
            <UserRegister />
            <UserLogin />
          </div>
        </div>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
