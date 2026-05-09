import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  
  // Forms states
  const [instForm, setInstForm] = useState({ name: '', location: '', type: 'Université Publique', description: '', foundation_year: '', website: '', domaines: '' });
  const [resForm, setResForm] = useState({ title: '', type: 'Guide', content: '', author: 'Conseiller AmOrientation' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAppointments();
    }
  }, [user]);

  const getHeaders = () => ({
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Accept': 'application/json' }
  });

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/appointments', getHeaders());
      setAppointments(res.data);
    } catch (e) { console.error(e); }
  };

  const confirmAppt = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/appointments/${id}/status`, { status: 'confirmé' }, getHeaders());
      fetchAppointments();
      setMsg('Rendez-vous confirmé !');
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { console.error(e); }
  };

  const handleInstSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/admin/institutions', instForm, getHeaders());
      setMsg('Établissement ajouté avec succès !');
      setInstForm({ name: '', location: '', type: 'Université Publique', description: '', foundation_year: '', website: '', domaines: '' });
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { console.error(e); }
  };

  const handleResSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/admin/resources', resForm, getHeaders());
      setMsg('Article ajouté avec succès !');
      setResForm({ title: '', type: 'Guide', content: '', author: 'Conseiller AmOrientation' });
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { console.error(e); }
  };

  if (!user || user.role !== 'admin') return <div className="text-center py-5">Accès refusé</div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-dark"><i className="bi bi-shield-lock text-red me-2"></i>Espace Conseiller (Admin)</h2>
      
      {msg && <div className="alert alert-success shadow-sm">{msg}</div>}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="list-group shadow-sm">
            <button className={`list-group-item list-group-item-action ${activeTab === 'appointments' ? 'active bg-dark-red border-0' : ''}`} onClick={() => setActiveTab('appointments')}>
              <i className="bi bi-calendar-check me-2"></i> Rendez-vous
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'institutions' ? 'active bg-dark-red border-0' : ''}`} onClick={() => setActiveTab('institutions')}>
              <i className="bi bi-building me-2"></i> Établissements
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'resources' ? 'active bg-dark-red border-0' : ''}`} onClick={() => setActiveTab('resources')}>
              <i className="bi bi-journal-text me-2"></i> Articles
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card shadow-sm border-0 p-4">
            
            {/* APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div>
                <h4 className="fw-bold mb-4">Gestion des Rendez-vous</h4>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Étudiant</th>
                        <th>Date & Heure</th>
                        <th>Notes</th>
                        <th>Statut</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.length === 0 ? <tr><td colSpan="5" className="text-center">Aucun rendez-vous.</td></tr> : appointments.map(a => (
                        <tr key={a.id}>
                          <td className="fw-bold">{a.student_name || 'Étudiant'}</td>
                          <td>{new Date(a.date).toLocaleString('fr-FR')}</td>
                          <td>{a.notes || '-'}</td>
                          <td>
                            <span className={`badge ${a.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                              {a.status === 'pending' ? 'En attente' : 'Confirmé'}
                            </span>
                          </td>
                          <td>
                            {a.status === 'pending' && (
                              <button onClick={() => confirmAppt(a.id)} className="btn btn-sm btn-primary-custom">
                                Confirmer
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INSTITUTIONS TAB */}
            {activeTab === 'institutions' && (
              <div>
                <h4 className="fw-bold mb-4">Ajouter un Établissement</h4>
                <form onSubmit={handleInstSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Nom</label>
                      <input type="text" className="form-control" required value={instForm.name} onChange={e => setInstForm({...instForm, name: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label>Ville</label>
                      <input type="text" className="form-control" required value={instForm.location} onChange={e => setInstForm({...instForm, location: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label>Type</label>
                      <select className="form-select" value={instForm.type} onChange={e => setInstForm({...instForm, type: e.target.value})}>
                        <option value="Université Publique">Université Publique</option>
                        <option value="École d'Ingénieurs">École d'Ingénieurs</option>
                        <option value="École de Commerce">École de Commerce</option>
                        <option value="Université Privée">Université Privée</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Année de fondation</label>
                      <input type="text" className="form-control" value={instForm.foundation_year} onChange={e => setInstForm({...instForm, foundation_year: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label>Site Web</label>
                      <input type="url" className="form-control" value={instForm.website} onChange={e => setInstForm({...instForm, website: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label>Domaines couverts</label>
                      <input type="text" className="form-control" placeholder="Ex: Informatique, Gestion" value={instForm.domaines} onChange={e => setInstForm({...instForm, domaines: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label>Description complète</label>
                      <textarea className="form-control" rows="4" required value={instForm.description} onChange={e => setInstForm({...instForm, description: e.target.value})}></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary-custom">Ajouter l'établissement</button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div>
                <h4 className="fw-bold mb-4">Publier un Article</h4>
                <form onSubmit={handleResSubmit}>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label>Titre de l'article</label>
                      <input type="text" className="form-control" required value={resForm.title} onChange={e => setResForm({...resForm, title: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label>Type de ressource</label>
                      <select className="form-select" value={resForm.type} onChange={e => setResForm({...resForm, type: e.target.value})}>
                        <option value="Guide">Guide d'orientation</option>
                        <option value="Actualité">Actualité / Nouveauté</option>
                        <option value="Astuce">Astuce étudiante</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Auteur</label>
                      <input type="text" className="form-control" required value={resForm.author} onChange={e => setResForm({...resForm, author: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label>Contenu de l'article</label>
                      <textarea className="form-control" rows="6" required value={resForm.content} onChange={e => setResForm({...resForm, content: e.target.value})}></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary-custom">Publier l'article</button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
