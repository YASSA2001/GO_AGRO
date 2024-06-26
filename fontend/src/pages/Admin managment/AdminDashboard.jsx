import React from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  return (
    <div className='div grid grid-cols-3 gap-4 pt-20 pl-20 '>
        <Link to={`/allfarmers`}><button className='by'>Farmer</button></Link>
        <Link to={`/allmillowners`}><button className='by'>Mill Owners</button></Link>
        <Link to={`/allshopowners`}><button className='by'>Shop Owners</button></Link>
        <Link to={`/allpayments`}><button className='by'>Transections</button></Link>
        <Link to="/allcomplaints"><button className='by '>Complaint</button></Link>
        <Link to="/alltracking"><button className='by'>All Tracking</button></Link>
    </div>
  );
};