import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { getAll, search } from '../services/list';
import Search from '../components/Search/Search';
import './ShowListings.css'
const ShowListings = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const { searchTerm } = useParams();

    const [farmer, setFarmer] = useState({});
    const { email } = useParams();

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

    useEffect(() => {
        setLoading(true);
        const loadLists = searchTerm ? search(searchTerm) : getAll();

        loadLists
            .then((lists) => {
                setLists(lists);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

        axios
            .get(`http://localhost:5000/lists`)
            .then((response) => {
                setLists(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [searchTerm]);

    return (
        <>
            <Link to='/lists/create' className='fixed top-30 right-4'>
                <MdOutlineAddBox className='text-4xl text-green-500' />
            </Link>
            <Search />
            <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {loading ? (
                    <Spinner />
                ) : (
                    lists.map((list) => (
                        <div key={list._id} className='bg-white rounded-lg shadow-md'>
                            <img src={`http://localhost:5000/${list.image}`} alt={list.paddyType} className='w-full h-32 object-cover rounded-t-lg' />
                            {console.log(`http://localhost:5000/${list.image}`)}
                            <div className='p-4'>
                                <h2 className='text-xl font-semibold mb-4 text-gray-800'>{list.paddyType}</h2>
                                <p className='text-gray-600 mb-2'>{list.quantity} Kg</p>
                                <p className='text-gray-600 mb-2'>{list.pricePer1kg} Rs per 1Kg</p>
                            </div>
                            <div className='flex justify-between p-4 border-t border-gray-200'>
                                <Link to={`/lists/details/${list._id}/${farmer.email}`} className='text-green-600 hover:text-green-800'>
                                    <BsInfoCircle className='text-xl text-green-800' />
                                </Link>
                                <div className='flex gap-2'>
                                    <Link to={`/lists/edit/${list._id}`} className='text-yellow-600 hover:text-yellow-800'>
                                        <AiOutlineEdit className='text-xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/lists/delete/${list._id}`} className='text-red-600 hover:text-red-800'>
                                        <MdOutlineDelete className='text-xl text-red-600' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default ShowListings;
