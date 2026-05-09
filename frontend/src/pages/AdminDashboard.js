import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  
  // Data states
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [resources, setResources] = useState([]);
  
  // Forms states
  const emptyInst = { name: '', location: '', type: 'Université Publique', description: '', foundation_year: '', website: '', domaines: '' };
  const emptyRes = { title: '', type: 'Guide', content: '', author: 'Conseiller AmOrientation' };
  
  const [instForm, setInstForm] = useState(emptyInst);
  const [resForm, setResForm] = useState(emptyRes);
  const [editingInstId, setEditingInstId] = useState(null);
  const [editingResId, setEditingResId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    else if (user?.role !== 'admin') navigate('/');
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const getHeaders = () => ({
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Accept': 'application/json' }
  });

  const fetchData = async () => {
    try {
      const [apptRes, usersRes, instRes, resRes] = await Promise.all([
        axios.get('http://localhost:8000/api/admin/appointments', getHeaders()),
        axios.get('http://localhost:8000/api/admin/users', getHeaders()),
        axios.get('http://localhost:8000/api/institutions'),
        axios.get('http://localhost:8000/api/resources')
      ]);
      setAppointments(apptRes.data);
      setUsers(usersRes.data);
      setInstitutions(instRes.data);
      setResources(resRes.data);
    } catch (e) { console.error(e); }
  };

  const showMsg = (message) => {
    setMsg(message);
    setTimeout(() => setMsg(''), 3000);
  };

  // ================= CRUD APPOINTMENTS =================
  const confirmAppt = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/appointments/${id}/status`, { status: 'confirmé' }, getHeaders());
      fetchData(); showMsg('Rendez-vous confirmé !');
    } catch (e) { console.error(e); }
  };
  const deleteAppt = async (id) => {
    if(!window.confirm('Supprimer ce rendez-vous ?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/appointments/${id}`, getHeaders());
      fetchData(); showMsg('Rendez-vous supprimé !');
    } catch (e) { console.error(e); }
  };

  // ================= CRUD USERS =================
  const deleteUser = async (id) => {
    if(!window.confirm('Supprimer cet étudiant ? Toutes ses données seront perdues.')) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/users/${id}`, getHeaders());
      fetchData(); showMsg('Étudiant supprimé !');
    } catch (e) { console.error(e); }
  };

  // ================= CRUD INSTITUTIONS =================
  const handleInstSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingInstId) {
        await axios.put(`http://localhost:8000/api/admin/institutions/${editingInstId}`, instForm, getHeaders());
        showMsg('Établissement modifié avec succès !');
      } else {
        await axios.post('http://localhost:8000/api/admin/institutions', instForm, getHeaders());
        showMsg('Établissement ajouté avec succès !');
      }
      setInstForm(emptyInst); setEditingInstId(null); fetchData();
    } catch (e) { console.error(e); }
  };
  const deleteInst = async (id) => {
    if(!window.confirm('Supprimer cet établissement ?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/institutions/${id}`, getHeaders());
      fetchData(); showMsg('Établissement supprimé !');
    } catch (e) { console.error(e); }
  };

  // ================= CRUD RESOURCES =================
  const handleResSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingResId) {
        await axios.put(`http://localhost:8000/api/admin/resources/${editingResId}`, resForm, getHeaders());
        showMsg('Article modifié avec succès !');
      } else {
        await axios.post('http://localhost:8000/api/admin/resources', resForm, getHeaders());
        showMsg('Article ajouté avec succès !');
      }
      setResForm(emptyRes); setEditingResId(null); fetchData();
    } catch (e) { console.error(e); }
  };
  const deleteRes = async (id) => {
    if(!window.confirm('Supprimer cet article ?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/resources/${id}`, getHeaders());
      fetchData(); showMsg('Article supprimé !');
    } catch (e) { console.error(e); }
  };

  if (!user || user.role !== 'admin') return <div className="text-center py-5">Accès refusé</div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-dark"><i className="bi bi-shield-lock text-red me-2"></i>Espace Conseiller (CRUD Complet)</h2>
      
      {msg && <div className="alert alert-success shadow-sm">{msg}</div>}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="list-group shadow-sm">
            <button className={`list-group-item list-group-item-action ${activeTab === 'appointments' ? 'active bg-dark-red border-0' : ''}`} onClick={() => setActiveTab('appointments')}>
              <i className="bi bi-calendar-check me-2"></i> Rendez-vous
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'users' ? 'active bg-dark-red border-0' : ''}`} onClick={() => setActiveTab('users')}>
              <i className="bi bi-people me-2"></i> Étudiants
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'institutions' ? 'active bg-dark-red border-0' : ''}`} onClick={() => { setActiveTab('institutions'); setInstForm(emptyInst); setEditingInstId(null); }}>
              <i className="bi bi-building me-2"></i> Établissements
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'resources' ? 'active bg-dark-red border-0' : ''}`} onClick={() => { setActiveTab('resources'); setResForm(emptyRes); setEditingResId(null); }}>
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
                    <thead className="table-light"><tr><th>Étudiant</th><th>Date & Heure</th><th>Notes</th><th>Statut</th><th>Actions</th></tr></thead>
                    <tbody>
                      {appointments.length === 0 ? <tr><td colSpan="5" className="text-center">Aucun rendez-vous.</td></tr> : appointments.map(a => (
                        <tr key={a.id}>
                          <td className="fw-bold">{a.student_name || 'Étudiant'}</td>
                          <td>{new Date(a.date).toLocaleString('fr-FR')}</td>
                          <td>{a.notes || '-'}</td>
                          <td><span className={`badge ${a.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>{a.status === 'pending' ? 'En attente' : 'Confirmé'}</span></td>
                          <td>
                            {a.status === 'pending' && <button onClick={() => confirmAppt(a.id)} className="btn btn-sm btn-success me-2"><i className="bi bi-check"></i></button>}
                            <button onClick={() => deleteAppt(a.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div>
                <h4 className="fw-bold mb-4">Gestion des Étudiants</h4>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light"><tr><th>Nom</th><th>Email</th><th>Filière</th><th>Niveau</th><th>Actions</th></tr></thead>
                    <tbody>
                      {users.length === 0 ? <tr><td colSpan="5" className="text-center">Aucun étudiant.</td></tr> : users.map(u => (
                        <tr key={u.id}>
                          <td className="fw-bold">{u.name} {u.prenom}</td>
                          <td>{u.email}</td>
                          <td>{u.filiere || '-'}</td>
                          <td>{u.niveau_etudes || '-'}</td>
                          <td><button onClick={() => deleteUser(u.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button></td>
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
                <h4 className="fw-bold mb-4">{editingInstId ? 'Modifier' : 'Ajouter'} un Établissement</h4>
                <form onSubmit={handleInstSubmit} className="mb-5 bg-light-grey p-3 rounded">
                  <div className="row g-3">
                    <div className="col-md-6"><label>Nom</label><input type="text" className="form-control" required value={instForm.name} onChange={e => setInstForm({...instForm, name: e.target.value})} /></div>
                    <div className="col-md-6"><label>Ville</label><input type="text" className="form-control" required value={instForm.location} onChange={e => setInstForm({...instForm, location: e.target.value})} /></div>
                    <div className="col-md-6">
                      <label>Type</label>
                      <select className="form-select" value={instForm.type} onChange={e => setInstForm({...instForm, type: e.target.value})}>
                        <option value="Université Publique">Université Publique</option>
                        <option value="École d'Ingénieurs">École d'Ingénieurs</option>
                        <option value="École de Commerce">École de Commerce</option>
                        <option value="Université Privée">Université Privée</option>
                      </select>
                    </div>
                    <div className="col-md-6"><label>Année de fondation</label><input type="text" className="form-control" value={instForm.foundation_year} onChange={e => setInstForm({...instForm, foundation_year: e.target.value})} /></div>
                    <div className="col-md-6"><label>Site Web</label><input type="url" className="form-control" value={instForm.website} onChange={e => setInstForm({...instForm, website: e.target.value})} /></div>
                    <div className="col-md-6"><label>Domaines couverts</label><input type="text" className="form-control" value={instForm.domaines} onChange={e => setInstForm({...instForm, domaines: e.target.value})} /></div>
                    <div className="col-12"><label>Description complète</label><textarea className="form-control" rows="3" required value={instForm.description} onChange={e => setInstForm({...instForm, description: e.target.value})}></textarea></div>
                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-primary-custom">{editingInstId ? 'Mettre à jour' : 'Ajouter'}</button>
                      {editingInstId && <button type="button" className="btn btn-secondary" onClick={() => {setInstForm(emptyInst); setEditingInstId(null);}}>Annuler</button>}
                    </div>
                  </div>
                </form>
                
                <h5 className="fw-bold mb-3">Liste des établissements</h5>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light"><tr><th>Nom</th><th>Ville</th><th>Type</th><th>Actions</th></tr></thead>
                    <tbody>
                      {institutions.map(i => (
                        <tr key={i.id}>
                          <td className="fw-bold">{i.name}</td><td>{i.location}</td><td>{i.type}</td>
                          <td>
                            <button onClick={() => {setInstForm(i); setEditingInstId(i.id);}} className="btn btn-sm btn-warning me-2"><i className="bi bi-pencil"></i></button>
                            <button onClick={() => deleteInst(i.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div>
                <h4 className="fw-bold mb-4">{editingResId ? 'Modifier' : 'Publier'} un Article</h4>
                <form onSubmit={handleResSubmit} className="mb-5 bg-light-grey p-3 rounded">
                  <div className="row g-3">
                    <div className="col-md-12"><label>Titre</label><input type="text" className="form-control" required value={resForm.title} onChange={e => setResForm({...resForm, title: e.target.value})} /></div>
                    <div className="col-md-6">
                      <label>Type</label>
                      <select className="form-select" value={resForm.type} onChange={e => setResForm({...resForm, type: e.target.value})}>
                        <option value="Guide">Guide d'orientation</option>
                        <option value="Actualité">Actualité / Nouveauté</option>
                        <option value="Astuce">Astuce étudiante</option>
                      </select>
                    </div>
                    <div className="col-md-6"><label>Auteur</label><input type="text" className="form-control" required value={resForm.author} onChange={e => setResForm({...resForm, author: e.target.value})} /></div>
                    <div className="col-12"><label>Contenu</label><textarea className="form-control" rows="4" required value={resForm.content} onChange={e => setResForm({...resForm, content: e.target.value})}></textarea></div>
                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-primary-custom">{editingResId ? 'Mettre à jour' : 'Publier'}</button>
                      {editingResId && <button type="button" className="btn btn-secondary" onClick={() => {setResForm(emptyRes); setEditingResId(null);}}>Annuler</button>}
                    </div>
                  </div>
                </form>

                <h5 className="fw-bold mb-3">Liste des articles</h5>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light"><tr><th>Titre</th><th>Type</th><th>Auteur</th><th>Actions</th></tr></thead>
                    <tbody>
                      {resources.map(r => (
                        <tr key={r.id}>
                          <td className="fw-bold">{r.title}</td><td>{r.type}</td><td>{r.author}</td>
                          <td>
                            <button onClick={() => {setResForm(r); setEditingResId(r.id);}} className="btn btn-sm btn-warning me-2"><i className="bi bi-pencil"></i></button>
                            <button onClick={() => deleteRes(r.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
