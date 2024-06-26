import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useParams } from 'react-router-dom'
import {FaBell} from 'react-icons/fa'
import {FaUserLarge} from 'react-icons/fa6'


export const MyPayments = () => {

    const {email} = useParams('')
    const [payments, setPayment] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:5000/payments/email/${email}`)
            .then((res) => {
                setPayment(res.data.data);
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  return (

    <>

<nav className='nav1 pt-4 pb-4  '>
    <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>
    
    <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

        
        <Link to={`/complaint/${email}`}><li>Make Complaints</li></Link>
        <Link to="/"><li>Logout</li></Link>
        <Link to="/"><li>Contact Us</li></Link>
                        
        <Link to="/notification"><li className='mt-2'><FaBell/></li></Link>
        <Link to="/#"><li className='mt-2'><FaUserLarge/></li></Link>
    
        

    </ul>
</nav>
    <div>
         <table className="w-full border-separate border-spacing-6 mt-8">
    <thead>
        <tr>
            <th className="border border-slate-600 rounded-md text-white text-lg" style={{ background: "#1A4133" }}>No</th>
            <th className="border border-slate-600 rounded-md text-white text-lg" style={{ background: "#1A4133" }}>Order ID</th>
            <th className="border border-slate-600 rounded-md text-white text-lg" style={{ background: "#1A4133" }}>My Email</th>
            <th className="border border-slate-600 rounded-md text-white text-lg" style={{ background: "#1A4133" }}>Total Cost</th>
            <th className="border border-slate-600 rounded-md text-white text-lg" style={{ background: "#1A4133" }}>Payment Date</th>
            <th className="border border-slate-600 rounded-md text-white text-lg" style={{ background: "#1A4133" }}>Actions</th>
        </tr>
    </thead>
    <tbody>
        {payments.map((payment, index) => (
            <tr key={payment._id}>
                <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                <td className="border border-slate-700 rounded-md text-center">{payment.orderId}</td>
                <td className="border border-slate-700 rounded-md text-center">{payment.buyeremail}</td>
                <td className="border border-slate-700 rounded-md text-center">{payment.Total}</td>
                <td className="border border-slate-700 rounded-md text-center">{new Date(payment.createdAt).toLocaleString()}</td>
                <td className="">
                    <div className="flex flex-row gap-5 justify-center">
                        <Link to={`/deletepayment/${payment._id}`}>
                            <button className='bg-red-700 w-20 rounded-md text-white'>Delete</button>
                        </Link>
                        <Link to={`/updatepayment/${payment._id}`}>
                            <button className='bg-sky-800 w-20 rounded-md text-white'>Update</button>
                        </Link>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>

    </div>
    
    </>

   
  )
}
