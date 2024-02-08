// HeaderBar.js
import React from 'react';
import '../headerstyle.css'; // Make sure to create a corresponding CSS file

const HeaderBar = () => {
  return (
    <nav className="header-nav">
      <ul className="header-list">
        <li className="header-item">
          <a href="/" className="header-link">User</a>
        </li>
        {/* You can uncomment and add more list items if needed */}
      </ul>
    </nav>  
  );
};

export default HeaderBar;