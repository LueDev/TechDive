import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/loginpage.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

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
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <button type="submit">Sign In</button>
        {/* If you have Google Sign-In implemented */}
        <button type="button" onClick={() => navigate('/home')}>Sign In with Google</button>
      </form>
      <p>Don't have an account? <a href="/register">Sign Up</a></p>
    </div>
  );
};

export default LoginForm;
