//for mill owners use
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa'
import { FaUserLarge } from 'react-icons/fa6'
import '../../components/navbar/NavBar3.css'
import './ManageList.css';
import debounce from 'lodash/debounce';

const ManageListings = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const {email} = useParams('')

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/lists')
            .then((response) => {
                setLists(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = debounce(() => {
        const filteredLists = lists.filter(list =>
            applySearchFilter(list, searchQuery)
        );
        setLists(filteredLists);
    }, 300);

    const applySearchFilter = (list, query) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            String(list.paddyType).toLowerCase().includes(lowerCaseQuery) ||
            String(list.quantity).toLowerCase().includes(lowerCaseQuery) ||
            String(list.pricePer1kg).toLowerCase().includes(lowerCaseQuery)
        );
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

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
            <div className="search-bar-container">
                <input
                    type="text"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search"
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            <Link to={`/lists/create/${email} `}className='fixed top-28 right-4'>
                <MdOutlineAddBox className='text-4xl text-green-500' />
            </Link>


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
                                <Link to={`/lists/view/${list._id}`} className='text-green-600 hover:text-green-800'>
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

export default ManageListings;

