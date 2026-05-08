import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedInst, setSelectedInst] = useState(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/institutions');
        setInstitutions(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const filteredInstitutions = institutions.filter(inst => {
    const matchSearch = inst.name.toLowerCase().includes(search.toLowerCase()) || inst.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter ? inst.type === typeFilter : true;
    return matchSearch && matchType;
  });

  const uniqueTypes = [...new Set(institutions.map(i => i.type))];

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">Établissements partenaires</h2>
      
      {/* Search and Filter Navbar */}
      <div className="row mb-4 g-2">
        <div className="col-md-8">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Rechercher par nom ou ville..." 
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
      ) : filteredInstitutions.length > 0 ? (
        <div className="row g-4">
          {filteredInstitutions.map((inst) => (
            <div className="col-md-4" key={inst.id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark-red">{inst.name}</h5>
                  <p className="card-text text-muted small"><i className="bi bi-geo-alt me-1"></i> {inst.location}</p>
                  <div>
                    <span className="badge bg-light-grey text-dark mb-3">{inst.type}</span>
                  </div>
                  <p className="card-text flex-grow-1">{inst.description}</p>
                  <button 
                    className="btn btn-outline-custom mt-auto"
                    onClick={() => setSelectedInst(inst)}
                    data-bs-toggle="modal" 
                    data-bs-target="#institutionModal"
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
          Aucun établissement trouvé pour cette recherche.
        </div>
      )}

      {/* Modal */}
      <div className="modal fade" id="institutionModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-dark-red text-white border-0">
              <h5 className="modal-title fw-bold">{selectedInst?.name}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <span className="badge bg-danger me-2">{selectedInst?.type}</span>
                <span className="text-muted"><i className="bi bi-geo-alt"></i> {selectedInst?.location}</span>
              </div>
              <h6 className="fw-bold">À propos</h6>
              <p>{selectedInst?.description}</p>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <h6 className="fw-bold"><i className="bi bi-calendar-event me-2"></i>Année de fondation</h6>
                  <p>{selectedInst?.foundation_year || 'Non communiquée'}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold"><i className="bi bi-globe me-2"></i>Site Web</h6>
                  <p>
                    {selectedInst?.website ? (
                      <a href={selectedInst.website} target="_blank" rel="noreferrer" className="text-decoration-none text-danger">
                        {selectedInst.website}
                      </a>
                    ) : 'Non communiqué'}
                  </p>
                </div>
              </div>
              
              <h6 className="fw-bold mt-3"><i className="bi bi-journal-bookmark me-2"></i>Domaines & Facultés</h6>
              <p>{selectedInst?.domaines || 'Cette information sera bientôt mise à jour avec la liste complète des facultés et domaines couverts.'}</p>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institutions;
