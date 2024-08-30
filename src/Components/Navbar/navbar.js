import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './navbar.css';
import logo from '../../assets/logo.png';

const Navbar = (props) => {
  const nagivate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid full-width-container">
        <div className="logo-container">
          <button className="navbar-brand" style={{ border: 'none', background: 'none' }}>
            <img src={logo} alt="Logo" className="logo-img" />
          </button>
        </div>
        <div className="navbar-right">
          <span style={{ color: 'white', fontSize: '18px', marginRight: '15px' }}>Username</span>
          <Link to="/profile">
            <i className="bi bi-person-circle profile-icon"></i>
          </Link>
          <button className="btn btn-outline-light ms-3" onClick={props.onLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
