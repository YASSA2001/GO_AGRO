import React, { useEffect, useState } from 'react';
import img5 from '../../image/img5.jpg';
import { Link , useParams } from 'react-router-dom';
import './UpdateComplaint.css'
import axios from 'axios';
import {FaBell} from 'react-icons/fa'
import {FaUserLarge} from 'react-icons/fa6'
export const UpdateComplaint = () => {

    const {id} = useParams('')
    const [problem_type, setProblem] = useState('');
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [complaint, setComplaint] = useState('')
    const [farmer, setFarmer ] = useState('')
    const [millowner, setMillowner] = useState('')
    const role = farmer.role || millowner.role


    useEffect(() => {
        axios.get(`http://localhost:5000/farmers/email/${complaint.email}`)
            .then((res) => {
                setFarmer(res.data.data);
                console.log(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
    }, [complaint.email]);

    useEffect(() =>{
        axios.get(`http://localhost:5000/millowners/email/${complaint.email}`)
        .then((res)=>{
            setMillowner(res.data.data)
            console.log(res.data.data)
        }).catch((error)=>{
            console.log(error)
        })
    })

   

    let linkPath;

    // Determine the link path based on the user's role
    if (role === 'farmer') {
        linkPath = `/farmer/${complaint.email}`;
    } else if (role === 'mill owner') {
        linkPath = `/millowner/${complaint.email}`;
    } else {
        
        linkPath = '/';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/complaints/${id}`, {
            
            problem_type,
            photo,
            description
        }).then(response => {
            console.log(response);
            alert("Complaint updated");
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });

    }

    useEffect(()=>{
        axios
            .get(`http://localhost:5000/complaints/${id}`)
            .then((res)=>{
                setComplaint(res.data.data)
                console.log(res.data.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])


  return (
    <>
    <nav className='nav1 pt-4 pb-4  '>
            <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>
            
            <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

                <Link to={linkPath} ><li>Home</li></Link>
                <Link to={`/complaint/${complaint.email}`}><li >Make Complaints</li></Link>
                <Link to="/"><li>Logout</li></Link>
                <Link to="/"><li>Contact Us</li></Link>
                
                <Link to="/#"><li className='mt-2'><FaBell/></li></Link>
                <Link to="/#"><li className='mt-2'><FaUserLarge/></li></Link>
            
                

            </ul>
    </nav>

    <div className='bg10 flex justify-center items-center '>
        
        <form className='f10   p-10 mt-24 mb-10 flex flex-col  border-none rounded-lg ' style={{width:'450px'}} onSubmit={handleSubmit}>
            <h1 className='text-4xl mb-10'>Update Complaints</h1>
            
            <label htmlFor="">Complaint ID</label>
            <input value={complaint._id} type="text" className='mb-6 outline-none border-black border-b-2 h-8 p-2' />

            <label htmlFor="">Name</label>
            <input value={complaint.name} type="text" className='mb-6 outline-none border-black border-b-2 h-8 p-2' />
            
            

            <label htmlFor="">Email</label>
            <input placeholder={complaint.email} type="email" className='mb-6 outline-none border-black border-b-2 h-8 p-2' />

            <select name="" onChange={(e)=>setProblem(e.target.value)} className='font-bold mb-6 h-8 border-2 border-black'>
                <option value="">Problem type</option>
                <option value="technical">Technical</option>
                <option value="payment">Payment</option>
                <option value="other">Other</option>
            </select>

            <label htmlFor="">Description</label>
            <textarea  placeholder={complaint.description} onChange={(e)=>setDescription(e.target.value)} className='outline-none border-2 border-t-black border-b-black mb-8'  cols="30" rows="10"></textarea>

            <label htmlFor="">Upload Image</label>
            <input type="file" onChange={(e)=> setPhoto(e.target.value)}  />

            <button className='btn10 mt-5 bg-emerald-950 text-white text-xl rounded-md'>Submit</button>


        </form>
    </div>
    
    
    </>
    
  );
};
