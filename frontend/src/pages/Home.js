import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section py-5 bg-white text-center">
        <div className="container py-5 mt-4">
          <h1 className="display-4 fw-bold text-dark-red mb-4">Trouvez votre voie avec <span className="text-red">AmPerformance</span></h1>
          <p className="lead text-grey mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            Explorez les différentes orientations académiques, trouvez l'établissement idéal et bénéficiez de recommandations personnalisées selon votre profil et vos aspirations.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary-custom btn-lg px-4 py-3">Commencer mon orientation</Link>
            <Link to="/institutions" className="btn btn-outline-custom btn-lg px-4 py-3">Explorer les établissements</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5 my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card-custom p-4 h-100 text-center">
              <div className="mb-3">
                <h2 className="text-red display-5">🎯</h2>
              </div>
              <h4 className="fw-bold text-dark-red">Recommandations</h4>
              <p className="text-muted">Des filières adaptées à votre profil, vos intérêts et votre niveau d'études.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-custom p-4 h-100 text-center">
              <div className="mb-3">
                <h2 className="text-red display-5">🏫</h2>
              </div>
              <h4 className="fw-bold text-dark-red">Établissements</h4>
              <p className="text-muted">Consultez les détails des universités et écoles supérieures avec un système de filtrage.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-custom p-4 h-100 text-center">
              <div className="mb-3">
                <h2 className="text-red display-5">💬</h2>
              </div>
              <h4 className="fw-bold text-dark-red">Accompagnement</h4>
              <p className="text-muted">Prenez rendez-vous avec un conseiller en orientation pour un suivi personnalisé.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
