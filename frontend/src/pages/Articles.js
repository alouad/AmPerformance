import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <div className="card-body">
                  <span className="badge bg-light-grey text-dark mb-2">{article.type}</span>
                  <h5 className="fw-bold text-dark">{article.title}</h5>
                  <p className="text-muted small">Par {article.author}</p>
                  <p className="mt-2">{article.content.substring(0, 100)}...</p>
                  <button className="btn btn-outline-custom btn-sm mt-2">Lire la suite</button>
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
    </div>
  );
};

export default Articles;
