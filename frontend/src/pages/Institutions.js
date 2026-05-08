import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">Établissements partenaires</h2>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-red" role="status"></div></div>
      ) : institutions.length > 0 ? (
        <div className="row g-4">
          {institutions.map((inst) => (
            <div className="col-md-4" key={inst.id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark-red">{inst.name}</h5>
                  <p className="card-text text-muted small"><i className="bi bi-geo-alt me-1"></i> {inst.location}</p>
                  <span className="badge bg-light-grey text-dark mb-3">{inst.type}</span>
                  <p className="card-text">{inst.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info border-0 bg-light-grey text-dark">
          Aucun établissement n'a été ajouté pour le moment.
        </div>
      )}
    </div>
  );
};

export default Institutions;
