import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
            {/* Placeholder routes for later */}
            <Route path="/orientations" element={<div className="container py-5 text-center"><h1>Filières et Orientations</h1><p>En construction...</p></div>} />
            <Route path="/institutions" element={<div className="container py-5 text-center"><h1>Établissements</h1><p>En construction...</p></div>} />
            <Route path="/profile" element={<div className="container py-5 text-center"><h1>Mon Profil</h1><p>En construction...</p></div>} />
          </Routes>
        </main>
        
        <footer className="bg-white py-4 mt-auto text-center border-top">
          <div className="container">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} <span className="text-dark-red fw-bold">AmPerformance</span>. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
