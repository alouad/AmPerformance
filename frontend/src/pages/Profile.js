import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    email: '',
    niveau_etudes: '',
    filiere: '',
    interets: '',
    password: ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        prenom: user.prenom || '',
        email: user.email || '',
        niveau_etudes: user.niveau_etudes || '',
        filiere: user.filiere || '',
        interets: user.interets || '',
        password: '' // Keep empty for security
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.password) {
      delete dataToSubmit.password; // Don't send empty password
    }
    
    try {
      await dispatch(updateUserProfile(dataToSubmit)).unwrap();
      setSuccessMsg('Profil mis à jour avec succès !');
      setFormData(prev => ({...prev, password: ''}));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="container py-5 text-center">Chargement du profil...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark-red text-white">
              <h4 className="mb-0 fw-bold"><i className="bi bi-person-circle me-2"></i>Mon Profil</h4>
            </div>
            <div className="card-body p-4">
              {successMsg && <div className="alert alert-success">{successMsg}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Nom</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Prénom</label>
                    <input type="text" name="prenom" className="form-control" value={formData.prenom} onChange={handleChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Nouveau Mot de passe (Laissez vide pour ne pas modifier)</label>
                  <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Niveau d'études</label>
                    <select name="niveau_etudes" className="form-select" value={formData.niveau_etudes} onChange={handleChange}>
                      <option value="">Sélectionner</option>
                      <option value="Baccalauréat">Baccalauréat</option>
                      <option value="Bac+2">Bac+2</option>
                      <option value="Bac+3">Bac+3</option>
                      <option value="Bac+5">Bac+5</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Filière / Domaine</label>
                    <input type="text" name="filiere" className="form-control" value={formData.filiere} onChange={handleChange} placeholder="Ex: Informatique, Gestion..." />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Centres d'intérêt</label>
                  <textarea name="interets" className="form-control" rows="3" value={formData.interets} onChange={handleChange} placeholder="Qu'est-ce qui vous passionne ?"></textarea>
                </div>

                <button type="submit" className="btn btn-primary-custom w-100 py-2" disabled={loading}>
                  {loading ? 'Sauvegarde...' : 'Enregistrer les modifications'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
