// HeaderBar.js
import React from 'react';
import '../styles/headerstyle.css'; // Make sure to create a corresponding CSS file
import { IoIosNotificationsOutline } from "react-icons/io";
import placeholder from './Footer/Photos/placeholder.png';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
//import '../styles/header.scss';


const HeaderBar = () => {
  /*TODO: Header must be updated to not overlap with sidebar so that when clicking the 
          Health Logo, it redirects to home page while preventing event bubbling through
          the stopPropagation() method. 
  */
          const [show, setShow] = useState(false);
          const [alertMessages, setAlertMessages] = useState([]);
        
          const handleClose = () => setShow(false);
        
          const handleAlert = () => {
            const newAlert = ['Some Things happened to your account', 'Database Was Successfully Updated', 'Something also happened updating database']; // Example array with alert messages
            setAlertMessages(newAlert);
            setShow(true);
          };
        
          return (
            <ul className="header">
              <li className="notification-item" onClick={handleAlert}>
                <IoIosNotificationsOutline className="notification-icon" />
              </li>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {alertMessages.map((message, index) => (

                     <div key={index} className="alert-message">
                     <img src={placeholder} alt="Alert" className="alert-image" />
                     <p className="alert-text">{message}</p>
                   </div>
                  ))}
                </Modal.Body>
              </Modal>
              <li className="profile-item">
                <div className="team_member">
                  <a href="/">
                    <img src={placeholder} alt="Profile" />
                  </a>
                </div>
              </li>
              <li className="user-menu-item">
                <div className="user-name-menu">El Quipe</div>
              </li>
            </ul>
          );
}
        

export default HeaderBar;
{/* <div className="team_member">
              <a href="/home">
              <img src={placeholder}/>
              </a>
          </div> */}