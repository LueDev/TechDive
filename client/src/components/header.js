// HeaderBar.js
import React from 'react';
import '../styles/headerstyle.css'; // Make sure to create a corresponding CSS file

const HeaderBar = () => {
  /*TODO: Header must be updated to not overlap with sidebar so that when clicking the 
          Health Logo, it redirects to home page while preventing event bubbling through
          the stopPropagation() method. 
  */
  return (
    <nav className="header-nav">
      <ul className="header-list">
        <li className="header-item">
          <a href="/home" className="header-link">
            User
          </a>
        </li>
        {/* You can uncomment and add more list items if needed */}
      </ul>
    </nav>
  );
};

export default HeaderBar;
