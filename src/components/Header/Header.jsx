import React from 'react';
import darkLogo from './dark-logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img
          src={darkLogo}
          alt="Anjef Dangol"
          className="logo-img"
        />
      </div>
    </header>
  );
};

export default Header;
