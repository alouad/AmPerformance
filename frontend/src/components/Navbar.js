import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="text-dark-red fw-bold">Am</span>
          <span className="text-grey fw-light">Performance</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orientations">Filières & Orientations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/institutions">Établissements</Link>
            </li>
          </ul>

          <div className="d-flex">
            {isAuthenticated ? (
              <div className="dropdown">
                <button className="btn btn-outline-custom dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  {user?.name || 'Mon Profil'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-2">
                  <li><Link className="dropdown-item" to="/profile">Mon Profil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Déconnexion</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-custom me-2">Connexion</Link>
                <Link to="/register" className="btn btn-primary-custom">S'inscrire</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
