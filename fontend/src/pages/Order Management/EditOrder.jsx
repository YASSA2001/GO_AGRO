import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import "./EditOrder.css"; // Import CSS file for EditOrder component

const EditOrder = () => {
    const [buyername, setBuyername] = useState('');
    const [sellername, setSellername] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/orders/${id}`)
            .then((response) => {
                const { data } = response;
                setBuyername(data.buyername);
                setSellername(data.sellername);
                setType(data.type);
                setQuantity(data.quantity);
                setPrice(data.price);
                setLoading(false);
            })
            .catch((error) => {  
                setLoading(false);
                alert('An error happened, Please check console');
                console.log(error);
            });
    }, [id]); // Include 'id' in the dependency array

    const handleEditOrder = () => {
        if (quantity < 0 || price < 0) {
            alert("Quantity and price cannot be negative.");
            return;
        }

        const data = {
            buyername,
            sellername,
            type,
            quantity,
            price,
        };

        setLoading(true);
        axios.put(`http://localhost:5000/orders/${id}`, data)
            .then(() => {
                setLoading(false);
                alert("Update Successful")
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    };

    // Handle change for quantity input field
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setQuantity(value);
        }
    };

    // Handle change for price input field
    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setPrice(value);
        }
    };

    return (
        <div className='edit-order-container'>
            <BackButton />
            <h1 className='edit-order-heading'>Edit Order</h1>
            {loading ? <Spinner /> : ''}
            <div className='order-form'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-grey-500'>Buyername</label>
                    <input
                        type='text'
                        value={buyername}
                        onChange={(e) => setBuyername(e.target.value)}
                        className='input-field'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-grey-500'>Sellername</label>
                    <input
                        type='text'
                        value={sellername}
                        onChange={(e) => setSellername(e.target.value)}
                        className='input-field'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-grey-500'>Type</label>
                    <input
                        type='text'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className='input-field'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-grey-500'>Quantity</label>
                    <input
                        type='number'
                        value={quantity}
                        onChange={handleQuantityChange} // Updated to use the custom handler
                        className='input-field'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-grey-500'>Price</label>
                    <input
                        type='number'
                        value={price}
                        onChange={handlePriceChange} // Updated to use the custom handler
                        className='input-field'
                    />
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='btn-save' onClick={handleEditOrder}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditOrder;