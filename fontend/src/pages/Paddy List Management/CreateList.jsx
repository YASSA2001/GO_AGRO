//for mill owners use
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../components/navbar/NavBar3.css'
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import './CreateList.css';

const CreateList = () => {

    const {email} = useParams('')
    const [paddyType, setPaddyType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pricePer1kg, setPricePer1Kg] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [millowner, setMillOwner] = useState('')
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    

    const handleSaveList = () => {
        setLoading(true);
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

        const formData = new FormData();
        formData.append('paddyType', paddyType);
        formData.append('quantity', quantity);
        formData.append('pricePer1kg', pricePer1kg);
        formData.append('image', image);
        formData.append('listCreateBy', name )
        formData.append('listCreateByEmail', email)


        axios.post('http://localhost:5000/lists', formData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('List created successfully', { variant: 'success' });
                navigate(`/lists/Manage/${email}`);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };


    useEffect(() => {
        axios
            .get(`http://localhost:5000/millowners/email/${email}`)
            .then((res) => {
                setMillOwner(res.data.data);
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const name = millowner.name;
    return (
        <>

            <nav className='nav1 pt-4 pb-4  '>
                <Link to="/"><h1 className='text-white text-2xl ml-4 font-serif'>GO AGRO</h1></Link>

                <ul className='list1 flex flex-row gap-10 text-lg  text-white  font-extralight font-serif'>

                    <Link to={''}  ><li>Home</li></Link>
                    <Link to={``}><li >Make Complaints</li></Link>
                    <Link to="/"><li>Logout</li></Link>
                    <Link to="/"><li>Contact Us</li></Link>
                    <Link to="/#"><li className='mt-2'><FaBell /></li></Link>
                    <Link to="/#"><li className='mt-2'><FaUserLarge /></li></Link>


                </ul>
            </nav>

            <div className='container'>
                <h1 className='heading'>Create List</h1>
                {loading ? <Spinner /> : ''}
                <div className='form-container'>
                    <div className='my-4'>
                        <label>Paddy Type</label>
                        <input
                            type='text'
                            value={paddyType}
                            onChange={(e) => setPaddyType(e.target.value)}

                        />
                    </div>
                    <div className='my-4'>
                        <label>Quantity</label>
                        <input
                            type='number'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}

                        />
                    </div>
                    <div className='my-4'>
                        <label>Price Per 1KG</label>
                        <input
                            type='number'
                            value={pricePer1kg}
                            onChange={(e) => setPricePer1Kg(e.target.value)}

                        />
                    </div>
                    <div className='my-4'>
                        <label>Upload Image Here</label>
                        <input

                            type='file'
                            onChange={(e) => setImage(e.target.files[0])}

                        />
                    </div>

                    <div className='button-container'>
                        <button onClick={handleSaveList}>Save</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CreateList;
