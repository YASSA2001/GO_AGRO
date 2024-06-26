import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import './CreatePayment.css'

import {FaBell} from 'react-icons/fa'
import {FaUserLarge} from 'react-icons/fa6'

export const CreatePayment = () => {

  const {id} = useParams('')
  const [photo, setPhoto] = useState('')
  const [order, setOrders] = useState({})



  useEffect(()=>{
      axios.get(`http://localhost:5000/orders/${id}`)
      .then((res)=>{
          setOrders(res.data)
          console.log(res.data)
          
      })
  },[])

  const orderId = order._id
  const Total = order.quantity * order.price
  const selleremail = order.selleremail
  const buyeremail = order.buyeremail
  const quantity = order.quantity

  console.log(buyeremail)
  console.log(selleremail)
  


  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:5000/payments", {
        photo,
        Total,
        selleremail,
        buyeremail,
        orderId,
        quantity


        
    }).then(response => {
        console.log(response);
        alert("Payment Successful");
        window.location.reload();
    }).catch(err => {
        console.log(err);
    });
};





  return (

    <>

        <nav className='nav1 pt-4 pb-4  '>
            <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>
            
            <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

                <Link to={`/complaints/${order.buyeremail}`}  ><li>Home</li></Link>
                <Link to={`/complaint/${order.buyeremail}`}><li >Make Complaints</li></Link>
                <Link to="/"><li>Logout</li></Link>
                <Link to="/"><li>Contact Us</li></Link>
                
                <Link to="/#"><li className='mt-2'><FaBell/></li></Link>
                <Link to="/#"><li className='mt-2'><FaUserLarge/></li></Link>
            
                

            </ul>
        </nav>

    <div className='flex justify-center pt-20'>
      <form onSubmit={handleSubmit} className=' flex items-center flex-col border-none w-96 pt-10 shadow-lg mb-4 shadow-slate-800'>

        <h1 className='text-4xl font-serif mb-8 ' >Payment</h1>
        
        <div className='d10 flex flex-col border-none'>
          <label className='mr-5 font-mono' htmlFor="">Item ID : </label>
          <input type="text" className='outline-none pl-2 ' value={order._id} /> 
        </div>

        <div className='d10 flex flex-col border-none'>
          <label className='mr-5 font-mono' htmlFor="">Buyer Email : </label>
          <input type="text" className='outline-none pl-2' value={order.buyeremail} />
        </div>

        <div className='d10 flex flex-col border-none'>
          <label className='mr-5 font-mono' htmlFor="">Price for 1kg : </label>
          <input type="text" className='outline-none pl-2' value={"Rs " + order.price} />
        </div>

        <div className='d10 flex flex-col border-none'>
          <label className='mr-5 font-mono' htmlFor="">Qunity : </label>
          <input type="text" className='outline-none pl-2' value={order.quantity} />
        </div>

        <div className='d10 flex flex-col border-none'>
          <label className='mr-5 font-mono' htmlFor="">Total Payment : </label>
          <input type="text" className='outline-none pl-2' value={"Rs " +Total} />
        </div>

        <div className='d10 flex flex-col border-none'>
          <label className='mr-5 font-mono' htmlFor="">Payment Slip : </label>
          <input type="file" className='outline-none pl-2 w-48' onChange={(e)=>{setPhoto(e.target.value)}} />
        </div>

        <button className='bg-green-950 w-28 rounded-md text-white mt-5'>Pay</button>
      </form>

      
    </div>
    </>
    
  )
}
