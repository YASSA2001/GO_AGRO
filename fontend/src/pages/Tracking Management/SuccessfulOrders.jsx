import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , Link} from 'react-router-dom';

export const SuccessfulOrders = () => {
  const [orders, setOrders] = useState([]);
  const { email } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/payments/email/${email}`)
      .then((res) => {
        setOrders(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  return (
    <div>
      <div className='text-4xl items-center justify-center text-center mt-20 font-serif'>
        <h1>Successfull Orders</h1>
      </div>

      <div className='table1'>
        <table className='w-full border-separate border-spacing-6 mt-8'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: '#1A4133' }}>No</th>
              <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: '#1A4133' }}>Oder ID</th>
              <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: '#1A4133' }}>Buyer Name</th>
              <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: '#1A4133' }}>Seller Name</th>
              <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: '#1A4133' }}>Price</th>
              <th className='border border-slate-600 rounded-md text-white text-lg' style={{ background: '#1A4133' }}>Quantity</th>
              
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{order.orderId}</td>
                <td className='border border-slate-700 rounded-md text-center'>{order.buyeremail}</td>
                <td className='border border-slate-700 rounded-md text-center'>{order.selleremail}</td>
                <td className='border border-slate-700 rounded-md text-center'>{order.Total}</td>
                <td className='border border-slate-700 rounded-md text-center'>{order.quantity}</td>
                
                <td className='border border-slate-700 rounded-md text-center'style={{ background: '#1A4133' }}><Link to={`/tracks/create/${order.orderId}`}><button className='text-white w-20'>Track</button></Link></td>

               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
