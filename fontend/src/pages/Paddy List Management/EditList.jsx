//for mill owners use
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import '../../components/navbar/NavBar3.css'
import './EditList.css';

const EditList = () => {
    const [paddyType, setPaddyType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pricePer1kg, setPricePer1Kg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/lists/${id}`)
            .then((response) => {
                setPricePer1Kg(response.data.pricePer1kg);
                setQuantity(response.data.quantity);
                setPaddyType(response.data.paddyType);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    }, [id])

    const handleEditList = () => {

        console.log('Quantity:', quantity);
        console.log('Price:', pricePer1kg);

        if (quantity < 0) {
            setLoading(false);
            enqueueSnackbar('Cannot create list', { variant: 'error' });
            return;
        }

        if (pricePer1kg < 0) {
            setLoading(false);
            enqueueSnackbar('Cannot create list', { variant: 'error' });
            return;
        }
        const data = {
            paddyType,
            quantity,
            pricePer1kg,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5000/lists/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('List edited successfully', { variant: 'success' });
                navigate('/lists/Manage');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };

    return (

        <>

            <nav className='nav1 pt-4 pb-4  '>
                <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

                <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

                    <Link to={''}  ><li>Home</li></Link>
                    <Link to={'/'}><li >Make Complaints</li></Link>
                    <Link to="/"><li>Logout</li></Link>
                    <Link to="/"><li>Contact Us</li></Link>

                    <Link to="/#"><li className='mt-2'><FaBell /></li></Link>
                    <Link to="/#"><li className='mt-2'><FaUserLarge /></li></Link>



                </ul>
            </nav>
            <div className='container'>

                <h1 className='heading'>Edit Details</h1>
                {loading ? <Spinner /> : ''}
                <div className='form-container '>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Paddy Type</label>
                        <input
                            type='text'
                            value={paddyType}
                            onChange={(e) => setPaddyType(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Quantity</label>
                        <input
                            type='number'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Price Per 1KG</label>
                        <input
                            type='number'
                            value={pricePer1kg}
                            onChange={(e) => setPricePer1Kg(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                    </div>

                    <div className='button-container'>
                        <button onClick={handleEditList}>Save</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditList;
