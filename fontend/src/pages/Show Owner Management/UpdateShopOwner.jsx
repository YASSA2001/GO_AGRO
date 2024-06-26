import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



export const UpdateShopOwner = () => {

    const {id} = useParams('')
    const [shopowner, setShopOwner] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [NIC, setNIC] = useState('')
    const [phone,  setPhone] = useState('')
    const [password, setPasword] = useState('')
    const [validationMessage, setValidationMessage] = useState('');
    const [address, setAddress] = useState('')


    useEffect(()=>{
        axios.get(`http://localhost:5000/shopowners/${id}`)
        .then((res)=>{
          setShopOwner(res.data.data)
            console.log(res.data.data)
        })
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePhone(phone)) {
            setValidationMessage('Phone number must be 10 digits long.');
            return;
        }

        axios.put(`http://localhost:5000/shopowners/${id}`, {
            name,
            phone,
            email,
            NIC,
            address,
            password

        }).then(response => {
            console.log(response);
            alert("Update Successfull");
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    };


    const validatePhone = (phoneNumber) => {
        return phoneNumber.length === 10;
    };

  return (
    <div className='flex  justify-center pt-20'>
        <form action="" onSubmit={handleSubmit} className='shadow-md border-none shadow-gray-700 w-4/12 flex-col items-center mb-5 rounded-ss-3xl rounded-br-3xl'>

           <u> <h1 className='text-4xl font-serif mt-4 mb-5'>Edite Farmer Details</h1> </u>
             
        <div >
             <div className='flex flex-col border-none'>
             <label htmlFor="">Name : </label>
             <input required type="text" onChange={(e)=>setName(e.target.value)} placeholder={shopowner.name} className='border border-black rounded-md p-1 w-56' />
             </div>

             <div className='flex flex-col border-none'>
             <label htmlFor="">email : </label>
             <input required  placeholder={shopowner.email} onChange={(e)=>setEmail(e.target.value)} type="email" className='border border-black rounded-md p-1 w-56' />
             </div>

             <div className='flex flex-col border-none'>
             <label htmlFor="">Phone : </label>
             <input required  placeholder={shopowner.phone} onChange={(e)=>setPhone(e.target.value)} type="text" className='border border-black rounded-md p-1 w-56' />
             {validationMessage && <p className="error-message text-red-700 font-bold">{validationMessage}</p>}
             </div>

             <div className='flex flex-col border-none '>
             <label htmlFor="">NIC : </label>
             <input required type="text" placeholder={shopowner.NIC} onChange={(e)=>setNIC(e.target.value)}  className='border border-black rounded-md p-1 w-56 ' />
             </div>

             <div className='flex flex-col border-none'>
             <label htmlFor="">Address : </label>
             <input required type="text" placeholder={shopowner.address} onChange={(e)=>setAddress(e.target.value)} className='border border-black rounded-md  p-1 w-56' />
             </div>

             <div className='flex flex-col border-none'>
             <label htmlFor="">Password : </label>
             <input required type="password" onChange={(e)=>setPasword(e.target.value)} className='border border-black rounded-md p-1 w-56' />
             </div>
        </div>

        <button type='submit' className='bg-emerald-950 w-36 text-white rounded-md font-serif mt-5'>Update</button>
        </form>
    </div>
  )
}
