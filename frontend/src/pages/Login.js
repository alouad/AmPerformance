import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Connexion</h2>
          <p className="text-muted">Ravi de vous revoir sur AMORIENTATION.MA !</p>
        </div>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="form-label fw-bold text-dark">Adresse Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="votre@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold text-dark">Mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label text-muted" htmlFor="remember">Se souvenir de moi</label>
            </div>
            <a href="#!" className="text-red text-decoration-none fw-semibold">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="btn btn-primary-custom w-100 py-2 mb-3" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="text-center mt-3">
          <span className="text-muted">Vous n'avez pas de compte ? </span>
          <Link to="/register" className="text-red fw-bold text-decoration-none">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
