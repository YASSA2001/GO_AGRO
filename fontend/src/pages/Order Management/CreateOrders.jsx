import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import "./CreateOrders.css"; // Import CSS file

const CreateOrders = () => {
  
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  const { email, id } = useParams(); // Corrected useParams usage

  const [list, setList] = useState({});
  const [farmer, setFarmer] = useState({});
  const [millowner, setMillowner] = useState({});
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/farmers/email/${email}`)
      .then((res) => {
        setFarmer(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]); // Added email to dependency array 

  const sellername = farmer.name;
  const selleremail = farmer.email;
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/lists/${id}`)
      .then((res) => {
        setList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const buyername = list.listCreateBy;
  const buyeremail = list.listCreateByEmail;
  const type = list.paddyType;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/millowners/email/${list.listCreateByEmail}`)
      .then((res) => {
        setMillowner(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [list.listCreateByEmail]); // Added email to dependency array 

  const address = millowner.address;

  const handleSaveOrder = () => {
    if (quantity <= 0 || price <= 0) {
      enqueueSnackbar('Quantity and price must be greater than zero', { variant: 'error' });
      return;
    }

    const data = {
      buyername,
      sellername,
      type,
      quantity,
      price,
      address,
      buyeremail,
      selleremail
    };

    setLoading(true);
    axios
      .post('http://localhost:5000/orders', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Order Created successfully', { variant: 'success' });
        alert("Order successful");
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        alert("Order not successful");
      });
  };

  // Function to handle input change for quantity
  const handleQuantityChange = (e) => {
    // Prevent negative values
    if (e.target.value >= 0) {
      setQuantity(e.target.value);
    }
  };

  // Function to handle input change for price
  const handlePriceChange = (e) => {
    // Prevent negative values
    if (e.target.value >= 0) {
      setPrice(e.target.value);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Order</h1>
      {loading ? <Spinner /> : ''}
      <div className='form-container'>
        <div className='form-group'>
          <label>Buyer Name:</label>
          <input
            type='text'
            value={list.listCreateBy}
            className='form-input'
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>Seller Name:</label>
          <input
            type='text'
            value={farmer.name}
            className='form-input'
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>Type:</label>
          <input
            type='text'
            value={list.paddyType}
            className='form-input'
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>Quantity:</label>
          <input
            type='number'
            value={quantity}
            onChange={handleQuantityChange}
            className='form-input'
          />
        </div>
        <div className='form-group'>
          <label>Price:</label>
          <input
            type='number'
            value={price}
            onChange={handlePriceChange}
            className='form-input'
          />
        </div>
        <div className='save-button-container'>
          <button className='form-btn' onClick={handleSaveOrder}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateOrders;