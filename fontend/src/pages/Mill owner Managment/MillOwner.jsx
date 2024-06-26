import React, { useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import { FaLocationDot } from "react-icons/fa6";
import { GrMoney, GrAdd, GrDeliver, GrCompliance } from "react-icons/gr";
import { Link, useParams } from 'react-router-dom';
import '../../components/navbar/NavBar3.css'
import axios from 'axios';

export const MillOwner = () => {

    const [millOwner, setMillowner] = useState('');
    const { email } = useParams('')

    useEffect(() => {
        axios
            .get(`http://localhost:5000/millowners/email/${email}`)
            .then((res) => {
                setMillowner(res.data.data);
                console.log(res.data.data);
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


                    <Link to={`/complaint/${millOwner.email}`}><li>Make Complaints</li></Link>
                    <Link to="/"><li>Logout</li></Link>
                    <Link to="/"><li>Contact Us</li></Link>

                    <Link to={"/notification/"}><li className='mt-2'><FaBell /></li></Link>
                    <Link to={`/millownerprofile/${millOwner._id}`}><li className='mt-2'><FaUserLarge /></li></Link>


                </ul>
            </nav>


            <div className='mt-20 text-center'>
                <div className='inline-flex'>
                    <h1 className='t1 text-5xl font-serif' style={{ fontFamily: 'cursive' }}>Welcome </h1>
                    <h1 className='t2 text-6xl font-bold ml-5' style={{ fontFamily: 'serif' }}>{millOwner.name}.</h1>
                </div>
                <p className='text-3xl mt-5' style={{ fontFamily: "initial" }}> As A Mill Owner </p>
            </div>

            <div className='bn ml-14 mb-20 mt-20 grid grid-cols-4 grid-rows-2 gap-y-6  '>
                <Link to={`/successfullOrders/${millOwner.email}`}>
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

                <Link to={`/orders`}>
                    <button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                        <div className='flex inline-block'>
                            <h1 className='ml-9'>My Orders</h1>
                            <GrDeliver className='ml-5 size-9' />
                        </div>
                    </button>
                </Link>
                <Link to={`/mycomplaints/${email}`}><button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                    <div className='flex inline-block'>
                        <h1 className='ml-9'>Complaints</h1>
                        <GrCompliance className='ml-5 size-9' />
                    </div>

                </button></Link>

                <Link to={`/reviews/show/${millOwner.name}`}>
                    <button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                        <div className='flex inline-block '>
                            <h1 className='ml-4'>My Reviews</h1>
                           
                        </div>
                    </button>
                </Link>


                <Link to={`/mypayment/${email}`}>
                    <button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                        <div className='flex inline-block'>
                            <h1 className='ml-9'>My Payments</h1>
                            <GrMoney className='ml-5 size-9' />

                        </div>
                    </button>

                </Link>

                <Link to={`/lists/Manage/${email}`}>
                    <button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                        <div className='flex inline-block '>
                            <h1 className='ml-4'>Manage List</h1>
                            <GrAdd className='ml-5 size-9' />

                        </div>
                    </button>
                </Link>

                <Link to={`/lists/create/${millOwner.email}`}>
                    <button className='w-56 h-32 mr-10' style={{ background: '#1A4133' }}>
                        <div className='flex inline-block '>
                            <h1 className='ml-4'>Create List</h1>
                            <GrAdd className='ml-5 size-9' />

                        </div>
                    </button>
                </Link>

              


                

            </div>

            <footer className="footer">
                    &copy; 2024 GO AGRO. All Rights Reserved.
            </footer>

        </div>

    )
}
