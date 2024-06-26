import React, { useState, useEffect, useContext } from "react";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from "notistack";
import { StepperContext } from "./StepperContext";

const EditTrack = () => {
    const { statusIndex, setStatusIndex } = useContext(StepperContext);
    const statuses = ["Order Confirmed", "Ready to Deliver", "On the Way to Delivered", "Delivered"];
    const [OrderId, setOrderId] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() =>{
        setLoading(true);
        axios.get(`http://localhost:5000/tracks/${id}`)
        .then((response) =>{
            setOrderId(response.data.OrderId);
            setAddress(response.data.address);
            setStatusIndex(statuses.indexOf(response.data.status));
            setLoading(false);
        }).catch((error) =>{
            setLoading(false);
            alert('An error happened. Please check console');
            console.log(error);
        });
    }, []);

    const handleEditTrack = () => {
        const data = {
            OrderId,
            address,
            status: statuses[statusIndex],
        };
        setLoading(true);
        axios
            .put(`http://localhost:5000/tracks/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Track Edited successfully', { variant: 'success' });
                alert("Update Successful")
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error happened:', error);
                enqueueSnackbar('Error', { variant: 'error' });
            });
    };

    const handleDropdownChange = (e) => {
        setStatusIndex(statuses.indexOf(e.target.value));
    };

    return (
        <div className="p-4">
            
            <h1 className="text-3xl my">Edit Track</h1>
            {loading ? <Spinner/> : ''}
            <div className="flex flex-col border-2 border-green-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label style={{ fontSize: '16px', marginRight: '16px', color: '#555' }}>Order Id</label>
                    <input
                        type="text"
                        value={OrderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', fontSize: '16px' }}
                    />
                </div>
                <div className="my-4">
                    <label style={{ fontSize: '16px', marginRight: '16px', color: '#555' }}>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', fontSize: '16px' }}
                    />
                </div>
                <div className="my-4">
                    <label style={{ fontSize: '16px', marginRight: '16px', color: '#555' }}>Order Status</label>
                    <select
                        value={statuses[statusIndex]}
                        onChange={handleDropdownChange}
                        style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', fontSize: '16px' }}
                    >
                        {statuses.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                
                <button
    className="p-2 bg-green-800 text-white px-4 m-8"
    style={{ borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}
    onClick={handleEditTrack}
>
    Edit Track
</button>

            </div>
        </div>
    );
};

export default EditTrack;
