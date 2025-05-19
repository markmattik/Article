import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import ArticleFormPage from './pages/ArticleFormPage';


const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router> {/* Only here at the root */}
      <NavBar />
      <Routes>
        <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/articles/new" element={<RequireAuth><ArticleFormPage /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
