import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RendezVous = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ date: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold text-dark mb-3">Connexion requise</h3>
        <p className="text-muted mb-4">Vous devez être connecté pour prendre un rendez-vous avec un conseiller.</p>
        <button onClick={() => navigate('/login')} className="btn btn-primary-custom">Se connecter</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setFormData({ date: '', notes: '' });
    } catch (err) {
      setError("Erreur lors de la réservation. Veuillez vérifier vos données.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="fw-bold text-dark text-center mb-4">Prendre rendez-vous</h2>
            
            {success && (
              <div className="alert alert-success border-0 bg-light-green">
                <i className="bi bi-check-circle-fill me-2"></i>
                Votre rendez-vous a été enregistré ! Un e-mail de confirmation a été envoyé.
              </div>
            )}
            
            {error && <div className="alert alert-danger border-0">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold">Date souhaitée</label>
                <input 
                  type="datetime-local" 
                  className="form-control" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Motif du rendez-vous (Notes)</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Expliquez brièvement votre besoin d'orientation..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 py-2" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Confirmer le rendez-vous'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RendezVous;
