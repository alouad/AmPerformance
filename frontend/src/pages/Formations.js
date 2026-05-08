import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/programs');
        setFormations(response.data);
      } catch (error) {
        console.error("Erreur", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFormations();
  }, []);

  const filteredFormations = formations.filter(form => {
    const matchSearch = form.name.toLowerCase().includes(search.toLowerCase()) || 
                        (form.institution?.name && form.institution.name.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter ? form.type_of_formation === typeFilter : true;
    return matchSearch && matchType;
  });

  const uniqueTypes = [...new Set(formations.map(f => f.type_of_formation))];

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">Rechercher une filière</h2>

      {/* Search and Filter Navbar */}
      <div className="row mb-4 g-2">
        <div className="col-md-8">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Rechercher par nom de filière ou établissement..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">Tous les types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-red" role="status"></div></div>
      ) : filteredFormations.length > 0 ? (
        <div className="row g-4">
          {filteredFormations.map((form) => (
            <div className="col-md-6" key={form.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold text-dark">{form.name}</h5>
                    <span className="badge bg-red text-white">{form.type_of_formation}</span>
                  </div>
                  <h6 className="text-muted"><i className="bi bi-building me-2"></i>{form.institution?.name}</h6>
                  <p className="mt-3 flex-grow-1">{form.description}</p>
                  <button 
                    className="btn btn-outline-custom btn-sm mt-2 w-auto align-self-start"
                    onClick={() => setSelectedForm(form)}
                    data-bs-toggle="modal" 
                    data-bs-target="#formationModal"
                  >
                    Plus de détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info border-0 bg-light-grey text-dark">
          Aucune formation trouvée pour cette recherche.
        </div>
      )}

      {/* Modal */}
      <div className="modal fade" id="formationModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white border-0">
              <h5 className="modal-title fw-bold">{selectedForm?.name}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <span className="badge bg-red me-2">{selectedForm?.type_of_formation}</span>
                <span className="text-muted"><i className="bi bi-building"></i> {selectedForm?.institution?.name}</span>
              </div>
              <h6 className="fw-bold mt-4">Spécialité</h6>
              <p>{selectedForm?.specialty || 'Généraliste'}</p>

              <h6 className="fw-bold mt-4">Description complète</h6>
              <p>{selectedForm?.description}</p>

              <h6 className="fw-bold mt-4">Conditions d'admission (Exemple)</h6>
              <ul>
                <li>Baccalauréat avec mention (selon les filières).</li>
                <li>Réussite au concours écrit ou entretien oral.</li>
                <li>Dossier académique (bulletins, etc).</li>
              </ul>
            </div>
            <div className="modal-footer border-0">
              <a href="/rendez-vous" className="btn btn-primary-custom">Prendre un rendez-vous d'orientation</a>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formations;
