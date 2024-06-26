import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import "./ShowOrder.css"; // Import CSS file for ShowOrder component

const ShowOrder = () => {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/orders/${id}`)
            .then(response => {
                setOrder(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Order</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex-col border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Id</span>
                        <span>{order._id}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Buyername</span>
                        <span>{order.buyername}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Sellername</span>
                        <span>{order.sellername}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Type</span>
                        <span>{order.type}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Quantity</span>
                        <span>{order.quantity}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Price</span>
                        <span>{order.price}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Create Time</span>
                        <span>{new Date(order.createdAt).toString()}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-grey-500'>Update Time</span>
                        <span>{new Date(order.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowOrder;
 