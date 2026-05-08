import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/resources');
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">Articles & Ressources</h2>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-red" role="status"></div></div>
      ) : articles.length > 0 ? (
        <div className="row g-4">
          {articles.map((article) => (
            <div className="col-md-4" key={article.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <div>
                    <span className="badge bg-light-grey text-dark mb-2">{article.type}</span>
                  </div>
                  <h5 className="fw-bold text-dark">{article.title}</h5>
                  <p className="text-muted small">Par {article.author}</p>
                  <p className="mt-2 flex-grow-1">{article.content.substring(0, 100)}...</p>
                  <button 
                    className="btn btn-outline-custom btn-sm mt-2 w-auto align-self-start"
                    onClick={() => setSelectedArticle(article)}
                    data-bs-toggle="modal" 
                    data-bs-target="#articleModal"
                  >
                    Lire la suite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info border-0 bg-light-grey text-dark">
          Aucun article publié pour le moment.
        </div>
      )}

      {/* Modal */}
      <div className="modal fade" id="articleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pt-0 px-4 pb-4">
              <span className="badge bg-red mb-3">{selectedArticle?.type}</span>
              <h3 className="fw-bold text-dark mb-3">{selectedArticle?.title}</h3>
              <p className="text-muted mb-4 border-bottom pb-3">
                <i className="bi bi-person-circle me-2"></i> Rédigé par <strong>{selectedArticle?.author}</strong>
              </p>
              
              <div className="article-content" style={{ lineHeight: '1.8' }}>
                {/* Normally this would be dangerouslySetInnerHTML if it was HTML, but for now we just render text */}
                {selectedArticle?.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
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

export default Articles;
