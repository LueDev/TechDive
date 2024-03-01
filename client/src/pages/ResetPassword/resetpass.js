import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import logo from './medexams.png'; 
import logo2 from './usericon.png';
import axios from 'axios'
import "./style.css";

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('New Password:', newPassword);

        // try {
        //     const response = await axios.put(`${process.env.REACT_APP_LOCALSERVER}/users/update/`, {
        //         email: email,
        //         newPassword: newPassword
        //     });
        //     console.log('Reset password response:', response.data);
            navigate('/');
        // } catch (error) {
        //     console.error('Error resetting password:', error);
        // }
    };
    return (
        <div class="parentContainer">
        <div className="containerr">
            <div className="headerr">
                <img src={logo} alt="MedExams Logo" className="logo" />
            </div>
            <img src={logo2} alt="user" className="logo2" />
            <h2 className="title">Reset Password</h2>
            <form onSubmit={handleSubmit} className="reset-form">
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Create a new password"
                    />
                </div>
                <button type="submit" className="reset-btn">Reset Password</button>
            </form>
        </div>
    </div>
    );
}

export default ResetPassword;
