//code for the side bar
import React from 'react';
import './mystyle.css';
import { NavLink } from 'react-router-dom';
import { TbActivityHeartbeat } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { BsClipboard2Plus } from "react-icons/bs";
import { IoFolderOutline } from "react-icons/io5";
import { SiWorldhealthorganization } from "react-icons/si";

const Sidebar = () => {
  const lists = [
    { id: 1, text: "Home", icon: <TbActivityHeartbeat/>},
    { id: 2, text: "Admin", icon: <BsPerson/>},
    { id: 3, text: "Add Patient", icon: <BsClipboard2Plus/> },
    { id: 4, text: "File Processing", icon: <IoFolderOutline/> }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <SiWorldhealthorganization size={50} />
        <span>Health</span>
      </div>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <NavLink 
              to={list.to} 
              activeClassName="active-link" 
              className="sidebar-link"
              exact
            >
              {list.icon}
              <span style={{ marginLeft: '10px' }}>{list.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
