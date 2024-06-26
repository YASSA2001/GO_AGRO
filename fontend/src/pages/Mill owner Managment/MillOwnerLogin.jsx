import React, { useState } from 'react';
import '../Login.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

export const MillOwnerLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

    
    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Invalid email address');
        return isValid;
    };

    const validatePassword = () => {
        const isValid = password.length >= 6; 
        setPasswordError(isValid ? '' : 'Password must be at least 6 characters long');
        return isValid;
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail() && validatePassword()) {
            try {
                const response = await axios.post("http://localhost:5000/millowners/login", {
                    email,
                    password
                });
                if (response.data.status) {
                    navigate(`/millowner/${email}`);
                } else {
                    alert("Invalid credentials");
                }
            } catch (error) {
                alert("Error logging in");
            }
        }
    };

    return (
        <div className='ba flex justify-center '>
            <form className='f2 shadow-neutral-500 shadow-2xl w-4/12 mt-20  rounded-lg' onSubmit={handleSubmit}>
                <h1 className='text-4xl font-serif mt-14'>LOGIN</h1>
                <input className='i1 mt-10' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                {emailError && <p className="error-message  text-red-900">{emailError}</p>}
                <input className="i1 mt-5" type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                {passwordError && <p className="error-message text-red-900">{passwordError}</p>}
                <button className='lo w-52 mt-16 h-8 text-white' type="submit">Login</button>
                <Link to=''><p className='mt-6'>Forgot Password</p></Link>
                <Link to='/signup'><p className='mt-6 mb-10'>If you don't have an account click <b style={{color: '#1A4133'}}>SIGN UP</b></p></Link>
            </form>
        </div>
    )
};
