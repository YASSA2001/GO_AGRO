import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AllTrackings = () => {
    const [trackings, setTrackings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tracks')
            .then((res) => {
                setTrackings(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
        <div>
            <table className='w-full border-separate border-spacing-6 mt-8'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md text-white text-lg  text-center r ' style={{ background: "#1A4133" }}>No</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg text-center ' style={{ background: "#1A4133" }}>Tracking ID</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg text-center ' style={{ background: "#1A4133" }}>Order ID</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg text-center' style={{ background: "#1A4133" }}>Address</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg text-center' style={{ background: "#1A4133" }}>Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {trackings.map((tracks, index) => (
                        <tr key={tracks._id}>
                            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{tracks._id}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{tracks.OrderId}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{tracks.address}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{tracks.status}</td>
                            <td className='border border-slate-700 rounded-md text-center bg-lime-950 text-white'>
                               <Link to={`/createNotifi/${tracks.OrderId}`}> <button className=''>Create Notification</button></Link>
                            </td>
                                
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>  
        </>
    );
};
