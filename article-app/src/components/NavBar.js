import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar bg-light mb-4">
      <div className="container justify-content-center">
        {token ? (
          <>
            <Link to="/" className="btn btn-link">Home</Link>
            <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-link">Login</Link>
            <Link to="/register" className="btn btn-link ms-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
