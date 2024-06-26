import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineReplyAll } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

export const AllComplaint = () => {
    const [complaints, setComplaints] = useState([]);
    const [date, setDate] = useState('');
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/complaints')
            .then((res) => {
                setComplaints(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSearch = (e) => {
        setQuery(e.target.value.toLowerCase());
    };

    const handleTypeChange = (e) => {
        setType(e.target.value.toLowerCase());
    };

    const handleDate = (e)=>{
        setDate(e.target.value.toLowerCase())
    }

    

    // Filter data based on the query and type
    const filteredComplaints = complaints.filter((complaint) => {
        const nameMatch = complaint.name && complaint.name.toLowerCase().includes(query);
        const emailMatch = complaint.email && complaint.email.toLowerCase().includes(query);
        const typeMatch = complaint.problem_type && complaint.problem_type.toLowerCase() === type;
        const dateMatch = complaint.createdAt && complaint.createdAt.$date && new Date(complaint.createdAt.$date).toLocaleDateString() === new Date(date).toLocaleDateString();

        return (nameMatch || emailMatch) && (type === '' || typeMatch) && (date === '' || dateMatch); 
    });

    return (
        <div>
            <div className='text-4xl items-center justify-center text-center mt-20 font-serif'>
                <h1>All Complaints</h1>
            </div>

           <div className='filter_bar flex flex-row mt-14 ml-72 shadow-md shadow-slate-800 w-8/12 p-4 rounded-2xl'>

                <div className=' ml-8'>
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            className='outline-none border-2 h-11 p-2 border-zinc-900 w-56 rounded-md'
                            placeholder='Search...'
                        />
                    </div>

                
                    <div className=' ml-14'>
                        <select onChange={handleTypeChange} value={type} className='text-xl text-black border-2 border-black rounded-md p-1 font-serif'>
                            <option value="">Problem Type</option>
                            <option value="technical">Technical</option>
                            <option value="payment">Payment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <input className='h-10 border-2  border-black ml-14' onChange={handleDate} type="date" />
                    </div>


           </div>
           
            
            <table className='w-full border-separate border-spacing-6 mt-8'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md text-white text-lg ' style={{background:"#1A4133"}}>No</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>ID</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>Name</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>Email</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>Photo</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>Description</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>Problem</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComplaints.map((complaint, index) => (
                        <tr key={complaint._id}>
                            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{complaint._id}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{complaint.name}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{complaint.email}</td>
                            <td className='border border-slate-700 rounded-md text-center'><img src={complaint.photo} alt="" /></td>
                            <td className='border border-slate-700 rounded-md text-center'>{complaint.description}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{complaint.problem_type}</td>
                            <td className='border border-slate-700 rounded-md text-center'> 
                                <div className='flex flex-row gap-5 justify-center'>
                                    <Link to={`/reply/${complaint._id}`}><MdOutlineReplyAll className='text-2xl text-blue-900' /></Link>
                                    <Link to={`/deletecomplaints/${complaint._id}`}><MdDelete className='text-2xl text-red-800' /></Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllComplaint;
