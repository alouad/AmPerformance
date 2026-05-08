import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Formations from './pages/Formations';
import Institutions from './pages/Institutions';
import Articles from './pages/Articles';
import RendezVous from './pages/RendezVous';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orientations" element={<Formations />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="/profile" element={<div className="container py-5 text-center"><h1>Mon Profil</h1></div>} />
          </Routes>
        </main>
        
        <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
          <div className="container">
            <div className="row">
              <div className="col-md-5 mb-4">
                <h4 className="fw-bold mb-3">
                  <span className="text-white">AMORIENTATION</span>
                  <span className="text-red">.MA</span>
                </h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', maxWidth: '350px' }}>
                  Votre plateforme marocaine d'orientation académique pour trouver votre voie idéale.
                </p>
                <div className="d-flex mt-3">
                  <a href="#!" className="social-icon"><i className="bi bi-facebook"></i></a>
                  <a href="#!" className="social-icon"><i className="bi bi-instagram"></i></a>
                  <a href="#!" className="social-icon"><i className="bi bi-twitter-x"></i></a>
                  <a href="#!" className="social-icon"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <h6 className="fw-bold text-white mb-4">Liens rapides</h6>
                <a href="/" className="footer-link">Accueil</a>
                <a href="/institutions" className="footer-link">Établissements</a>
                <a href="/orientations" className="footer-link">Formations</a>
                <a href="/articles" className="footer-link">Articles</a>
              </div>
              <div className="col-md-4 mb-4">
                <h6 className="fw-bold text-white mb-4">Contact</h6>
                <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>Email: contact@amorientation.ma</p>
                <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>Tél: +212 522 255 027 / +212 760 109 182</p>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Adresse: Bureau 449, 4ème étage, Casablanca</p>
              </div>
            </div>
            <hr className="mt-4 mb-4" style={{ borderColor: '#404040' }} />
            <div className="text-center" style={{ fontSize: '0.8rem', color: '#888' }}>
              &copy; 2026 AMORIENTATION.MA - Tous droits réservés
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
