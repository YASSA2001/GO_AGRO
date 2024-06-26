import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PaymentUpdate = () => {
  const [payment, setPayment] = useState('');
  const { id } = useParams('');
  const [buyeremail, setEmail] = useState('');
  const [Total, setTotal] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/payments/${id}`)
      .then((res) => {
        setPayment(res.data.data);
        console.log(res.data.data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if Total is negative
    if (parseFloat(Total) < 0) {
      alert("Total cannot be negative");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(buyeremail)) {
      alert("Invalid email format");
      return;
    }

    axios.put(`http://localhost:5000/payments/${id}`, {
      buyeremail,
      Total,
      photo,
    })
      .then((response) => {
        console.log(response);
        alert("Update Successful");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex justify-center pt-20'>
      <form action="" className='flex-col border-none shadow-md mb-5 shadow-slate-800 items-center ' onSubmit={handleSubmit}>
        <h1 className='text-4xl mt-5 mb-4 font-bold font-serif'>Update Payment Details</h1>

        <div className='flex-col border-none' >
          <label className='' htmlFor="">Payments ID</label>
          <input value={payment._id} className='w-64 rounded border border-black p-1' type="text" readOnly />

          <label htmlFor="">Order ID</label>
          <input value={payment.orderId} className='w-64 rounded border border-black p-1' type="text" readOnly />

          <label htmlFor="">Buyer Email</label>
          <input required onChange={(e) => setEmail(e.target.value)} placeholder={payment.buyeremail} className='w-64 rounded border border-black p-1' type="text" />

          <label htmlFor="">Total</label>
          <input required onChange={(e) => setTotal(e.target.value)} placeholder={payment.Total} className='w-64 rounded border border-black p-1' type="number" />

          <label htmlFor="">Created Data</label>
          <input value={payment.createdAt} className='w-64 rounded border border-black p-1' type="text" readOnly />

          <label htmlFor="">Payment Slip</label>
          <input onChange={(e) => setPhoto(e.target.value)} className='w-64 rounded border border-black p-1' type="file" />

          <button type='submit' className='bg-green-950 text-white rounded mt-5'>Submit</button>
        </div>
      </form>
    </div>
  );
};
