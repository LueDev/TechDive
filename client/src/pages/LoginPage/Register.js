import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import '../../styles/loginpage.css';

const RegisterForm = ({ toggleImagePosition }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .matches(
          /^[^\d!@#$%^&*()_+{}\[\]:;<>,.?/~\-=|\\]+$/,
          "Can't contain numbers or special characers",
        )
        .matches(/^[\p{L}]+$/u, "Can't contain non-letter unicode characters")
        .required('Required'),
      lastname: Yup.string()
        .matches(
          /^[^\d!@#$%^&*()_+{}\[\]:;<>,.?/~\-=|\\]+$/,
          "Can't contain numbers or special characers",
        )
        .matches(/^[\p{L}]+$/u, "Can't contain non-letter unicode characters")
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          'Password must contain at least one special character',
        )
        .required('Required'),
    }),
    onSubmit: () => {
    
      axios.post(`${process.env.REACT_APP_LOCALSERVER}/users/register`, formik.values)
        // .then((res) => res.json())
        .then((data) => {
          // alert('Registered Successfully. Redirecting to Home page');
          console.log("SUCCESS WITH AXIOS: ", data);
        })
        .catch((err) => {
          console.log('UNSUCCESSFUL REGISTRATION: ', err);
        });
      

    },
  });

  // navigate('/'); // Navigate to the home page or dashboard


  return (
    <div className="register-form">
      <h1>Create New Account</h1>
      <p>Enter your email and password to access your account</p>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formik.values.firstname}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <span className="formik-error">{formik.errors.firstname}</span>
        ) : null}
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formik.values.lastname}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <span className="formik-error">{formik.errors.lastname}</span>
        ) : null}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className="formik-error">{formik.errors.email}</span>
        ) : null}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="formik-error">{formik.errors.password}</span>
        ) : null}

        {/* Include Remember me, Forgot password, and Sign in with Google */}
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <span style={{color:"blue", cursor:"pointer"}} onClick={toggleImagePosition}>Sign In</span>
      </p>
    </div>
  );
};

export default RegisterForm;
