import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal"
import "../../styles/loginpage.css";

const LoginForm = ({toggleImagePosition}) => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Form Submitted', loginForm);
    // Here, add your login logic, then navigate on success
    navigate('/home'); // Adjust the navigation target as needed
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  return (
    <div className="form-container">
      <h1>Welcome Back!</h1>
      <p>Log in to your account to continue</p>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleLoginChange}
          required
        />
        <div className="login-actions">
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <p style={{color:'blue', cursor:'pointer'}} onClick={handleForgotPasswordClick}>Forgot Password?</p>
        </div>
        <button type="submit">Sign In</button>
        {/* If you have Google Sign-In implemented */}
        <button type="button" onClick={() => navigate('/home')}>Sign In with Google</button>
      </form>
      <p>Don't have an account? <span style={{color:"blue", cursor:"pointer"}} onClick={toggleImagePosition}>Sign Up</span></p>
      <ForgotPasswordModal show={showForgotPasswordModal} handleClose={handleCloseForgotPasswordModal} />
    </div>
  );
};

export default LoginForm;