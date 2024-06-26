//for mill owners use
import { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import '../../components/navbar/NavBar3.css'
import './DeleteList.css';

const DeleteList = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteList = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5000/lists/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('List deleted successfully', { variant: 'success' });
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

                <h1 className='heading'>Delete Product</h1>
                {loading ? <Spinner /> : ''}
                <div className='confirmation-box'>
                    <h3 className='text-2xl'>Are You Sure You want to delete your product?</h3>

                    <button
                        className='delete-button'
                        onClick={handleDeleteList}
                    >
                        Yes, Delete it
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteList;