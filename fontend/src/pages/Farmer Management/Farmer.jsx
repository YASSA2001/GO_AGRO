import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import '../../components/navbar/NavBar3.css'
import './Farmer.css'
import { FaLocationDot } from "react-icons/fa6";
import { GrAdd, GrCompliance } from "react-icons/gr";
import UserContext from '../../UserContext';


export const Farmer = () => {
    const [farmer, setFarmer] = useState({});
    const { email } = useParams();
    const {currentUser} = useContext(UserContext)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/farmers/email/${email}`)
            .then((res) => {
                setFarmer(res.data.data);
                console.log(currentUser);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [email]); // Added email to dependency array

    return (
        <div>

            <nav className='nav1 pt-4 pb-4  '>
                <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

                <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>


                    <Link to={`/complaint/${farmer.email}`}><li>Make Complaints</li></Link>
                    <Link to="/"><li>Logout</li></Link>
                    <Link to="/"><li>Contact Us</li></Link>

                    <Link to={`/notification/detailsByName/${farmer.name}`}><li className='mt-2'><FaBell /></li></Link>
                    <Link to={`/farmerprofile/${farmer._id}`}><li className='mt-2'><FaUserLarge /></li></Link>



                </ul>
            </nav>

            <div className='mt-20 text-center'>
                <div className='inline-flex'>
                    <h1 className='t1 text-5xl font-serif' style={{ fontFamily: 'cursive' }}>Welcome </h1>
                    <h1 className='t2 text-6xl font-bold ml-5' style={{ fontFamily: 'serif' }}>{farmer.name}.</h1>
                </div>
                <p className='text-3xl mt-5' style={{ fontFamily: "initial" }}> As a farmer </p>
            </div>

            <div className='bn ml-28 mt-20 mb-20 grid grid-cols-4 grid-rows-2 gap-y-6 '>

                <Link to={`/successfullOrders/${farmer.email}`}>
                    <button className='w-56 h-32 mr-10 ' style={{ background: '#1A4133' }} >
                        <div className='flex inline-block'>
                            <h1 className='ml-9'>Create Track</h1>
                            <GrAdd className='ml-5 size-9' />
                        </div>
                    </button>
                </Link>
                <Link to={`/tracks`}>
                    <button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                        <div className='flex inline-block'>
                            <h1 className='ml-9'>All Trackings</h1>
                            <FaLocationDot className='ml-5 size-9' />
                        </div>
                    </button>
                </Link>

               
                <Link to={`/mycomplaints/${farmer.email}`}><button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                    <div className='flex inline-block'>
                        <h1 className='ml-9'>Complaints</h1>
                        <GrCompliance className='ml-5 size-9' />
                    </div>
                </button></Link>

                <Link to={`/lists/show/${farmer.email}`}><button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                    <div className='flex inline-block'>
                        <h1 className='ml-9'>Mill Owners Products</h1>
                        <GrCompliance className='ml-5 size-9' />
                    </div>
                </button></Link>

                <Link to={`/reviews/millowner`}>
                    <button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                        <div className='flex inline-block'>
                            <h1 className='ml-9'>MillOwners Reviews</h1>
                        </div>
                    </button>
                </Link>

               


            </div>


            <footer className="footer">
                    &copy; 2024 GO AGRO. All Rights Reserved.
                </footer>



        </div>
    );
};