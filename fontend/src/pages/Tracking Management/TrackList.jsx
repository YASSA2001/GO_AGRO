import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import TracksCard from "../../components/track/TracksCard";
import TracksTable from "../../components/track/TracksTable";
import { useReactToPrint } from "react-to-print";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import debounce from "lodash/debounce"; // Import debounce from lodash

const Home = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const componentRef = useRef();
    const [searchQuery, setSearchQuery] = useState("");
    const [originalTracks, setOriginalTracks] = useState([]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'TrackDeliveryList-data',
        onAfterPrint: () => alert('Print success')
    });

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5000/tracks")
            .then((response) => {
                setTracks(response.data.data);
                console.log(response.data.data)
                setOriginalTracks(response.data.data); // Store original tracks data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = debounce(() => {
        const filteredTracks = originalTracks.filter(tracks =>
            applySearchFilter(tracks, searchQuery)
        );
        setTracks(filteredTracks);
    }, 300);

    const applySearchFilter = (tracks, query) => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            String(tracks.OrderId).toLowerCase().includes(lowerCaseQuery) ||
            tracks.address.toLowerCase().includes(lowerCaseQuery) ||
            tracks.status.toLowerCase().includes(lowerCaseQuery)


        );
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        };
    };

    return (
        <>
            <div ref={componentRef} style={{ width: '100%', height: '90vh' }}>
                <div className="p-4">
                    <div className="flex justify-center items-center gap-x-4">
                        <button
                            className="bg-green-800 text-white px-4 py-1 rounded-lg w-fit"
                            onClick={() => setShowType('table')}
                        >
                            Table
                        </button>
                        <button
                            className="bg-green-800 text-white px-4 py-1 rounded-lg w-fit"
                            onClick={() => setShowType('card')}
                        >
                            Card
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl my-8">Order Tracking List</h2>
                        
                    </div>
                    <div className="mb-4">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                name="searchQuery"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress} // Add onKeyPress handler
                                placeholder="Search"
                                className="mr-2 border border-gray-400 p-2"
                                style={{ width: '300px' }} // Set the width here
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Search
                            </button>
                        </div>

                    </div>
                    {loading ? <Spinner /> : showType === 'table' ? <TracksTable tracks={tracks} /> : <TracksCard tracks={tracks} />}

                </div>
            </div>
            {showType === 'table' && (
                <div className='flex justify-center mt-4'>
                    <Button
                        className="bg-green-800 text-white px-4 py-1 rounded-lg w-fit"
                        onClick={() => handlePrint()}
                    >
                        Print this
                    </Button>
                </div>
            )}
        </>
    );
}

export default Home;
