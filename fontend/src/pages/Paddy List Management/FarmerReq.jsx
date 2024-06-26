import { useEffect, useState } from "react";
import axios from 'axios';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import { useParams, Link } from 'react-router-dom';
import './FarmerReq.css';
import '../../components/navbar/NavBar3.css'


const ShowList = () => {
    const [list, setList] = useState({});
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const { id } = useParams();
    const [farmer, setFarmer] = useState('')
    const { email } = useParams('')

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/lists/${id}`)
            .then((response) => {
                setList(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

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
    }, [email]);

    const handleRequestOrder = () => {
        axios.post(`http://localhost:5000/lists/${id}/request-order`)
            .then(() => {
                console.log("Order requested successfully");
                setNotification("Order requested successfully");
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            })
            .catch(error => {
                console.log("Error requesting order:", error);
                setNotification("Error requesting order. Please try again.");
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            });
    };

    return (
        <>
            <nav className='nav1 pt-4 pb-4  '>
                <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

                <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>


                    <Link to={`/complaint/${farmer.email}`}><li>Make Complaints</li></Link>
                    <Link to="/"><li>Logout</li></Link>
                    <Link to="/"><li>Contact Us</li></Link>

                    <Link to="/notification"><li className='mt-2'><FaBell /></li></Link>
                    <Link to="/#"><li className='mt-2'><FaUserLarge /></li></Link>


                </ul>
            </nav>

            <div className='container'>

                <h1 className='heading'>Product Details</h1>
                {loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className='border-2 border-green-400 rounded-2xl w-fit p-4 center'>
                        {list.image && (
                            <div className="image-container">
                                <img src={`http://localhost:5000/${list.image}`} alt="Uploaded" className="image" />
                            </div>
                        )}
                        <div className='item'>
                            <span>Id :</span>
                            <span>{list._id}</span>
                        </div>
                        <div className='item'>
                            <span>Paddy Type :</span>
                            <span>{list.paddyType}</span>
                        </div>
                        <div className='item'>
                            <span>Quantity(Kg) :</span>
                            <span>{list.quantity}</span>
                        </div>
                        <div className='item'>
                            <span>Price Per 1KG(Rs) :</span>
                            <span>{list.pricePer1kg}</span>
                        </div>
                        <div className='item'>
                            <span>Create Time :</span>
                            <span>{new Date(list.createdAt).toString()}</span>
                        </div>
                        <div className='item'>
                            <span>Last Update Time :</span>
                            <span>{new Date(list.updatedAt).toString()}</span>
                        </div>
                        <Link to={`/orders/create/${list._id}/${email}`}><button className='btn-print' onClick={handleRequestOrder}>Request Order</button></Link>

                        {notification && <div className="notification">{notification}</div>}
                    </div>
                )}
            </div>
        </>
    );
};

export default ShowList;
