import React from 'react';
import './style.css';
import { logoIcon } from '../../../assets'; // Adjust the path as per your project structure

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      {/* Logo */}
      <img src={logoIcon} alt="GrociaHub Logo" />

      {/* Animated Loader */}
      <div className="grocery-icon">
        <div className="loader-item loader-item-orange"></div>
        <div className="loader-item loader-item-green"></div>
        <div className="loader-item loader-item-yellow"></div>
      </div>

      {/* Loading Text */}
      <p className="loader-text">Loading GrociaHub...</p>
    </div>
  );
};

export default Loader;
