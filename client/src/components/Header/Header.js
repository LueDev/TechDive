import React from 'react';
import "./Header.css"

const Header = () => {
  return (
    <nav className="navBar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Services</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
