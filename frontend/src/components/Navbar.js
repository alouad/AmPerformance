import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="text-dark">AMORIENTATION</span>
          <span className="text-red">.MA</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/institutions">Établissements</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orientations">Formations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles">Articles</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {isAuthenticated ? (
            <div className="dropdown">
              <button className="btn btn-outline-custom dropdown-toggle py-1 px-3" type="button" data-bs-toggle="dropdown">
                {user?.name || 'Mon Profil'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-2">
                <li><Link className="dropdown-item" to="/profile">Mon Profil</Link></li>
                {user?.role === 'admin' && (
                  <li><Link className="dropdown-item fw-bold text-red" to="/admin"><i className="bi bi-shield-lock me-2"></i>Espace Admin</Link></li>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={() => dispatch(logout())}>Déconnexion</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-custom me-3">Connexion</Link>
              <Link to="/register" className="btn btn-primary-custom">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
