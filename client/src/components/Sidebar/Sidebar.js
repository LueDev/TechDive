import React, { useState } from 'react';
import './Sidebar.css';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { BsPerson } from 'react-icons/bs';
import { BsClipboard2Plus } from 'react-icons/bs';
import { IoFolderOutline } from 'react-icons/io5';
import { SiWorldhealthorganization } from 'react-icons/si';

const Sidebar = () => {
  const lists = [
    { id: 1, text: 'Home', icon: <TbActivityHeartbeat /> },
    { id: 2, text: 'Admin', icon: <BsPerson /> },
    { id: 3, text: 'Add Patient', icon: <BsClipboard2Plus /> },
    { id: 4, text: 'File Processing', icon: <IoFolderOutline /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <SiWorldhealthorganization size={50} />
        <span>Health</span>
      </div>

      {/*TODO: Update this UL to have two divs one for icon and the other for text. 
         This will allow us to line up all the icons on the same baseline and apply
         :hover logic to minimize sidebar to show only icons when not hovered over.*/}
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            {list.icon} {list.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
