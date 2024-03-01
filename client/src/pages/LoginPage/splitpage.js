import React, { useState } from 'react';
import RegisterForm from './Register';
import LoginForm from './Loginform';
import '../../styles/loginpage.css';

const SplitPage = () => {
  const [imageOnLeft, setImageOnLeft] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  const toggleImagePosition = () => {
    setIsSliding(true); // Begin sliding
    setTimeout(() => {
      setImageOnLeft(!imageOnLeft);
      setIsSliding(false); // End sliding
    }, 500); // Match the duration of your CSS transition
  };

  return (
    <div className="split-page">
      <div
        className={`image-container ${imageOnLeft ? '' : 'slide-image'} ${isSliding ? 'on-top' : ''}`}
      ></div>
      <div className="register-section">
        <RegisterForm toggleImagePosition={toggleImagePosition} />
      </div>
      <div className="login-section">
        <LoginForm toggleImagePosition={toggleImagePosition} />
      </div>
      <button className="toggle-button" onClick={toggleImagePosition}>
        {imageOnLeft ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default SplitPage;
