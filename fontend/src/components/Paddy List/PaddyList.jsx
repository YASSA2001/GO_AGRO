import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';

export const PaddyList = () => {

    const [lists, setLists] = useState([])

   useEffect(() => {
        
        axios.get('http://localhost:5000/lists')
            .then((response) => {
                setLists(response.data);
               
            })
            .catch((error) => {
                console.log(error);
               
            });
    }, []);

  return (
    <div>
         <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
               
                   { lists.map((list) => (
                        <div key={list._id} className='bg-white rounded-lg shadow-md'>
                            <img src={`http://localhost:5000/${list.image}`} alt={list.paddyType} className='w-full h-32 object-cover rounded-t-lg' />
                            {console.log(`http://localhost:5000/${list.image}`)}
                            <div className='p-4'>
                                <h2 className='text-xl font-semibold mb-4 text-gray-800'>{list.paddyType}</h2>
                                <p className='text-gray-600 mb-2'>{list.quantity} Kg</p>
                                <p className='text-gray-600 mb-2'>{list.pricePer1kg} Rs per 1Kg</p>
                            </div>
                            <div className='flex justify-between p-4 border-t border-gray-200'>
                                <Link to={``} className='text-green-600 hover:text-green-800'>
                                    <BsInfoCircle className='text-xl text-green-800' />
                                </Link>
                                <div className='flex gap-2'>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
    </div>
  )
}
