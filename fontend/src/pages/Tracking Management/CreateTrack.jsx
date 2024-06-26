// CreateTrack.jsx
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTrack = () => {

    const { id } = useParams('')


    const [status, setStatus] = useState('Order Confirmed');
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${id}`)
            .then((res) => {
                setOrders(res.data)
                console.log(res.data)
            })
    }, [])

    const OrderId = orders._id
    const address = orders.address


    const handleSaveTrack = () => {
        const data = {
            OrderId,
            address,
            status,
        };
        setLoading(true);
        axios
            .post('http://localhost:5000/tracks', data)
            .then(() => {
                setLoading(false);
                alert("Track create successfully")
                window.location.reload();
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check console');
                console.log(error);
            });
    };

    return (
        <div className="p-4">
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: "20px" }}>
                <h1 className="text-3xl my">Create Track</h1>
            </div>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-green-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label style={{ fontSize: '16px', marginRight: '16px', color: '#555' }}>Order Id</label>
                    <input
                        type="text"
                        value={OrderId}
                        style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', fontSize: '16px' }}
                    />
                </div>
                <div className="my-4">
                    <label style={{ fontSize: '16px', marginRight: '16px', color: '#555' }}>Address</label>
                    <input
                        type="text"
                        value={address}
                        style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', fontSize: '16px' }}
                    />
                </div>
                <div className="my-4">
                    <label style={{ fontSize: '16px', marginRight: '16px', color: '#555' }}>Order Status</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', fontSize: '16px' }}
                        disabled
                    />
                </div>
                <button className="p-2 bg-green-800 text-white px-4  m-8" onClick={handleSaveTrack}>
                    Create Track
                </button>
            </div>
        </div>
    );
};

export default CreateTrack;
