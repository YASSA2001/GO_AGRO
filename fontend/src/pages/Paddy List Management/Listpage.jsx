//for shopowners 
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import '../../components/navbar/NavBar3.css'
import './Listpage.css'

const Listpage = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [shopowner, setFarmer] = useState({});
    const { email } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/shopowners/email/${email}`)
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
                                <Link to={`/lists/details/${list._id}/${shopowner.email}`} className='text-green-600 hover:text-green-800'>
                                    <BsInfoCircle className='text-xl text-green-800' />
                                </Link>
                                <div className='flex gap-2'>

                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};


export default Listpage;