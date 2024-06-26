import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { NavBar2 } from '../components/navbar/NavBar2';
import axios from 'axios';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [NIC, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [about, setAbout] = useState('');
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      const userData = {
        name,
        phone,
        NIC,
        email,
        password,
        address,
        about,
        role,
      };

      

      let endpoint = '';
      if (role === 'farmer') {
        endpoint = 'http://localhost:5000/farmers';
      } else if (role === 'mill owner') {
        endpoint = 'http://localhost:5000/millowners';
      } else if (role === 'shop owner') {
        endpoint = 'http://localhost:5000/shopowners';
      }

      if (endpoint) {
        axios.post(endpoint, userData)
          .then(response => {
            console.log(response);
            alert('Registered successfully!');
            window.location.reload();
          })
          .catch(err => {
            console.error(err);
          });
      }
    
    }
  };

  return (
    <>
      <NavBar2 />
      <div className='main'>
        <form className='f2 mb-10 flex flex-col mt-24 border-none' onSubmit={handleSubmit}>
          <h1 className='text-3xl font-serif ml-10 mt-10 mb-10'>SIGN UP</h1>
          <label className='input' htmlFor='name'>Name</label>
          <input type='text' onChange={(e) => setName(e.target.value)} />

          <label className='input' htmlFor='nic'>NIC</label>
          <input type='text' onChange={(e) => setNIC(e.target.value)} />

          <label className='input' htmlFor='email'>Email</label>
          <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
          {emailError && <p className='error-message text-red-900'>{emailError}</p>}

          <label className='input' htmlFor='phone'>Phone</label>
          <input type='text' onChange={(e) => setPhone(e.target.value)} value={phone} />

          <label className='input' htmlFor='address'>Address</label>
          <input type='text' onChange={(e) => setAddress(e.target.value)} value={address} />

          <label className='input' htmlFor='password'>Password</label>
          <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
          {passwordError && <p className='error-message text-red-900'>{passwordError}</p>}

          <label className='input' htmlFor='about'>About</label>
          <textarea className='text ml-14 mb-5' name='about' id='about' cols='30' rows='5' onChange={(e) => setAbout(e.target.value)} value={about} />

          <select required className='select mb-10 ml-14 h-10' onChange={(e) => setRole(e.target.value)} value={role}>
            <option value=''>Select Role</option>
            <option value='farmer'>Farmer</option>
            <option value='mill owner'>Mill Owner</option>
            <option value='shop owner'>Shop Owner</option>
          </select>

          <button type='submit' className='b2 mb-7 rounded-md'>Submit</button>

          <Link to='/login'><h2 className='mb-10'>If you have account, <b>Sign In</b></h2></Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
