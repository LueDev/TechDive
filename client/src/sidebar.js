import React, { useState } from 'react';
import './mystyles.css'; 

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${true ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        ☰
      </button>
      <ul>
        <li>Exam Dashboard</li>
        <li>Admin</li>
        <li>Add Patient</li>
      </ul>
    </div>
  );
};

export default Sidebar;
