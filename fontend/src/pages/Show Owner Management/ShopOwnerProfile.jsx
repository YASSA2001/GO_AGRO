import React, { useEffect, useState } from 'react'
import sp from '../../image/sp.jpg'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export const ShopOwnerProfile = () => {


    const [shopowner , setShopowner] = useState('');
    const {id} = useParams('')

    useEffect(()=>{
        axios.get(`http://localhost:5000/shopowners/${id}`)
        .then((res)=>{
            setShopowner(res.data.data)
            console.log(res.data.data)
        })
    },[id])

    

  return (
    <div className='border-none  flex-col w-full items-center '>
        
        <div className='border-2 border-black ml-10 mt-10 mr-10 flex-col w-full items-center '>
        <h1 className='text-4xl font-serif mt-10'>Shop Owner</h1>
        <img className='w-40 h-40 mt-20' src={sp} alt="" />

        <h1 className='text-5xl mt-4'>{shopowner.name}</h1>

        <div className='mt-20'>
            <div className=' flex  flex-row mb-3'>
                <h1 className='text-2xl text-black'>User ID : </h1>
                <h1 className='text-xl ml-10'>{shopowner._id}</h1>
            </div>

            <div className=' flex  flex-row mb-3'>
                <h1 className='text-2xl text-black'>NIC : </h1>
                <h1 className='text-xl ml-10  float-end border'>{shopowner.NIC}</h1>
            </div>

            <div className=' flex  flex-row mb-3'>
                <h1 className='text-2xl text-black'>Email : </h1>
                <h1 className='text-xl ml-10  float-end border'>{shopowner.email}</h1>
            </div>

            <div className=' flex  flex-row mb-3'>
                <h1 className='text-2xl text-black'>Phone : </h1>
                <h1 className='text-xl ml-10  float-end border'>{shopowner.phone}</h1>
            </div>

            <div className=' flex  flex-row mb-3'>
                <h1 className='text-2xl text-black'>Address : </h1>
                <h1 className='text-xl ml-10  float-end border'>{shopowner.address}</h1>
            </div>

            <div className=' flex  flex-row mb-3'>
                <h1 className='text-2xl text-black'>About : </h1>
                <h1 className='text-xl ml-10  float-end border'>{shopowner.about}</h1>
            </div>

            <div className=' flex  flex-row mb-3'>
                <h1 className='text-2xl text-black'>Status : </h1>
                <h1 className='text-xl ml-10  float-end border'>{shopowner.isApproved}</h1>
            </div>
            

            <div className='mt-5'>
            <Link to={`/deleteshopowners/${shopowner._id}`}><button className='bg-red-800 text-white w-32 rounded-md'>Delete Account</button></Link>
            <Link to={`/updateshopowner/${shopowner._id}`}><button className='ml-5 text-white bg-indigo-800 rounded-md w-32'>Edite Account</button></Link>
            </div>

            
        </div>
       
        </div>
    </div>
  )
}
