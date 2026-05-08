import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">Rechercher une filière</h2>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-red" role="status"></div></div>
      ) : formations.length > 0 ? (
        <div className="row g-4">
          {formations.map((form) => (
            <div className="col-md-6" key={form.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold text-dark">{form.name}</h5>
                    <span className="badge bg-red text-white">{form.type_of_formation}</span>
                  </div>
                  <h6 className="text-muted"><i className="bi bi-building me-2"></i>{form.institution?.name}</h6>
                  <p className="mt-3">{form.description}</p>
                  <button className="btn btn-outline-custom btn-sm mt-2">Plus de détails</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info border-0 bg-light-grey text-dark">
          Aucune formation disponible pour le moment.
        </div>
      )}
    </div>
  );
};

export default Formations;
