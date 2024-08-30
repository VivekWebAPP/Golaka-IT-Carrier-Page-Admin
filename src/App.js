import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/navbar';
import Sidebar from './Components/Sidebar/sidebar';
import Applicants from './Components/Applicants/applicants';
import Meetings from './Components/Meetings/meetings';
import Jobs from './Components/Jobs/jobs';
import Emails from './Components/Emails/emails';
import Profile from './Components/Profile/profile';
import LoginPage from './Components/Authonication/LoginPage';
import SignUpForm from './Components/Authonication/SignUpForm';
import Context from './Context State/ContextState';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('AuthToken'));
  const context = useContext(Context);
  const { auth } = context;

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('AuthToken'));
    };

    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('AuthToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? (
          <>
            <Navbar onLogout={handleLogout} />
            <Sidebar />
            <PageRoutes />
          </>
        ) : (
          <AuthRoutes />
        )}
      </div>
    </Router>
  );
}

const PageRoutes = () => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(location.pathname === '/');

  useEffect(() => {
    setShowProfile(location.pathname === '/');
  }, [location.pathname]);

  return (
    <>
      {showProfile && <Profile />}
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<SignUpForm />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
