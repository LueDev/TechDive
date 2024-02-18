import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/loginpage.css"

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register Form Submitted', registerForm);
    // Add registration logic here and navigate on success
    navigate('/'); // Navigate to the home page or dashboard
  };

  return (
    <div className="register-form">
      <h1>Create New Account</h1>
      <p>Enter your email and password to access your account</p>
      <form onSubmit={handleRegisterSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={registerForm.firstName}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={registerForm.lastName}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerForm.email}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerForm.password}
          onChange={handleRegisterChange}
          required
        />
        {/* Include Remember me, Forgot password, and Sign in with Google */}
        <button type="submit" onClick={()=>{navigate('/home')}}>Sign Up</button>
      </form>


      <p>Already have an account? <a href="/">Sign In</a></p>
    </div>
    
  );
};

export default RegisterForm;
