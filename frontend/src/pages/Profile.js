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

  const [appointments, setAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoadingAppts(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        prenom: user.prenom || '',
        email: user.email || '',
        niveau_etudes: user.niveau_etudes || '',
        filiere: user.filiere || '',
        interets: user.interets || '',
        password: '',
        phone: user.phone || ''
      });

      fetchAppointments();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/appointments/${id}/cancel`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchAppointments();
    } catch (err) {
      console.error('Erreur annulation', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.password) delete dataToSubmit.password;
    
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
      <div className="row g-4">
        {/* Profile Form */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-dark-red text-white">
              <h5 className="mb-0 fw-bold"><i className="bi bi-person-circle me-2"></i>Mon Profil</h5>
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
                  <label className="form-label fw-bold">Téléphone</label>
                  <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="06XXXXXXXX" />
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

        {/* Appointments Section */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0 fw-bold"><i className="bi bi-calendar-check me-2"></i>Mes Rendez-vous</h5>
            </div>
            <div className="card-body p-4">
              {loadingAppts ? (
                <div className="text-center py-4"><div className="spinner-border text-red" role="status"></div></div>
              ) : appointments.length > 0 ? (
                <div className="list-group list-group-flush">
                  {appointments.map(appt => (
                    <div key={appt.id} className="list-group-item px-0 py-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6 className="fw-bold mb-0">Rendez-vous Conseiller</h6>
                        <span className={`badge ${
                          appt.status === 'confirmé' ? 'bg-success' : 
                          appt.status === 'annulé' ? 'bg-danger' : 
                          appt.status === 'passé' ? 'bg-secondary' : 'bg-warning text-dark'
                        }`}>
                          {appt.status === 'pending' ? 'En attente' : appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-muted small mb-1"><i className="bi bi-clock me-1"></i> Date prévue : {new Date(appt.date).toLocaleString('fr-FR', {dateStyle: 'medium', timeStyle: 'short'})}</p>
                      {appt.notes && <p className="mb-0 small text-secondary fst-italic">"{appt.notes}"</p>}
                      {appt.status === 'pending' && (
                        <button onClick={() => cancelAppointment(appt.id)} className="btn btn-sm btn-outline-danger mt-2">
                          Annuler le rendez-vous
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-calendar-x display-4 text-muted mb-3 d-block"></i>
                  <p className="text-muted">Vous n'avez pris aucun rendez-vous pour le moment.</p>
                  <button onClick={() => navigate('/rendez-vous')} className="btn btn-outline-custom btn-sm mt-2">
                    Prendre un rendez-vous
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
