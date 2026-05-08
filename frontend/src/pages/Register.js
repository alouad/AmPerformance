import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    email: '',
    password: '',
    niveauEtude: '',
    filiere: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate API registration
    alert('Inscription réussie !');
    navigate('/login');
  };

  return (
    <div className="auth-wrapper py-5">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark-red">Créer un compte</h2>
          <p className="text-muted">Rejoignez la plateforme et trouvez votre voie !</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-dark">Prénom</label>
              <input 
                type="text" 
                className="form-control" 
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-dark">Nom</label>
              <input 
                type="text" 
                className="form-control" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-dark">Adresse Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold text-dark">Niveau d'études actuel</label>
              <select 
                className="form-select form-control" 
                name="niveauEtude"
                value={formData.niveauEtude}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez...</option>
                <option value="Bac">Baccalauréat</option>
                <option value="Bac+2">Bac +2</option>
                <option value="Bac+3">Bac +3 / Licence</option>
                <option value="Bac+5">Bac +5 / Master</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-dark">Filière d'intérêt</label>
              <input 
                type="text" 
                className="form-control" 
                name="filiere"
                placeholder="Ex: Informatique, Médecine..."
                value={formData.filiere}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold text-dark">Mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary-custom w-100 py-2 mb-3">
            Créer mon compte
          </button>
        </form>
        
        <div className="text-center mt-3">
          <span className="text-muted">Vous avez déjà un compte ? </span>
          <Link to="/login" className="text-red fw-bold text-decoration-none">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
