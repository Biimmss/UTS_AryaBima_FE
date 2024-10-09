import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './component/sidebar.jsx';
import Login from './component/Login';
import Register from './component/Register';
import CustomerList from './component/Customer/CustomerList';
import PegawaiList from './component/Pegawai/PegawaiList.jsx';
import PembayaranList from './component/Pembayaran/PembayaranList.jsx';
import SalesList from './component/Sales/SalesList.jsx';
import StockList from './component/Stock/StockList.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserRole('admin');
    }else{
      navigate('/login')
    }
  }, []);

  const handleLogin = (success, role) => {
    setIsLoggedIn(success);
    setUserRole(role);
    if (success) {
      navigate('/customer');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="flex">
  {isLoggedIn && <Sidebar handleLogout={handleLogout} />}
  <div className="flex-1">
    <Routes>
      <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/customer" />} />
      <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/customer" />} />
      
      {/* Customer Route */}
      <Route
        path="/customer"
        element={isLoggedIn ? <CustomerList /> : <Navigate to="/login" />}
      />
      
      {/* Pegawai Route */}
      <Route
        path="/pegawai"
        element={isLoggedIn ? <PegawaiList /> : <Navigate to="/login" />}
      />

      {/* Pembayaran Route */}
      <Route
        path="/pembayaran"
        element={isLoggedIn ? <PembayaranList /> : <Navigate to="/login" />}
      />
      
      {/* Sales Route */}
      <Route
        path="/sales"
        element={isLoggedIn ? <SalesList /> : <Navigate to="/login" />}
      />

      {/* Sales Route */}
      <Route
        path="/stock"
        element={isLoggedIn ? <StockList /> : <Navigate to="/login" />}
      />
      
      

      {/* Default Route */}
      <Route path="/" element={<Navigate to={isLoggedIn ? "/customer" : "/login"} />} />
    </Routes>
  </div>
</div>

  );
}

export default App;