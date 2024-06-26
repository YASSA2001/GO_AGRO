// DeleteOrder.jsx

import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./DeleteOrder.css";; // Import CSS file for DeleteOrder component

const DeleteOrder = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteOrder = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5000/orders/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/orders');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Order</h1>
            {loading ? <Spinner /> : ''}
            <div className='delete-order-container'> {/* Apply CSS class for styling */}
                <h3 className='text-2xl'>Are you sure you want to delete this order?</h3>
                <button
                    className='delete-button'
                    onClick={handleDeleteOrder}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    );
};

export default DeleteOrder;
