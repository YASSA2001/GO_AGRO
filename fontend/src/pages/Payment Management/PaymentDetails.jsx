import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export const PaymentDetails = () => {
    const [payments, setPayments] = useState([]); // Initialize payments state as an empty array

    useEffect(() => {
        axios
            .get('http://localhost:5000/payments')
            .then((res) => {
                setPayments(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <table className='w-full border-separate border-spacing-6 mt-8'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: "#1A4133" }}>No</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: "#1A4133" }}>ID</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: "#1A4133" }}>Buyer Email</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: "#1A4133" }}>Seller Email</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: "#1A4133" }}>Order ID</th>
                        <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: "#1A4133" }}>Total</th>
                 
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment._id}>
                            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{payment._id}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{payment.buyeremail}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{payment.selleremail}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{payment.orderId}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{payment.Total}</td>
                            <td className='border border-slate-700 rounded-md text-center bg-red-800 text-white'>
                                <div className='flex flex-row gap-5 justify-center'>
                                    <Link to={`/deletepayment/${payment._id}`}><button>Delete</button></Link>
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
