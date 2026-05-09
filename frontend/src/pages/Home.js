import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section text-center py-5" style={{ marginTop: '40px', marginBottom: '60px' }}>
        <div className="container">
          <h1 className="fw-bolder text-dark mb-4" style={{ fontSize: '3.2rem', lineHeight: '1.2' }}>
            Trouvez votre orientation académique<br />idéale
          </h1>
          <p className="text-muted mb-5 mx-auto" style={{ maxWidth: '800px', fontSize: '1.1rem' }}>
            AMORIENTATION.MA vous accompagne dans votre parcours éducatif en vous<br />
            proposant les meilleures formations et établissements au Maroc.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/orientations" className="btn btn-primary-custom px-4 py-2">Rechercher une filière</Link>
            <Link to="/rendez-vous" className="btn btn-outline-custom px-4 py-2">Prendre rendez-vous</Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mb-5 pb-4">
        <h3 className="text-center fw-bold text-dark mb-5">Nos services</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <i className="bi bi-book"></i>
              </div>
              <h5 className="fw-bold text-dark mb-3">Explorer les filières</h5>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Découvrez une large gamme de formations adaptées à vos aspirations et compétences.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <i className="bi bi-chat-square-text"></i>
              </div>
              <h5 className="fw-bold text-dark mb-3">Avis des étudiants</h5>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Consultez les retours d'expérience authentiques d'étudiants actuels et anciens.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <i className="bi bi-people"></i>
              </div>
              <h5 className="fw-bold text-dark mb-3">Conseillers disponibles</h5>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Bénéficiez de l'expertise de nos conseillers d'orientation professionnels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-light-grey py-5 mb-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="stat-number">+500</div>
              <div className="stat-label">Étudiants accompagnés</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">95%</div>
              <div className="stat-label">Taux de satisfaction</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">+20</div>
              <div className="stat-label">Partenaires établissements</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">+10 ans</div>
              <div className="stat-label">D'expérience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="container mb-5 pb-5">
        <h3 className="text-center fw-bold text-dark mb-5">Où nous trouver</h3>
        <div className="card shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #EAEAEA' }}>
          <a href="https://maps.app.goo.gl/GyddcYWMPYBXqRQe6" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            <div className="map-placeholder" style={{ cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#EBEBEB'}>
              <div className="text-center">
                <i className="bi bi-geo-alt d-block mb-2"></i>
                <span className="text-red fw-bold">Voir sur Google Maps</span>
              </div>
            </div>
          </a>
          <div className="card-body p-4">
            <h5 className="fw-bold text-dark mb-3">Notre adresse</h5>
            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>Bureau 449, 4ème étage</p>
            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>Casablanca, Maroc</p>
            <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>Tél: +212 522 255 027 / +212 760 109 182</p>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Email: contact@amorientation.ma</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
