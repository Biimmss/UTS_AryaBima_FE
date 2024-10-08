import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaUserFriends, FaCalculator, FaDollarSign, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();

  const handleLogoutClick = () => {
    if (window.confirm("Apakah anda yakin ingin logout?")) {
      handleLogout();
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Admin Showroom</h2>
      </div>
      <nav className="mt-6 flex flex-col flex-grow">
        <ul>
          <li className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${location.pathname === '/customer' ? 'bg-gray-700' : ''}`}>
            <Link to="/customer" className="flex items-center">
              <FaUsers className="mr-2" /> Customer
            </Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${location.pathname === '/pegawai' ? 'bg-gray-700' : ''}`}>
            <Link to="/pegawai" className="flex items-center">
              <FaUserFriends className="mr-2" /> Pegawai
            </Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${location.pathname === '/pembayaran' ? 'bg-gray-700' : ''}`}>
            <Link to="/pembayaran" className="flex items-center">
              <FaCalculator className="mr-2" /> Pembayaran
            </Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${location.pathname === '/sales' ? 'bg-gray-700' : ''}`}>
            <Link to="/sales" className="flex items-center">
              <FaDollarSign className="mr-2" /> Sales
            </Link>
          </li>
          <li className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${location.pathname === '/stock' ? 'bg-gray-700' : ''}`}>
            <Link to="/stock" className="flex items-center">
              <FaShoppingCart className="mr-2" /> Stock
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <button onClick={handleLogoutClick} className="flex items-center w-full bg-gray-700 py-2 px-4 rounded hover:bg-gray-600">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;