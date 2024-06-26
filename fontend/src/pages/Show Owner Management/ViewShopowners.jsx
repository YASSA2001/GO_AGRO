import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

export const AllShopowners = () => {
    const [shopowners, setShopowners] = useState([]);
    const [query, setQuery] = useState('');
    

    useEffect(() => {
        axios
            .get('http://localhost:5000/shopowners')
            .then((res) => {
                setShopowners(res.data.data);
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const handleSearch = (e) => {
        setQuery(e.target.value.toLowerCase());
    };

    
    const filteredShopowners = shopowners.filter((shopowners) => {
        const nameMatch = shopowners.name && shopowners.name.toLowerCase().includes(query);
        const NICMatch = shopowners.NIC && shopowners.NIC.toLowerCase().includes(query)
        
        return (nameMatch || NICMatch); 
    });


   

    

   

    return (
        <div>
            <div className='text-4xl items-center justify-center text-center mt-20 font-serif'>
                <h1>All Shopowners</h1>
            </div>

            <input style={{marginLeft: '470px', marginTop: '50px'}} onChange={handleSearch} className='shadow-md shadow-slate-900 rounded-md w-80 p-3' type="text" placeholder='Search Name or NIC......' />

           
            
            <table className='w-full border-separate border-spacing-6 mt-8'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md text-white text-lg ' style={{background:"#1A4133"}}>No</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>ID</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>NIC</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>Name</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>Email</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{background:"#1A4133"}}>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShopowners.map((shopowners, index) => (
                        <tr key={shopowners._id}>
                            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{shopowners._id}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{shopowners.NIC}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{shopowners.name}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{shopowners.email}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{shopowners.role}</td>
                            <td className='border border-slate-700 rounded-md text-center'> 
                                <div className='flex flex-row gap-5 justify-center'>

                                    <Link to={`/deleteshopowners/${shopowners._id}`}><MdDelete className='text-2xl text-red-800' /></Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllShopowners;
