import { Link } from "react-router-dom";
//import React, { useState } from 'react';
import './Sidebar.css';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { BsPerson } from 'react-icons/bs';
import { BsClipboard2Plus } from 'react-icons/bs';
import { IoFolderOutline } from 'react-icons/io5';
import { SiWorldhealthorganization } from 'react-icons/si';

const Sidebar = () => {
  const lists = [
    { id: 1, text: 'Home', icon: <TbActivityHeartbeat />, path: '/' },
    { id: 2, text: 'Admin', icon: <BsPerson />, path:'/admin' },
    { id: 3, text: 'Add Patient', icon: <BsClipboard2Plus />, path: '/add' },
    { id: 4, text: 'File Processing', icon: <IoFolderOutline />,},
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
            <Link to={list.path} className="sidebar-links"> 
            {list.icon} {list.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
